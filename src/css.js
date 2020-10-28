import { StyleSheet } from 'react-native';
import {
    color1,
} from './constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1[0],
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    box1: {
        height: "10%",
        width: "100%",
        backgroundColor: "white",
        flexDirection: 'column',
    },
    box2: {
        height: "90%",
        width: "100%",
        backgroundColor: "white",
        flexDirection: 'column',
    },
    box: {
        height: "93%",
        width: "95%",
        flex: 1,
        borderRadius: 8,
        backgroundColor: "white",
        margin: 10,
        flexDirection: 'column',
        padding: 3,
    },
    contentText: {
        margin: 10,
        fontSize: 18,
    },
    remark: {
        width: "95%",
        borderRadius: 8,
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    remrkText: {
        fontSize: 12,
    },
    button: {
        backgroundColor: color1[1],
        borderColor: color1[1],
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 3,
        marginTop: 3,
        width: "98%",
        alignSelf: 'center',
        justifyContent: "center",
    },
    buttonnext: {
        backgroundColor: color1[4],
        borderColor: color1[4],
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        width: "98%",
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonback: {
        backgroundColor: color1[3],
        borderColor: color1[3],
        borderWidth: 1,
        borderRadius: 2,
        marginTop: 10,
        marginBottom: 10,
        width: "98%",
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonTextBack: {
        color: 'white',
    },
    buttonTextNext: {
        color: 'white',
    },
    buttonText: {
        fontSize: 17,
        textAlign: "left",
        marginLeft: 10,
    },
    textinput: {
        height: 40,
        width: "80%",
        borderColor: color1[1],
        borderWidth: 1,
        borderRadius: 2,
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    autocomplete: {
        maxHeight: 40,
        width: "100%",
    },
});