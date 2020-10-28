import React from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';

import {
    bar,
    color1,
    NavigationName,
} from '../constants';
import { listUser } from '../server/server';

const win_height = Dimensions.get('window').height;

class ListAdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
        this.props.navigation.addListener('focus', () => {
            this.getData();
        });
    }
    componentDidMount() {
        this.getData();
    }
    async getData() {
        try {
            var data = await listUser();
            this.setState({ data: data });
        } catch (err) {
            return [];
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isScrollable ? bar : null}
                <View style={styles.box1}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: color1[4], borderColor: color1[4] }]}
                        onPress={() => {
                            this.props.navigation.navigate(
                                NavigationName.AdminQuestion, {}
                            )
                        }}
                    >
                        <Text style={[styles.buttonText, { color: 'white', }]}>เพิ่ม</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.box2}
                    onContentSizeChange={(width, height) => {
                        if (height > (win_height * 0.82))
                            this.setState({ isScrollable: true });
                        else
                            this.setState({ isScrollable: false });
                    }}
                >
                    <Text>กดค้างเพื่อแก้ไขประเภทอาสามัคร</Text>
                    {this.state.data == null
                        ? <Text>Loading</Text>
                        : this.state.data.map((obj, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.button,]}
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                        this.props.navigation.navigate(
                                            NavigationName.ListVolunteerPage, {
                                            volunteer: obj,
                                        })
                                        this.props.navigation.navigate(
                                            NavigationName.VolunteerPage, {
                                            volunteer: obj,
                                        })
                                        this.props.navigation.navigate(
                                            NavigationName.BasicQuestion, {
                                            volunteer: obj,
                                        })
                                    }}
                                    onLongPress={() => {
                                        this.props.navigation.navigate(
                                            NavigationName.AdminQuestion, {
                                            volunteer: obj,
                                        })
                                    }}
                                >
                                    <Text style={[styles.buttonText,]}>{obj.id}</Text>
                                </TouchableOpacity>
                            );
                        })}
                </ScrollView>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color1[0],
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
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
    button: {
        backgroundColor: color1[1],
        borderColor: color1[1],
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 8,
        width: "90%",
        height: 40,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 17,
        textAlign: "center",
    },
});

export default ListAdminPage;