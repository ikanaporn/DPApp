import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
} from 'react-native';
import { Audio } from "expo-av";

import {
    color1,
    NavigationName,
} from '../constants';

class VideoHelpPage extends React.Component {
    async playSound() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require("../../assets/audio/tone.wav"));
            await soundObject.playAsync();
        } catch (error) { }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.contentHelp}>
                        <Text style={{ fontSize: 16, }}>
                            - กด{" "}
                            <Image
                                style={{
                                    width: 70,
                                    height: 50,
                                }}
                                source={require("../../assets/img/start.png")}
                            />
                            {" "}เพื่อเริ่มต้นทำแบบทดสอบ{"\n"}
                            - กด{" "}
                            <Image
                                style={{
                                    width: 70,
                                    height: 50,
                                }}
                                source={require("../../assets/img/stop.png")}
                            />
                            {" "}เมื่อทำแบบทดสอบเสร็จก่อนเวลาที่กำหนด{"\n"}
                            - กด{" "}
                            <Image
                                style={{
                                    width: 70,
                                    height: 50,
                                }}
                                source={require("../../assets/img/next.png")}
                            />
                            {" "}เพื่อไปยังข้อถัดไป{"\n"}
                            - สัญญาณเสียงเริ่ม คือเสียง
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 50,
                                height: 50,
                            }}
                            onPress={this.playSound}
                        >
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                                source={require("../../assets/img/volume.png")}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, }}>
                            {" "}(กดรูปลำโพงเพื่อลองฟังเสียง){"\n"}
                            - ต่อไปนี้จะเป็นแบบทดสอบที่ท่านจะถูกบันทึกภาพและเสียง เมื่อใบหน้าของท่านไม่อยู่ในกรอบจะมีสัญญาณเตือน ขอให้ท่านขยับใบหน้าให้อยู่ในบริเวณเส้นประที่กำหนด{"\n"}
                            - ใบหน้าของท่านจะถูกปิดด้วยแถบสีเทา
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonvideo]}
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
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1[0],
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    box: {
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        flexDirection: 'column',
        justifyContent: "center",
    },
    buttonvideo: {
        backgroundColor: color1[4],
        borderColor: color1[4],
    },
    button: {
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        width: "90%",
        height: '7%',
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 17,
        textAlign: "center",
    },
    contentHelp: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
        padding: 10,
    },
});

export default VideoHelpPage;
