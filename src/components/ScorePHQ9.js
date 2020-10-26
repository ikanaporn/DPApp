import React from 'react';
import { Text, View } from 'react-native';

import Score from './Score';

export default class ScorePHQ9 extends Score {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            sum: 0,
            sumfull: 0,
        };
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>คะแนน PHQ9 รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }

    componentDidMount() {
        this.getData('PHQ9Reducer');
    }

    render() {
        return this.renderScore();
    }
}