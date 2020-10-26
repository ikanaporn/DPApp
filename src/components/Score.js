import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { getQuestionnaire } from '../server/server';

export default class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaire: null,
            sum: 0,
            sumfull: 0,
        };
    }
    
    componentDidMount() {
        this.getData('HamiltonReducer');
    }

    async getData(name) {
        try {
            var data = await getQuestionnaire(this.props.route.params.volunteer.id, name);
            var sum = 0;
            var sumfull = 0;
            data.map((obj, index) => {
                var question = obj.question;
                sum += parseInt(question.score[question.selected_index - 1]);
                sumfull += parseInt(question.score[question.score.length - 1]);
            });
            this.setState({ questionnaire: data, sum: sum, sumfull: sumfull });
        } catch (err) {
            return null;
        }
    }

    renderScore() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 20, alignSelf: "center" }}>คะแนนรวม</Text>
                <Text style={{ fontSize: 200, alignSelf: "center" }}>{this.state.sum}</Text>
                <Text style={{ fontSize: 20, alignSelf: "center" }}>คะแนน</Text>
                <Text style={{ fontSize: 20, alignSelf: "center" }}>จากคะแนนเต็ม {this.state.sumfull} คะแนน</Text>
            </View>
        );
    }
}