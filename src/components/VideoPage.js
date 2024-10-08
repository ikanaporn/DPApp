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
    Dimensions,
    
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
import Timer2 from "./Timer2";
import { NextCommand, BackCommand } from "../actions/VideoAction";
import {
    timerNext,
    timerStart,
    timerRetry,
    timerStop,
} from "../actions/TimerActions";

import { bar, } from "../constants"
import ProgressBar from './ProgressBar';
import VideoReducer from "../reducers/VideoReducer";
//import { styles } from '../css';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import { writeTimestamp } from '../server/server';

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
    }
};
const win_height = Dimensions.get('window').height;
const win_width = Dimensions.get('window').width;

var timeout_instruct, timeout10s, timeout1, timeout2;
const file_sound1 = '../../assets/audio/audioclip.wav';
const file_sound2 = '../../assets/audio/tone.wav';
var sound1 = new Audio.Sound();
var sound2 = new Audio.Sound();
var duratioin_sound1 = 0;
var duratioin_sound2 = 0;
const button_back_text = 'ย้อนกลับ';
var self;
var start=null;
var stop=null;
var tempstart=null;
var tempstop=null;


class VideoPage extends React.Component {


    static defaultProps = {
        countDownSeconds: 5,
        cameraType: Camera.Constants.Type.front, //front vs rear facing camera
    };

    state = {
        runningTime: false,
        runningTime2: true,
        disabledTouchableOpacityStart: false,
        disabledTouchableOpacityStop: true,
        disabledTouchableOpacityNext: true,
        disabledTouchableOpacityBack: false,
        countdownStart: 120,
        countdownStart2: 10, 
        uniqueValue: 1,
        isEnd: false,
        timeout1: null,
        timeout2: null,
        
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
        //setRecording: false
        haveRecordingPermissions: false,
        //audio
        soundplaying: false,
        countdownShow: false,


    };
    countDownTimer = null;

    constructor(props) {
        super(props);
        self = this;
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
            disabledTouchableOpacityBack: true,
            countdownStart: 120,
            countdownStart2: 10,
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

            // ตอบคำถามที่ต้องใช้จิตนาการ
            popup_text: "",
            is_hided_speaker: true,
            //time
            curTime: null,
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
        clearTimeout(timeout_instruct);
        clearTimeout(timeout10s);
        sound1.stopAsync();
        await sound1.playAsync();
        timeout_instruct = setTimeout(async () => {
            await sound1.stopAsync();
            console.log("timeouttttttttttttttttttttt");
            
            self.setState({
                popup_text: self.props.VideoReducer.element.data,
                is_hided_speaker: false,
                countdownShow: true,
            });
            timeout10s = setTimeout(async () => {
                await sound2.stopAsync();
                await sound2.playAsync();
            }, 10 * 1000); //millisec
            setTimeout(async () => {
                self.onFinishTimer2()
            },10000);
            
        }, duratioin_sound1);
        
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
        setInterval(() => {
            this.setState({
              curTime : new Date().toLocaleString()
            })
        }, 1000)
    }

    componentWillUnmount() {
        // if (this.state.recording) {
        //     console.log("saved video");
        //     this.stopRecordViedo();
        // } else {
        //     console.log("Video not record");
        // }
        clearTimeout(timeout_instruct);
        clearTimeout(timeout10s);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        sound1.stopAsync();
        sound2.stopAsync();
       
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        clearTimeout(timeout_instruct);
        clearTimeout(timeout10s);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        sound1.stopAsync();
        sound2.stopAsync();
        this.setState({
            alerttext: "",
            popup_text: "",
            is_hided_speaker: true,
        });
    }

    startRunningTime = () => {
        start = this.state.curTime,
        tempstart = start,
        //var curr_start = this.props.VideoReducer.command_num+','+this.state.curTime
       // writeTimestamp(curr_start);
       //writeTimestamp(this.props.route.params.volunteer.id,'Video', this.props.VideoReducer.command_num, curr_start, '')
        //const timestamp = MediaLibrary.getAssetInfoAsync(asset, options)
       // console.log("curTime_start",curr_start)
        console.log("start no : ",this.props.VideoReducer.command_num)
        if (this.props.VideoReducer.element.isVad) {
            this.renderValidate1()
        }
        if (this.props.VideoReducer.command_num == 0) {    
            this.recordVideo();        
            this.setState({
                disabledTouchableOpacityNext: true,
                disabledTouchableOpacityBack: true,
            })
           
        }

        if (
            this.props.VideoReducer.command_num == 8 ||
            this.props.VideoReducer.command_num == 9 ||
            this.props.VideoReducer.command_num == 10 ||
            this.props.VideoReducer.command_num == 11 ||
            this.props.VideoReducer.command_num == 12 ||
            this.props.VideoReducer.command_num == 13 
        
        ) {
           // const assetInfo = MediaLibrary.getAssetInfoAsync(asset);
           // console.log("asset :",assetInfo)
            this.setState({
                runningTime: true,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityStop: false,
                disabledTouchableOpacityNext: true,
                disabledTouchableOpacityBack: true,
                countdownStart: 60,
            });
        }
        else {

            if (this.props.VideoReducer.command_num == 1) {
                console.log("== 1 state StartRunningTime")
                this.setState({
                    runningTime: true,
                    disabledTouchableOpacityStart: true,
                    disabledTouchableOpacityStop: true,
                    disabledTouchableOpacityNext: true,
                    disabledTouchableOpacityBack: true,
                    countdownStart: 15,
                });
            } else if (this.props.VideoReducer.command_num == 0) {
                this.setState({
                    runningTime: true,
                    disabledTouchableOpacityStart: true,
                    disabledTouchableOpacityStop: false,
                    disabledTouchableOpacityNext: true,
                    disabledTouchableOpacityBack: true,
                    countdownStart: 120,
                });
            }
            else {
                console.log("else state")
                this.setState({
                    runningTime: true,
                    disabledTouchableOpacityStart: true,
                    disabledTouchableOpacityStop: false,
                    disabledTouchableOpacityNext: true,
                    disabledTouchableOpacityBack: true,
                    countdownStart: 120,
                });
            }

        }

    };

    stopRunningTime = () => {
        if (this.props.VideoReducer.command_num == 0) {
            this.setState({
                runningTime: false,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityNext: false,
                disabledTouchableOpacityBack: true,
            });
        } 
        else if (this.props.VideoReducer.command_num == 3) {
            console.log("stop record , ",this.props.VideoReducer.command_num)
            if (this.state.recording) {
                //console.log("saved video",this.camera)
                this.stopRecordViedo()
            } else {
                console.log("Video not record")
            }
            this.setState({
                runningTime: false,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityNext: false,
                disabledTouchableOpacityBack: false,
            }); 
        }
        else {
            this.setState({
                runningTime: false,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityNext: false,
                disabledTouchableOpacityBack: false,
            }); 
        }
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        this.setState({
            alerttext: "",
            popup_text: "",
            is_hided_speaker: true,
        })
    };
    BackCommand = () => {
        var curr_back = this.props.VideoReducer.command_num+','+this.state.curTime
        console.log("current back",curr_back)
        //writeTimestamp(curr_back);

        this.props.BackCommand(this.props.navigation);
        console.log("back command num  to : ", this.props.VideoReducer.command_num)
        this.setState(({ uniqueValue }) => ({
            uniqueValue: uniqueValue + 1,
        }));
        if (this.props.VideoReducer.command_num == 2) {
            console.log("== back command_num ",this.props.VideoReducer.command_num)
            this.setState({
                runningTime: false,
                disabledTouchableOpacityStart: false,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityNext: true,
                disabledTouchableOpacityBack: true,
                countdownStart: 15,
            });
        }else if (this.props.VideoReducer.command_num == 1) {
            console.log("back command_num ",this.props.VideoReducer.command_num)
            this.setState({
                runningTime: false,
                disabledTouchableOpacityStart: false,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityNext: true,
                disabledTouchableOpacityBack: true,
                countdownStart: 120,
            });
        }
        
        else {
            console.log("back ;",this.props.VideoReducer.command_num)
            this.setState({
                
                runningTime: false,
                disabledTouchableOpacityStart: false,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityNext: true,
                disabledTouchableOpacityBack: false,
                countdownStart: 120,
            })
        }

    }

    NextRunningTime = () => {
        stop = this.state.curTime,
        tempstop = stop
        var curr_next = this.props.VideoReducer.command_num+','+this.state.curTime
        console.log("curr_next", curr_next)
        //writeTimestamp(curr_next);
        writeTimestamp(this.props.route.params.volunteer.id,'Video', this.props.VideoReducer.command_num, tempstart, tempstop)
       // console.log("curTime_start",this.state.curTime)
        this.props.NextCommand(this.props.navigation);
        console.log("next command_num : ", this.props.VideoReducer.command_num)
        this.setState(({ uniqueValue }) => ({
            uniqueValue: uniqueValue + 1,
        }));
        this.setState({
            countdownShow: false
        })

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
                disabledTouchableOpacityBack: true,
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
        else if (this.props.VideoReducer.command_num == 14 ||
            this.props.VideoReducer.command_num == 15 ||
            this.props.VideoReducer.command_num == 16 ||
            this.props.VideoReducer.command_num == 17 ||
            this.props.VideoReducer.command_num == 18 ||
            this.props.VideoReducer.command_num == 19 ||
            this.props.VideoReducer.command_num == 20 ||
            this.props.VideoReducer.command_num == 21 ||
            this.props.VideoReducer.command_num == 22 ||
            this.props.VideoReducer.command_num == 23 ||
            this.props.VideoReducer.command_num == 24 ) {
            console.log("isAudio :",this.props.VideoReducer.command_num  )
            this.setState({
                runningTime: false,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityNext: true,
                disabledTouchableOpacityBack: true,
            });
        }
        else {

            if (this.props.VideoReducer.command_num == 0) {
                console.log("0 == state NextRunningTime num : ",this.props.VideoReducer.command_num)
                this.setState({
                    runningTime: false,
                    disabledTouchableOpacityStart: false,
                    disabledTouchableOpacityStop: true,
                    disabledTouchableOpacityNext: true,
                    disabledTouchableOpacityBack: true,
                    countdownStart: 15,
                });
            } else if (this.props.VideoReducer.command_num == 1) {
                console.log("== state NextRunningTime num 1 ",this.props.VideoReducer.command_num)
                this.setState({
                    runningTime: false,
                    disabledTouchableOpacityStart: false,
                    disabledTouchableOpacityStop: true,
                    disabledTouchableOpacityNext: true,
                    disabledTouchableOpacityBack: true,
                    countdownStart: 120,
                });
            }
            
            else {
                console.log("else state...")
                this.setState({
                    runningTime: false,
                    disabledTouchableOpacityStart: false,
                    disabledTouchableOpacityStop: true,
                    disabledTouchableOpacityNext: true,
                    disabledTouchableOpacityBack: true,
                    countdownStart: 120,
                });
            }
        }
    };

    onFinish = () => {
       
        console.log("onFinish")
        if (this.props.VideoReducer.command_num == 0) {
            this.setState({
                disabledTouchableOpacityNext: false,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityStop: true,
                disabledTouchableOpacityBack: true,
                //countdownStart: 120
            });
        }

        
       
        
        else {
            console.log("other")
            this.setState({
            disabledTouchableOpacityNext: false,
            disabledTouchableOpacityStart: true,
            disabledTouchableOpacityStop: true,
            disabledTouchableOpacityBack: false,
            //countdownStart: 120
        });
        }
    };

    onFinishTimer2 = () => {
        
            console.log("15")
            this.setState({
                runningTime: true,
                disabledTouchableOpacityNext: true,
                disabledTouchableOpacityStart: true,
                disabledTouchableOpacityStop: false,
                disabledTouchableOpacityBack: true,
                //countdownStart: 120
            });
        
    };
    

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

            var max_x = win_width / 2.3;
            var max_y = win_height / 5;
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

    recordVideo = async () => {
        console.log("state:", this.state.recording)
        this.setState({
            recording: true,
        });
        console.log("recording")
        //16:9
        //const raito = await this.camera.getSupportedRatiosAsync()
        // console.log("ratio : ", raito){ quality: '16:9' }
        await this.camera.recordAsync().then((file) => {
            console.log("Video has been recorded");
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
                backgroundColor: '#83B8A2',
                flex: 1,
            }}>
                <View style={{ flex: 0.03 }}>
                    <View style={[styles.container, { width: '100%' }]}>
                        <ProgressBar max={test_length} step_no={this.props.VideoReducer.command_num} />
                    </View>
                </View>
                <View style={{ flex: 0.97 }}>

                    <View style={{ backgroundColor: '#ffffff', flex: 0.7, margin: 10, padding: 10, borderRadius: 10,marginTop:4 }}>
                        <View key={this.state.uniqueValue} style={{ flex: 0.07, alignItems: 'flex-end', flexDirection: 'column-reverse', marginTop: 5 }}>
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
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                            {this.state.countdownShow ? 
                                                <View key={this.state.uniqueValue} style={{ flex: 0.07, alignItems: 'center', paddingVertical: 30  }}>
                                                <Timer2
                                                    runningTime={true}
                                                    countdownStart={10}
                                                    onFinish={this.onFinish}
                                                />
                                                
                                                </View>
                                                
                                            :
                                            null}
                                            </View>
                                            <View style={{ flex: 0.7, justifyContent: 'center' }}>
                                            {this.state.is_hided_speaker ?
                                                <TouchableOpacity
                                                    style={{ flex: 1, alignItems: 'center' }}
                                                    onPress={this.play_instruct}
                                                >
                                                    <Image
                                                        style={{ alignSelf: 'center', resizeMode: 'center', flex: 0.9 }}
                                                        source={require("../../assets/img/volume.png")}
                                                    ></Image>
                                                    <Text style={{ fontSize: 12 }}>กดเพื่อเล่น</Text>
                                                </TouchableOpacity>
                                                :
                                                <Text style={{ fontSize: 24 }}>
                                                    {this.state.popup_text != "" ? this.state.popup_text : null}
                                                </Text>
                                            }
                                            
                                        </View>
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
                                
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                }}
                                >
                                 <TouchableOpacity
                                   onPress={this.BackCommand}
                                   style={
                                    this.state.disabledTouchableOpacityBack == true
                                        ? styles.buttonBackCommandDis
                                        : styles.buttonBackCommand
                                    }
                                // {this.props.VideoReducer.command_num == 0 ? (
                                //     this.setState({
                                //         disabledTouchableOpacityBack : true
                                //     })
                                    
                                //     //.buttonBackCommandDis
                                // ):()}
                                   
                                   disabled={this.state.disabledTouchableOpacityBack}
                                   >
                                    <Text style={styles.buttonText}>ย้อนกลับ</Text>
                                </TouchableOpacity>

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
                        <View style={{ flex: 1, margin: 5, padding: 10 }}>
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
                                // onCameraReady={async () => {
                                //     this.setState({ ready: true })
                                //     await this.camera.getSupportedRatiosAsync();
                                //     //console.log('onCameraReady ratios: ', ratios);
                                // }}
                                onCameraReady={async () => {
                                    this.setState({ ready: true })
                                    var ratios = await this.camera.getSupportedRatiosAsync();
                                    console.log('onCameraReady ratios: ', ratios);
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
                                <View style={{ flex: 1, }}>
                                    <Image
                                        style={{
                                            alignSelf: "center",
                                            width: "100%",
                                            height: "100%",
                                            resizeMode: 'stretch',
                                        }}
                                        source={require("../../assets/img/camera/output.png")}
                                    ></Image>
                                </View>
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
                                    source={require("../../assets/img/back.png")}
                                />
                                {" "}เพื่อย้อนกลับ{"\n"}
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
    container: {
        backgroundColor: "#83B8A2",
        flex: 1,
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
        width: "45%",
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
        width: "45%",
        height: 42,
        justifyContent: "space-around",
        justifyContent: "center",
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
    buttonback: {
        backgroundColor: '#EDC075',
        borderColor: '#EDC075',
        borderWidth: 1,
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 10,
        width: "98%",
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonBackCommand: {
        backgroundColor: "#FFBB33",
        borderColor: "#FFBB33",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: "45%",
        height: 40,
        justifyContent: "center",
    },
    buttonBackCommandDis: {
        backgroundColor: "#C7C7CC",
        borderColor: "#C7C7CC",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: "45%",
        height: 40,
        justifyContent: "center",
    },
    
    
});

const mapStateToProps = (state) => ({
    VideoReducer: state.VideoReducer,
    TimerReducer: state.TimerReducer,
});

const mapDispatchToProps = {
    NextCommand,
    BackCommand,
    timerNext,
    timerStart,
    timerRetry,
    timerStop,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
