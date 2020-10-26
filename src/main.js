import React from 'react';
import {
    StyleSheet,
} from 'react-native';

import {
    color1,
    NavigationName
} from './constants';
import MainPage from './components/MainPage';
import ListVolunteerPage from './components/ListVolunteerPage';
import ListAdminPage from './components/ListAdminPage';
import VolunteerPage from './components/VolunteerPage';
import AdminQuestion from './components/AdminQuestion';
import BasicQuestion from './components/BasicQuestion';
import HamiltonQuestion from './components/HamiltonQuestion';
import PHQ9Question from './components/PHQ9Question';
import ViewAdminQuestion from './components/ViewAdminQuestion';
import ViewBasicQuestion from './components/ViewBasicQuestion';
import ViewHamiltonQuestion from './components/ViewHamiltonQuestion';
import ViewPHQ9Question from './components/ViewPHQ9Question';
import ScoreHamilton from './components/ScoreHamilton';
import ScorePHQ9 from './components/ScorePHQ9';
import VideoPage from './components/VideoPage';
import VideoHelpPage from './components/VideoHelpPage';
//import VideoRenderPage from './components/VideoRenderPage';


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class Main extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={NavigationName.MainPage}
                        component={MainPage}
                        options={{
                            title: 'หน้าหลัก',
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />

                    <Stack.Screen
                        name={NavigationName.ListVolunteerPage}
                        component={ListVolunteerPage}
                        options={{
                            title: 'อาสาสมัคร',
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.VolunteerPage}
                        component={VolunteerPage}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.BasicQuestion}
                        component={BasicQuestion}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                            headerLeft: null,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.HamiltonQuestion}
                        component={HamiltonQuestion}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                            headerLeft: null,
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.PHQ9Question}
                        component={PHQ9Question}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                            headerLeft: null,
                        }}
                    />

                    <Stack.Screen
                        name={NavigationName.ListAdminPage}
                        component={ListAdminPage}
                        options={{
                            title: 'อาสาสมัคร',
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.AdminQuestion}
                        component={AdminQuestion}
                        options={{
                            title: 'สำหรับผู้เก็บข้อมูล',
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                            headerLeft: null,
                        }}
                    />

                    <Stack.Screen
                        name={NavigationName.VideoPage}
                        component={VideoPage}
                        options={{
                            title: 'วิดีโอ',
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                            headerLeft: null,
                        }}
                    />

                    <Stack.Screen
                        name={NavigationName.ViewAdminQuestion}
                        component={ViewAdminQuestion}
                        options={{
                            
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.ViewBasicQuestion}
                        component={ViewBasicQuestion}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.ViewHamiltonQuestion}
                        component={ViewHamiltonQuestion}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.ViewPHQ9Question}
                        component={ViewPHQ9Question}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.ScoreHamilton}
                        component={ScoreHamilton}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    <Stack.Screen
                        name={NavigationName.ScorePHQ9}
                        component={ScorePHQ9}
                        options={{
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                     <Stack.Screen
                        name={NavigationName.VideoHelpPage}
                        component={VideoHelpPage}
                        options={{
                            title: 'คำแนะนำ',
                            headerStyle: [styles.headerStyle,],
                            headerTintColor: 'white',
                            headerTitleStyle: [styles.headerTitleStyle,],
                        }}
                    />
                    
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerStyle: {
        backgroundColor: color1[0],
        height: 70,
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Main;