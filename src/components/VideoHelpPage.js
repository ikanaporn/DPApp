import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import {
    color1,
    NavigationName,
} from '../constants';

class VideoHelpPage extends React.Component {
    render() {
        //this.props.navigation.setOptions({ title: 'อาสาสมัครรหัส: ' + this.props.route.params.volunteer.id });
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                <View style={styles.contentHelp}>
                        <Text style={{
                            fontSize: 16, 
                            alignContent: 'center',
                            justifyContent: 'center',
                            
                            }}>
                            กดปุ่ม "เริ่ม"{"\n"} เมื่อท่านต้องการเริ่มต้นทำแบบทดสอบ {"\n"} {"\n"}
                            กดปุ่ม "หยุด"{"\n"} เมื่อท่านทำแบบทดสอบเสร็จก่อนเวลาที่กำหนด {"\n"} {"\n"}
                            กดปุ่ม "ถัดไป"{"\n"} เมื่อท่านต้องการไปยังแบบทดสอบข้อถัดไป{"\n"} 
                        </Text>
                </View>  
                    
                    <TouchableOpacity
                        style={[styles.button, styles.buttonvideo]}
                        onPress={() => {
                            this.props.navigation.navigate(NavigationName.VideoPage, 
                            //    {volunteer: this.props.route.params.volunteer,}
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
    },
    buttonbasic: {
        backgroundColor: color1[1],
        borderColor: color1[1],
    },
    buttonhamilton: {
        backgroundColor: color1[2],
        borderColor: color1[2],
    },
    buttonphq9: {
        backgroundColor: color1[3],
        borderColor: color1[3],
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
        marginLeft: 10,
    },
    contentText: {
        margin: 10,
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    contentHelp: {
        marginTop: '50%',
        marginVertical: '20%',
        marginHorizontal: '4%',
        alignContent: 'center',
        marginLeft: 50
        
    }
});

export default VideoHelpPage;