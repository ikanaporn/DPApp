import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import ViewQuestion from './ViewQuestion';

export default class ViewPHQ9Question extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'PHQ9'
        };
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>แบบประเมิน PHQ9 รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData('PHQ9Reducer');
    }
    render() {
        return this.renderQuestion();
    }
}