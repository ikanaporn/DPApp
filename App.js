import React from 'react';
import Main from './src/main';
import { Provider } from "react-redux";
import store from './src/store'
import Question from './src/components/ViewAdminQuestion';
import VideoRenderPage from './src/components/VideoRenderPage';

export default class App extends React.Component {
    render() {
        console.disableYellowBox = true;
        console.ignoredYellowBox = true;
        //console.log(store.getState());
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}