import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import ViewQuestion from './ViewQuestion';

export default class ViewAdminQuestion extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'ADMIN'
        };
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>ข้อมูลอาสาสมัคร รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData('AdminReducer');
    }
    render() {
        return this.renderQuestion();
    }
}