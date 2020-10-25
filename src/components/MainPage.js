import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import { Card } from "react-native-elements";
import {
    color1,
    
    
    NavigationName,
} from '../constants';

class MainPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate(NavigationName.ListAdminPage, {
                        });
                    }}
                >
                <Card containerStyle={styles.cardBg}>
                    <View style={{ height: "18%" }}>
                        <View>
                            <Card.Image
                                source={require("../../assets/img/doctor.png")}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <Text style={styles.cardTemplate}>สำหรับผู้เก็บข้อมูล</Text>
                </Card>
                </TouchableOpacity>

                

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate(NavigationName.ListVolunteerPage, {
                        });
                    }}
                >
                <Card containerStyle={styles.cardBg}>
                    <View style={{ height: "18%" }}>
                        <View>
                            <Card.Image
                                source={require("../../assets/img/work.png")}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <Text style={styles.cardTemplate}>อาสาสมัครวิจัย</Text>
                </Card>
                </TouchableOpacity> 

                <TouchableOpacity
                    // onPress={() => {
                    //     this.props.navigation.navigate(NavigationName.ListVolunteerPage, {
                    //     });
                    // }}
                >
                <Card containerStyle={styles.cardBg}>
                    <View style={{ height: "18%" }}>
                        <View>
                            <Card.Image
                                source={require("../../assets/img/reportvol.png")}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                    <Text style={styles.cardTemplate}>รายงานผล</Text>
                </Card>
                </TouchableOpacity> 
                
                    
                    {/* <TouchableOpacity
                        style={[styles.button, styles.buttonvolunteer]}
                        onPress={() => {
                            this.props.navigation.navigate(NavigationName.ListVolunteerPage, {
                                //count,
                            })
                        }}
                    >
                        <Text style={[styles.buttonText, ]}>อาสาสมัครวิจัย</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={[styles.button, styles.buttonresult]}
                        onPress={() => {
                          
                        }}
                    >
                        <Text style={styles.buttonText}>รายงานผล</Text>
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
    buttonadmin: {
        backgroundColor: color1[1],
        borderColor: color1[1],
    },
    buttonvolunteer: {
        backgroundColor: color1[2],
        borderColor: color1[2],
    },
    buttonresult: {
        backgroundColor: color1[3],
        borderColor: color1[3],
    },
    button: {
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        width: "90%",
        height: '30%',
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
    cardTemplate: {
        justifyContent: "space-around",
        textAlign: "center",
        marginTop: '35%',
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    cardBg: {
        overflow: "hidden",
        //flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#83B8A2",
        marginBottom: -80
    }
});

export default MainPage;