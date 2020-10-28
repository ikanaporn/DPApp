import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { getQuestionnaire } from '../server/server';
import { styles } from '../css';
import { color1, NavigationName, HAMILTON_SCALE, PHQ9_SCALE } from '../constants';

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
        const SCALE = (this.state.render_type == 'HAMILTON' ? HAMILTON_SCALE : PHQ9_SCALE);
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <View style={[styles.box2, { flex: 1, justifyContent: "center" }]}>
                    <Text style={{ fontSize: 20, alignSelf: "center" }}>คะแนนรวม</Text>
                    <Text style={{
                        fontSize: 200,
                        alignSelf: "center",
                        color: this.state.sum < SCALE.length ? SCALE[this.state.sum] : 'red'
                    }}>{this.state.sum}</Text>
                    <Text style={{ fontSize: 20, alignSelf: "center" }}>คะแนน</Text>
                    <Text style={{ fontSize: 20, alignSelf: "center" }}>จากคะแนนเต็ม {this.state.sumfull} คะแนน</Text>
                </View>
                <View style={styles.box1}>
                    <TouchableOpacity
                        style={[styles.buttonnext, {
                            backgroundColor: color1[4],
                            borderColor: color1[4],
                            height: '80%',
                            justifyContent: 'center'
                        }]}
                        onPress={() => {
                            switch (this.state.render_type) {
                                case 'HAMILTON':
                                    this.props.navigation.goBack();
                                    this.props.navigation.navigate(
                                        NavigationName.PHQ9Question, {
                                        volunteer: { id: this.props.route.params.volunteer.id },
                                    })
                                    break;
                                case 'PHQ9':
                                    this.props.navigation.goBack();
                                    this.props.navigation.navigate(
                                        NavigationName.VideoHelpPage, {
                                        volunteer: { id: this.props.route.params.volunteer.id },
                                    })
                                    break;
                                default:
                                    break;
                            }
                        }}
                    >
                        <Text style={[styles.buttonTextNext, { color: 'white', fontWeight: 'bold', }]}>แบบทดสอบถัดไป</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}