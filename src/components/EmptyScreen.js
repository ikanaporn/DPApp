import React from "react";
import { connect } from "react-redux";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    AppRegistry,
} from "react-native";
import { StackNavigator } from "react-navigation";

class EmptyScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props) {
        return (
            <View>
                <Text
                    style={{
                        fontSize: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 230,
                        textAlign: "center",
                    }}
                >
                    แบบทดสอบส่วนที่ 2 สำหรับอาสาสมัคร
                </Text>
                <View
                    style={{ paddingLeft: 14, paddingRight: 14, paddingVertical: 30 }}
                >
                    {/* <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("TestPart2Screen")}
                        style={styles.buttonNext}
                    >
                        <Text style={styles.buttonText}>ถัดไป</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.buttonNext}
                        onPress={() => props.navigation.navigate("TestPart3Screen")}
                    >
                        <Text style={styles.buttonText}>ถัดไป</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        color: "white",
        alignSelf: "center",
    },
    buttonNext: {
        backgroundColor: "#83B8A2",
        borderColor: "#83B8A2",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: "100%",
        height: 42,
        justifyContent: "space-around",
        justifyContent: "center",
    },
});

export default EmptyScreen;
