import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { BlurView } from "expo-blur";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import { YellowBox } from "react-native";
import _ from "lodash";

import { color1, NavigationName } from '../constants';

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
    }
};
const win_height = Dimensions.get('window').height;
const win_width = Dimensions.get('window').width;

const file_sound2 = '../../assets/audio/tone.wav';
var sound2 = new Audio.Sound();
var duratioin_sound2 = 0;

export default class VideoRenderPage extends React.Component {
    static defaultProps = {
        countDownSeconds: 5,
        cameraType: Camera.Constants.Type.front, //front vs rear facing camera
    };
    constructor(props) {
        super(props);
        this.checkPermissions();
        this.state = {
            //camera
            hasCameraPermission: null,
            faceDetecting: false, //when true, we look for faces
            faceDetected: false, //when true, we've found a face
            countDownSeconds: 5, //current available seconds before photo is taken
            countDownStarted: false, //starts when face detected
            faceID: 0,
            rollAngle: 0,
            yawAngle: 0,
            bounds: { origin: { x: 0, y: 0 }, size: { width: 0, height: 0 } },
            noOfpic: 33, // no 33 is no.1 of pic in set
            faces: [],
            ready: false,
        };
        this.load_sound();
    }
    async checkPermissions() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });

        const { status: statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (statusRoll === "granted") {
            this.setState({ showCamera: true });
        }

        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({
            haveRecordingPermissions: response.status === "granted",
        });

    }
    async load_sound() {
        try {
            await sound2.loadAsync(require(file_sound2));
            let s2 = await sound2.getStatusAsync();
            duratioin_sound2 = s2.durationMillis;
        } catch (err) {
            console.warn('Can\'t load sound' + err);
        }
    }
    async sound2_play() {
        // sound2.stopAsync();
        // await sound2.playAsync();
    }
    componentDidMount() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: false,
        });
    }
    handleFaceDetectionError = () => {
    };
    handleFacesDetected = async ({ faces }) => {
        if (faces.length === 1) {
            var lEar = faces[0].leftEarPosition;
            var rEar = faces[0].rightEarPosition;
            var lEye = faces[0].leftEyePosition;
            var rEye = faces[0].rightEyePosition;
            var lCheek = faces[0].leftCheekPosition;
            var rCheek = faces[0].rightCheekPosition;
            var lMouth = faces[0].leftMouthPosition;
            var rMouth = faces[0].rightMouthPosition;
            var nose = faces[0].noseBasePosition;
            var origin = faces[0].bounds.origin;
            var size = faces[0].bounds.size;

            var max_x = win_width;
            var max_y = win_height;
            if (
                lEar.x < 0 || lEar.y < 0 ||
                rEar.x < 0 || rEar.y < 0 ||
                lEye.x < 0 || lEye.y < 0 ||
                rEye.x < 0 || rEye.y < 0 ||
                lCheek.x < 0 || lCheek.y < 0 ||
                rCheek.x < 0 || rCheek.y < 0 ||
                lMouth.x < 0 || lMouth.y < 0 ||
                rMouth.x < 0 || rMouth.y < 0 ||
                nose.x < 0 || nose.y < 0 ||
                origin.x < 0 || origin.y < 0 ||

                lEar.x > max_x || lEar.y > max_y ||
                rEar.x > max_x || rEar.y > max_y ||
                lEye.x > max_x || lEye.y > max_y ||
                rEye.x > max_x || rEye.y > max_y ||
                lCheek.x > max_x || lCheek.y > max_y ||
                rCheek.x > max_x || rCheek.y > max_y ||
                lMouth.x > max_x || lMouth.y > max_y ||
                rMouth.x > max_x || rMouth.y > max_y ||
                nose.x > max_x || nose.y > max_y ||
                (origin.x + size.width) > max_x || (origin.y + size.height) > max_y
            ) {
                this.sound2_play();
                this.setState({ faceDetected: false });
                this.cancelCountDown();
                return null;
            }
            this.setState({
                faces,
                faceDetected: true,
                faceID: faces[0].faceID,
                bounds: faces[0].bounds,
                rollAngle: faces[0].rollAngle,
                yawAngle: faces[0].yawAngle,
            });
            if (!this.state.faceDetected && !this.state.countDownStarted) {
                this.initCountDown();
            }
        } else {
            this.sound2_play();
            this.setState({ faceDetected: false });
            this.cancelCountDown();
        }
    };
    initCountDown = () => {
        this.setState({
            countDownStarted: true,
        });
        this.countDownTimer = setInterval(this.handleCountDownTime, 1000);
    };
    cancelCountDown = () => {
        clearInterval(this.countDownTimer);
        this.setState({
            countDownSeconds: this.props.countDownSeconds,
            countDownStarted: false,
        });
    };
    handleCountDownTime = () => {
        if (this.state.countDownSeconds > 0) {
            let newSeconds = this.state.countDownSeconds - 1;
            this.setState({
                countDownSeconds: newSeconds,
            });
        } else {
            this.cancelCountDown();
        }
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => this.camera = ref}
                    style={{ flex: 1, position: "relative" }}
                    type={this.props.cameraType}
                    onFaceDetectionError={this.handleFaceDetectionError}
                    onFacesDetected={this.state.ready ? this.handleFacesDetected : null}
                    faceDetectorSettings={{
                        mode: FaceDetector.Constants.Mode.fast,
                        detectLandmarks: FaceDetector.Constants.Landmarks.all,
                        runClassifications: FaceDetector.Constants.Classifications.all,
                        tracking: true,
                    }}
                    onCameraReady={async () => {
                        this.setState({ ready: true })
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "transparent",
                            flexDirection: "row",
                            position: "absolute",
                            bottom: 0,
                        }}
                    >
                        <Text style={styles.textStandard}>
                            {this.state.faceDetected
                                ? "Face Detected"
                                : "No Face Detected"}
                        </Text>
                    </View>
                    {this.state.faceDetected ? (
                        <BlurView
                            intensity={100}
                            style={[StyleSheet.absoluteFill]}
                            key={this.state.faceID}
                            transform={[
                                { perspective: 800 },
                                { rotateZ: `${this.state.rollAngle}deg` },
                                { rotateY: `${this.state.yawAngle}deg` },
                            ]}
                            style={[[StyleSheet.absoluteFill],
                            styles.face, {
                                ...this.state.bounds.size,
                                left: this.state.bounds.origin.x,
                                width: this.state.bounds.size.width,
                                top: this.state.bounds.origin.y,
                                borderColor: '#FFD700',
                                borderWidth: 1,
                                borderRadius: this.state.bounds.size.width * 0.5,
                            },
                            ]}
                        />
                    ) : null}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Image
                            style={{
                                alignSelf: "center",
                                width: "100%",
                                height: "100%",
                                resizeMode: 'stretch',
                                zIndex: 0,
                                position: 'absolute',
                            }}
                            source={require("../../assets/img/camera/output.png")}
                        />
                        <View style={{
                            zIndex: 3,
                            position: 'absolute',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                            }}>
                                - ต่อไปนี้จะเป็นแบบทดสอบที่ท่านจะถูกบันทึกภาพและเสียง เมื่อใบหน้าของท่านไม่อยู่ในกรอบจะมีสัญญาณเตือน ขอให้ท่านขยับใบหน้าให้อยู่ในบริเวณเส้นประที่กำหนด{"\n"}
                                - ใบหน้าของท่านจะถูกปิดด้วยแถบสีเทา
                            </Text>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonvideo, {}]}
                                onPress={() => {
                                    this.props.navigation.navigate(NavigationName.VideoPage,
                                        { volunteer: this.props.route.params.volunteer, }
                                    )
                                }}
                            >
                                <Text style={[styles.buttonText, { color: 'white', },]}>เริ่มทำแบบทดสอบ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Camera>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    buttonvideo: {
        backgroundColor: color1[4],
        borderColor: color1[4],
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        alignSelf: "center",
    },
    textStandard: {
        fontSize: 12,
        marginBottom: 10,
        color: "white",
    },
    face: {
        borderWidth: 10,
        position: "absolute",
        borderColor: "#FFD700",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    button: {
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        width: "90%",
        height: 50,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        fontWeight: 'bold',
    },
});
