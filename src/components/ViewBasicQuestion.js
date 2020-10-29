import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import ViewQuestion from './ViewQuestion';

export default class ViewBasicQuestion extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'BASIC'
        };
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>ข้อมูลพื้นฐาน รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData('BasicReducer');
    }
    render() {
        return this.renderQuestion();
    }
}