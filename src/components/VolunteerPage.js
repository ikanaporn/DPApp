import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import {
    color1,
    NavigationName,
} from '../constants';

class VolunteerPage extends React.Component {
    render() {
        this.props.navigation.setOptions({ title: 'อาสาสมัครรหัส: ' + this.props.route.params.volunteer.id });
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={{ flex: 0.4, flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.BasicQuestion, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <Image
                                source={require("../../assets/img/info.png")}
                                resizeMode="center"
                                style={{ flex: 1, height: '110%' }}
                            />
                            <Text>ข้อมูลพื้นฐาน</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.HamiltonQuestion, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <Image
                                source={require("../../assets/img/hamilton.png")}
                                resizeMode="contain"
                                style={{ flex: 1 }}
                            />
                            <Text>แบบวัด HAMILTON</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.4, flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.PHQ9Question, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <Image
                                source={require("../../assets/img/phq9.png")}
                                resizeMode="contain"
                                style={{ flex: 1 }}
                            />
                            <Text>แบบประเมิน PHQ-9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.VideoHelpPage, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <Image
                                source={require("../../assets/img/video.png")}
                                resizeMode="contain"
                                style={{ flex: 1 }}
                            />
                            <Text>ประเมินด้วยวิดีโอ</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.button, { flex: 0.2, },]}
                        onPress={() => {
                            this.props.navigation.goBack();
                            this.props.navigation.goBack();
                        }}
                    >
                        <Image
                            source={require("../../assets/img/home.png")}
                            resizeMode="contain"
                            style={{ flex: 1 }}
                        />
                        <Text>กลับสู่หน้าหลัก</Text>
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
    button: {
        backgroundColor: color1[1],
        borderColor: color1[1],
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        width: "90%",
        flex: 0.48,
        marginLeft: 20,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 17,
        textAlign: "center",

        justifyContent: 'flex-end'


    },
    contentText: {
        margin: 10,
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cardTemplate: {
        justifyContent: "space-around",
        textAlign: "center",
        marginTop: '35%',
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default VolunteerPage;