import React from "react";
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Camera } from "expo-camera";
import { BlurView } from "expo-blur";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import { Audio } from "expo-av";
import { YellowBox } from "react-native";
import _ from "lodash";

import Timer from "./Timer";
import { NextCommand } from "../actions/VideoAction";
import {
    timerNext,
    timerStart,
    timerRetry,
    timerStop,
} from "../actions/TimerActions";

import { bar, } from "../constants"
import ProgressBar from './ProgressBar';

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
    }
};
const win_height = Dimensions.get('window').height;

var timeout10s, timeout1, timeout2;
const file_sound1 = '../../assets/audio/audioclip.wav';
const file_sound2 = '../../assets/audio/tone.wav';
var sound1 = new Audio.Sound();
var sound2 = new Audio.Sound();
var duratioin_sound1 = 0;
var duratioin_sound2 = 0;

class VideoPage extends React.Component {
    constructor(props) {
        super(props);
        this.checkPermissions();
        this.load_sound();
        this.props.navigation.setOptions({
            title: "แบบทดสอบผ่านแอปพลิเคชัน",
            headerStyle: {
                backgroundColor: "#83B8A2",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { color: "#fff" },
            headerBackTitle: " ",
        });
        this.state = {
            runningTime: false,
            disabledTouchableOpacityStart: false,
            disabledTouchableOpacityStop: true,
            disabledTouchableOpacityNext: true,
            countdownStart: 120,
            uniqueValue: 1,
            progress: 0.2,
            isEnd: false,
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
            //recording
            recording: true,
            haveRecordingPermissions: false,
            //soundplaying
            soundplaying: false,
        };
    }

    static defaultProps = {
        countDownSeconds: 5,
        cameraType: Camera.Constants.Type.front, //front vs rear facing camera
    };

    countDownTimer = null;

    async checkPermissions() {
        console.log("checkPermissions")
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
            await sound1.loadAsync(require(file_sound1));
            await sound2.loadAsync(require(file_sound2));
            let s1 = await sound1.getStatusAsync();
            let s2 = await sound2.getStatusAsync();
            duratioin_sound1 = s1.durationMillis;
            duratioin_sound2 = s2.durationMillis;
        } catch (err) {
            console.warn('Can\'t load sound' + err);
        }
    }

    async play_instruct() {
        clearTimeout(timeout10s);
        sound1.stopAsync();
        await sound1.playAsync();
        timeout10s = setTimeout(() => {
            sound1.stopAsync();
            sound2.stopAsync();
            sound2.playAsync();
            clearTimeout(timeout10s);
            sound1.stopAsync();
        }, duratioin_sound1 + 10000);
    }

    async sound2_play() {
        sound2.stopAsync();
        await sound2.playAsync();
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

    componentWillUnmount() {
        if (this.state.recording) {
            console.log("saved video");
            this.stopRecordViedo();
        } else {
            console.log("Video not record");
        }
        clearTimeout(timeout10s);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        sound1.stopAsync();
        sound2.stopAsync();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        clearTimeout(timeout10s);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        sound1.stopAsync();
        sound2.stopAsync();
        this.setState({ alerttext: "" });
    }

    startRunningTime = () => {
        if (this.props.VideoReducer.element.isVad) {
            this.renderValidate1()
        }
        if (this.props.VideoReducer.command_num == 0) {
            this.recordVideo();
        }

        if (
            this.props.VideoReducer.command_num == 9 ||
            this.props.VideoReducer.command_num == 10 ||
            this.props.VideoReducer.command_num == 11 ||
            this.props.VideoReducer.command_num == 12 ||
            this.props.VideoReducer.command_num == 13 ||
            this.props.VideoReducer.command_num == 14
        ) {
            this.setState({
                runningTime: true,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityStop: false,
                disabledTouchableOpacityNext: true,
                countdownStart: 60,
            });
        }
        else {

            if (this.props.VideoReducer.command_num == 1) {
                console.log("== 1 state NextRunningTime")
                this.setState({
                    runningTime: true,
                    disabledTouchableOpacityStart: true,
                    disabledTouchableOpacityStop: true,
                    disabledTouchableOpacityNext: true,
                    countdownStart: 15,
                });
            } else {
                console.log("else state")
                this.setState({
                    runningTime: true,
                    disabledTouchableOpacityStart: true,
                    disabledTouchableOpacityStop: false,
                    disabledTouchableOpacityNext: true,
                    countdownStart: 120,
                });
            }

        }

    };

    stopRunningTime = () => {
        this.setState({
            runningTime: false,
            disabledTouchableOpacityStop: true,
            disabledTouchableOpacityStart: true,
            disabledTouchableOpacityNext: false,
        });
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        this.setState({
            alerttext: ""
        })
    };

    NextRunningTime = () => {
        this.props.NextCommand(this.props.navigation);
        console.log("command_num : ", this.props.VideoReducer.command_num)
        this.setState(({ uniqueValue }) => ({
            uniqueValue: uniqueValue + 1,
        }));

        if (
            this.props.VideoReducer.command_num == 8 ||
            this.props.VideoReducer.command_num == 9 ||
            this.props.VideoReducer.command_num == 10 ||
            this.props.VideoReducer.command_num == 11 ||
            this.props.VideoReducer.command_num == 12 ||
            this.props.VideoReducer.command_num == 13
        ) {
            this.setState({
                runningTime: false,
                disabledTouchableOpacityStart: false,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityNext: true,
                countdownStart: 60,
            });
        }
        //stop
        else if (this.props.VideoReducer.command_num == 31) {
            console.log("tessss")
            if (this.state.recording) {
                //console.log("saved video",this.camera)
                this.stopRecordViedo()
            } else {
                console.log("Video not record")
            }
        }
        else {
            if (this.props.VideoReducer.command_num == 0) {
                console.log("== 1 state NextRunningTime")
                this.setState({
                    runningTime: false,
                    disabledTouchableOpacityStart: false,
                    disabledTouchableOpacityStop: true,
                    disabledTouchableOpacityNext: true,
                    countdownStart: 15,
                });
            } else {
                console.log("else state...")
                this.setState({
                    runningTime: false,
                    disabledTouchableOpacityStart: false,
                    disabledTouchableOpacityStop: true,
                    disabledTouchableOpacityNext: true,
                    countdownStart: 120,
                });
            }
        }
    };

    onFinish = () => {
        this.setState({
            disabledTouchableOpacityNext: false,
            disabledTouchableOpacityStart: true,
            disabledTouchableOpacityStop: true
        });
    };

    handleFaceDetectionError = () => {
    };

    handleFacesDetected = async ({ faces }) => {
        if (faces.length === 1) {
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

    renderValidate1 = () => {
        console.log("เล่าเพิ่มอีกนิดนะคะ")
        timeout1 = setTimeout(() => {
            this.renderValidate2()
            this.setState({
                alerttext: "เล่าเพิ่มอีกนิดนะคะ"
            })
        }, 20000);
    }

    renderValidate2 = () => {
        console.log("ช่วยเล่ารายละเอียดหน่อยค่ะ")
        timeout2 = setTimeout(() => {
            this.renderValidate1()
            this.setState({
                alerttext: "ช่วยเล่ารายละเอียดหน่อยค่ะ"
            })
        }, 40000);
    }

    renderMark = () => {
        return (
            <View>
                <Image
                    style={{
                        alignSelf: "center",
                        width: "100%",
                        height: "100%",

                    }}
                    source={require("../../assets/img/camera/output.png")}
                ></Image>
            </View>
        );
    };

    recordVideo = async () => {
        console.log("state:", this.state.recording)
        this.setState({
            recording: true,
        });
        console.log("recording")
        await this.camera.recordAsync({ quality: '4:3' }).then((file) => {
            console.log("file", file.uri)
            const asset = MediaLibrary.createAssetAsync(file.uri);
        });

    }

    stopRecordViedo = async () => {
        this.setState({
            recording: false,
        });
        await this.camera.stopRecording()
    }

    render() {
        var element = this.props.VideoReducer.element
        var test_length = 31
        return (
            <View style={{
                backgroundColor: '#83B8A2'
                , flex: 1
            }}>
                <View style={{ flex: 0.02 }}>
                    <View style={[styles.container, { width: '100%' }]}>
                        <ProgressBar max={test_length} step_no={this.props.VideoReducer.command_num} />
                    </View>
                </View>
                <View style={{ flex: 0.98 }}>
                    <View style={{ backgroundColor: '#ffffff', flex: 0.7, margin: 10, padding: 10, borderRadius: 10 }}>
                        <View key={this.state.uniqueValue} style={{ flex: 0.10, alignItems: 'flex-end', flexDirection: 'column-reverse' }}>
                            <Timer
                                runningTime={this.state.runningTime}
                                countdownStart={this.state.countdownStart}
                                onFinish={this.onFinish}
                            />
                        </View>

                        <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                {element.inst}
                            </Text>

                        </View>


                        <View style={{ flex: 0.55, justifyContent: 'center', alignItems: 'center' }}>
                            {element.isImage ?
                                <Image
                                    style={{
                                        resizeMode: 'contain',
                                        height: element.height,
                                        width: element.width,
                                    }}
                                    source={element.data}
                                />
                                : (element.isAudio ?
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 0.3 }}>
                                            <TouchableOpacity
                                                style={{ flex: 1, alignItems: 'center' }}
                                                onPress={this.play_instruct}
                                            >
                                                <Image
                                                    style={{ alignSelf: 'center', resizeMode: 'center', width: '100%', height: '100%' }}
                                                    source={require("../../assets/img/volume.png")}
                                                ></Image>
                                                <Text style={{ fontSize: 12 }}>กดเพื่อเล่น</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flex: 0.7, justifyContent: 'center', padding: '4%' }}>
                                            <Text style={{ fontSize: 24 }}>
                                                {element.data}
                                            </Text>
                                        </View>
                                    </View> :
                                    (this.props.VideoReducer.command_num == 2 ? (
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            {this.state.isScrollable ? bar : null}
                                            <ScrollView style={{ flex: 1, padding: 20, width: '100%' }}
                                                onContentSizeChange={(width, height) => {
                                                    if (height > (win_height * 0.35))
                                                        this.setState({ isScrollable: true });
                                                    else
                                                        this.setState({ isScrollable: false });
                                                }}
                                            >
                                                <Text style={{ fontSize: 24 }}>
                                                    {element.data}
                                                </Text>
                                            </ScrollView>
                                        </View>) :
                                        (
                                            <Text style={{ fontSize: 24 }}>
                                                {element.data}
                                            </Text>
                                        )
                                    )
                                )
                            }
                            <Text style={{ color: 'red', fontSize: 24, marginTop: 10 }}>{this.state.alerttext}</Text>
                        </View>

                        <View style={{ flex: 0.17 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={this.startRunningTime}
                                    underlayColor="#C7C7CC"
                                    style={
                                        this.state.disabledTouchableOpacityStart == true
                                            ? styles.buttonStartDis
                                            : styles.buttonStart
                                    }
                                    disabled={this.state.disabledTouchableOpacityStart}
                                >
                                    <Text style={styles.buttonText}>เริ่ม</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.stopRunningTime}
                                    underlayColor="#C7C7CC"
                                    style={
                                        this.state.disabledTouchableOpacityStop == true
                                            ? styles.buttonStopDis
                                            : styles.buttonStop
                                    }
                                    disabled={this.state.disabledTouchableOpacityStop}
                                >
                                    <Text style={styles.buttonText}>หยุด</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{ paddingLeft: 14, paddingRight: 14 }}
                            >
                                <TouchableOpacity
                                    onPress={this.NextRunningTime}
                                    underlayColor="#C7C7CC"
                                    style={
                                        this.state.disabledTouchableOpacityNext == true
                                            ? styles.buttonNextDis
                                            : styles.buttonNext
                                    }
                                    disabled={this.state.disabledTouchableOpacityNext}
                                >
                                    <Text style={styles.buttonText}>ถัดไป</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 0.3, flexDirection: 'row' }}>
                        <View style={{ flex: 1, margin: 10, padding: 10 }}>
                            <Camera
                                ref={ref => this.camera = ref}
                                style={{ flex: 1, position: "relative" }}
                                type={this.props.cameraType}
                                onFaceDetectionError={this.handleFaceDetectionError}
                                onFacesDetected={this.state.ready ? this.handleFacesDetected : null}
                                faceDetectorSettings={{
                                    mode: FaceDetector.Constants.Mode.fast,
                                    detectLandmarks: FaceDetector.Constants.Landmarks.all,
                                    runClassifications:
                                        FaceDetector.Constants.Classifications.all,
                                    tracking: true,
                                }}
                                onCameraReady={() => { this.setState({ ready: true }) }}
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
                                        styles.face,
                                        {
                                            ...this.state.bounds.size,
                                            left: this.state.bounds.origin.x,
                                            width: this.state.bounds.size.width,
                                            top: this.state.bounds.origin.y,
                                            borderColor: '#FFD700',
                                            borderWidth: 1,
                                            borderRadius: this.state.bounds.size.width * 0.5,
                                        },
                                        ]}
                                    ></BlurView>
                                ) : null}
                                {this.renderMark()}
                            </Camera>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 14 }}>
                                - กด{" "}
                                <Image
                                    style={{
                                        width: 70 * 0.4,
                                        height: 50 * 0.4,
                                    }}
                                    source={require("../../assets/img/start.png")}
                                />
                                {" "}เพื่อเริ่มต้นทำแบบทดสอบ{"\n"}
                                - กด{" "}
                                <Image
                                    style={{
                                        width: 70 * 0.4,
                                        height: 50 * 0.4,
                                    }}
                                    source={require("../../assets/img/stop.png")}
                                />
                                {" "}เมื่อทำแบบทดสอบเสร็จก่อนเวลาที่กำหนด{"\n"}
                                - กด{" "}
                                <Image
                                    style={{
                                        width: 70 * 0.4,
                                        height: 50 * 0.4,
                                    }}
                                    source={require("../../assets/img/next.png")}
                                />
                                {" "}เพื่อไปยังข้อถัดไป
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }





}


const styles = StyleSheet.create({
    contentHelp: {
        backgroundColor: '#ffffff',
        //marginLeft: '60%',
        //flexDirection: 'row',
        flex: 0.5

    },
    contentlower: {
        height: '36%',
        width: '95%',
        backgroundColor: '#83B8A2',
        marginLeft: '0%',
        marginRight: '0%',
        flexDirection: 'row-reverse',


    },
    containers: {
        height: "90%",
        width: "48%",
        backgroundColor: "black",
        justifyContent: "space-around",
        marginHorizontal: '5%',
        borderRadius: 8,
        marginTop: '3%',
        flex: 0.5


    },
    container: {
        backgroundColor: "#83B8A2",
        flex: 1,
    },
    helpcard: {
        backgroundColor: '#ffffff',
        marginLeft: 20,
        //marginTop: '95%'
    },
    buttonText: {
        fontSize: 16,
        color: "white",
        alignSelf: "center",
    },
    buttonNext: {
        backgroundColor: "#4285F4",
        borderColor: "#4285F4",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: '-6%',
        width: "100%",
        height: 42,
        justifyContent: "space-around",
        justifyContent: "center",
    },
    buttonNextDis: {
        backgroundColor: "#C7C7CC",
        borderColor: "#C7C7CC",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: '-6%',
        width: "100%",
        height: 42,
        justifyContent: "space-around",
        justifyContent: "center",
    },
    contentText: {
        fontSize: 18,
        alignSelf: "center",
        marginHorizontal: 0,
        alignItems: 'center'
        //textAlignVertical: 'center'
        //marginTop: '-42%'
    },
    buttonStart: {
        backgroundColor: "#00C851",
        borderColor: "#00C851",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: "45%",
        height: 40,
        justifyContent: "center",
    },
    buttonStartDis: {
        backgroundColor: "#C7C7CC",
        borderColor: "#C7C7CC",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: "45%",
        height: 40,
        justifyContent: "center",
    },
    buttonStop: {
        backgroundColor: "#FF4444",
        borderColor: "#FF4444",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: "45%",
        height: 40,
        justifyContent: "center",
    },
    buttonStopDis: {
        backgroundColor: "#C7C7CC",
        borderColor: "#C7C7CC",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: "45%",
        height: 40,
        justifyContent: "center",
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20,
        padding: 20,
    },
    textStandard: {
        fontSize: 12,
        marginBottom: 10,
        color: "white",
    },
    countdown: {
        fontSize: 40,
        color: "white",
    },
    facesContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        //padding: 10,
        borderWidth: 10,
        // borderRadius: 2,
        position: "absolute",
        borderColor: "#FFD700",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    faceText: {
        color: "#FFD700",
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        padding: 10,
        backgroundColor: "transparent",
    },
    containerAlert: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
    },
    buttonCard: {
        marginTop: '12%'
    },
    buttonCardSound: {
        marginTop: '-45%'
    }

});


const mapStateToProps = (state) => ({
    VideoReducer: state.VideoReducer,
    TimerReducer: state.TimerReducer,
});

const mapDispatchToProps = {
    NextCommand,
    timerNext,
    timerStart,
    timerRetry,
    timerStop,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
