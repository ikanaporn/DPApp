import React, { Component,  PureComponent } from 'react';
import CountDown from 'react-native-countdown-component';
import { View } from 'react-native';
class Timer extends React.Component {
    // componentDidMount() {
    //     alert(this.props.countdownStart)
    // }
    render() {
        return (
            <View>

                <CountDown
                    until={this.props.countdownStart}
                    size={20}
                    onFinish={this.props.onFinish}
                    // digitStyle={{backgroundColor: '#FFF'}}
                    // digitTxtStyle={{color: '#1CC625'}}
                    digitStyle={{backgroundColor: '#fff'}}
                    digitTxtStyle={{color: '#66918F'}}
                    timeToShow={['M','S']}
                    separatorStyle={{color: '#66918F'}}
                    timeLabels={{m: '', s: ''}}
                    running={this.props.runningTime}
                    showSeparator
                />

              

            </View>
        )
    }
}
export default Timer