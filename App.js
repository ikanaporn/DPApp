import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { Provider } from "react-redux";

import Main from './src/main';
import store from './src/store'

export default class App extends React.Component {
    _activate = () => {
        activateKeepAwake();
    };
    render() {
        console.disableYellowBox = true;
        console.ignoredYellowBox = true;
        //console.log(store.getState());
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}
