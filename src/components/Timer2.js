import React, { Component,  PureComponent } from 'react';
import CountDown from 'react-native-countdown-component';
import { View } from 'react-native';
class Timer2 extends React.Component {

    render() {
        return (
            <View>

                <CountDown
                    until={10}
                    size={20}
                    //onFinish={this.props.onFinish2}
                    digitStyle={{backgroundColor: '#fff'}}
                    digitTxtStyle={{color: '#66918F'}}
                    timeToShow={['S']}
                    separatorStyle={{color: '#66918F'}}
                    timeLabels={{s: ''}}
                    running={this.props.runningTime2}
                    showSeparator
                />

              

            </View>
        )
    }
}
export default Timer2