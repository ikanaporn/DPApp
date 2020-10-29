import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import ViewQuestion from './ViewQuestion';

export default class ViewHamiltonQuestion extends ViewQuestion {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            volunteer_id: this.props.route.params.volunteer.id,
            render_type: 'HAMILTON'
        };
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>แบบวัด HAMILTON รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData('HamiltonReducer');
    }
    render() {
        return this.renderQuestion();
    }
}