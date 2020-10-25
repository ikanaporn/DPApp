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
import { Card } from "react-native-elements";


class VolunteerPage extends React.Component {
    render() {
        this.props.navigation.setOptions({ title: 'อาสาสมัครรหัส: ' + this.props.route.params.volunteer.id });
        return (
            <View style={styles.container}>
                <View style={styles.box}>

                <TouchableOpacity style={{height:'14%'}}
                   onPress={() => {
                    this.props.navigation.navigate(NavigationName.BasicQuestion, {
                        volunteer: this.props.route.params.volunteer,
                    })
                }}
                >
                <Card containerStyle={styles.cardBg}>
                    <View style={{ height:'100%'}}>
                        <View style={{flex:1}}>
                            <Card.Image
                                source={require("../../assets/img/info.png")}
                                resizeMode="contain"
                            />
                        </View>
                        {/* <Text style={styles.buttonText}>ข้อมูลพื้นฐาน</Text> */}
                    </View>
                    
                </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{height:'14%',marginTop: '20%'}}
                   onPress={() => {
                    this.props.navigation.navigate(NavigationName.HamiltonQuestion, {
                        volunteer: this.props.route.params.volunteer,
                    })
                }}
                >
                <Card containerStyle={styles.cardBg}>
                    <View style={{ height:'100%'}}>
                        <View style={{flex:1}}>
                            <Card.Image
                                source={require("../../assets/img/hamilton.png")}
                                resizeMode="contain"
                            />
                        </View>
                        {/* <Text style={styles.buttonText}>แบบวัด HAMILTON</Text> */}
                    </View>
                    
                </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{height:'14%',marginTop: '20%'}}
                   onPress={() => {
                    this.props.navigation.navigate(NavigationName.PHQ9Question, {
                        volunteer: this.props.route.params.volunteer,
                    })
                }}
                >
                <Card containerStyle={styles.cardBg}>
                    <View style={{ height:'100%'}}>
                        <View style={{flex:1}}>
                            <Card.Image
                                source={require("../../assets/img/phq9.png")}
                                resizeMode="contain"
                            />
                        </View>
                        {/* <Text style={styles.buttonText}>แบบประเมิน PHQ9</Text> */}
                    </View>
                    
                </Card>
                </TouchableOpacity>

                <TouchableOpacity style={{height:'14%',marginTop: '20%'}}
                   onPress={() => {
                    this.props.navigation.navigate(NavigationName.VideoHelpPage
                    //    , {volunteer: this.props.route.params.volunteer,}
                    )
                }}
                >
                <Card containerStyle={styles.cardBg}>
                    <View style={{ height:'100%'}}>
                        <View style={{flex:1}}>
                            <Card.Image
                                source={require("../../assets/img/video.png")}
                                resizeMode="contain"
                            />
                        </View>
                        {/* <Text style={styles.buttonText}>Video</Text> */}
                    </View>
                    
                </Card>
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
        height: '21%',
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
    cardBg: {
        overflow: "hidden",
        //flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#83B8A2",
        marginBottom: -80
    }
});

export default VolunteerPage;