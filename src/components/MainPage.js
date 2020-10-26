import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import {
    color1,
    NavigationName,
} from '../constants';

class MainPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <TouchableOpacity style={[styles.button, {},]}
                        onPress={() => {
                            this.props.navigation.navigate(NavigationName.ListAdminPage, {
                            });
                        }}
                    >
                        <Image
                            source={require("../../assets/img/doctor.png")}
                            resizeMode="contain"
                            style={{ flex: 1 }}
                        />
                        <Text style={styles.text}>สำหรับผู้เก็บข้อมูล</Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={[styles.button, {},]}
                        onPress={() => {
                            this.props.navigation.navigate(NavigationName.ListVolunteerPage, {
                            });
                        }}
                    >
                        <Image
                            source={require("../../assets/img/work.png")}
                            resizeMode="contain"
                            style={{ flex: 1 }}
                        />
                        <Text style={styles.text}>อาสาสมัครวิจัย</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, {},]}
                        onPress={() => {
                            //     this.props.navigation.navigate(NavigationName.ListVolunteerPage, {
                            //     });
                        }}
                    >
                        <Image
                            source={require("../../assets/img/reportvol.png")}
                            resizeMode="contain"
                            style={{ flex: 1 }}
                        />
                        <Text style={styles.text}>รายงานผล</Text>
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
        margin: 10,
        padding: 10,
        width: "90%",
        flex: 0.33,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        fontWeight: 'bold',
    },
    text: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default MainPage;