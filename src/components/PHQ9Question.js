import React from 'react';
import { connect } from 'react-redux';
import { Save, Back } from '../actions/QuestionAction';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { styles } from '../css';
import Questionnaire from './Questionnaire';
import { initialState, color_ProgreesBar } from './QuestionInitialState';
import ProgressBar from './ProgressBar';

var ReducerName = 'PHQ9Reducer';

class PHQ9Question extends Questionnaire {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>แบบประเมิน PHQ-9 รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData(this.props, this.props.PHQ9Reducer, ReducerName);
    }
    async UNSAFE_componentWillReceiveProps(nextProps) {
        await this.getData(nextProps, nextProps.PHQ9Reducer, ReducerName);
    }
    render() {
        return (
            <View style={styles.container}>
                {!(this.state.ready || this.state.ready_alway)
                    ? <Text>Loading</Text>
                    : <View style={[styles.container, { width: '100%' }]}>
                        <ProgressBar max={this.props.PHQ9Reducer.question.test_length} step_no={this.props.PHQ9Reducer.question.step_no} />
                        {(typeof this.props.PHQ9Reducer.question.branch === 'undefined') ? null :
                            this.props.PHQ9Reducer.question.branch.map((obj, index) => {
                                return (
                                    <ProgressBar key={index} max={obj.test_length} step_no={obj.step_no} color={color_ProgreesBar[index]} />
                                );
                            })}

                        {this.props.PHQ9Reducer.question.answer_type != "selectedtext" ?
                            <ScrollView style={styles.box} persistentScrollbar={true}>{this.renderQuestion(this.props.PHQ9Reducer, ReducerName)}</ScrollView> :
                            <SafeAreaView style={styles.box}>{this.renderQuestion(this.props.PHQ9Reducer, ReducerName)}</SafeAreaView>}
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    PHQ9Reducer: state.PHQ9Reducer,
});

const mapDispatchToProps = {
    Save,
    Back,
};

export default connect(mapStateToProps, mapDispatchToProps)(PHQ9Question);