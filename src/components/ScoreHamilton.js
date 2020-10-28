import React from 'react';
import { Text, View } from 'react-native';

import Score from './Score';

export default class ScoreHamilton extends Score {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            sum: 0,
            sumfull: 0,
            render_type: 'HAMILTON',
        };
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>คะแนน HAMILTON รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }

    componentDidMount() {
        this.getData('HamiltonReducer');
    }

    render() {
        return this.renderScore();
    }
}