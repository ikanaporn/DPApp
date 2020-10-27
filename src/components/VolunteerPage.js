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
                    <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.BasicQuestion, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={require("../../assets/img/info.png")}
                                    resizeMode="contain"
                                    style={{ flex: 1 }}
                                />
                            </View>
                            <Text style={[styles.buttonText, {}]}>ข้อมูลพื้นฐาน</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.HamiltonQuestion, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={require("../../assets/img/hamilton.png")}
                                    resizeMode="contain"
                                    style={{ flex: 1 }}
                                />
                            </View>
                            <Text style={[styles.buttonText, {}]}>แบบวัด HAMILTON</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.PHQ9Question, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={require("../../assets/img/phq9.png")}
                                    resizeMode="contain"
                                    style={{ flex: 1 }}
                                />
                            </View>
                            <Text style={[styles.buttonText, {}]}>แบบประเมิน PHQ-9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {},]}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationName.VideoHelpPage, {
                                    volunteer: this.props.route.params.volunteer,
                                })
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={require("../../assets/img/video.png")}
                                    resizeMode="contain"
                                    style={{ flex: 1 }}
                                />
                            </View>
                            <Text style={[styles.buttonText, {}]}>ประเมินด้วยวิดีโอ</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.button, { flex: 0.2, width: '94%' },]}
                        onPress={() => {
                            this.props.navigation.goBack();
                            this.props.navigation.goBack();
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Image
                                source={require("../../assets/img/home.png")}
                                resizeMode="contain"
                                style={{ flex: 1 }}
                            />
                        </View>
                        <Text style={[styles.buttonText, {}]}>กลับสู่หน้าหลัก</Text>
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
        margin: 5,
        padding: 5,
        width: "90%",
        flex: 0.48,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        textAlign: "center",
        justifyContent: 'flex-end',
        color: "#595959",
        fontSize: 17,
        fontWeight: "bold",
    },
});

export default VolunteerPage;