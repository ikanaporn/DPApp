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

var ReducerName = 'BasicReducer';

class BasicQuestion extends Questionnaire {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>ข้อมูลพื้นฐาน รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData(this.props, this.props.BasicReducer, ReducerName);
    }
    async UNSAFE_componentWillReceiveProps(nextProps) {
        await this.getData(nextProps, nextProps.BasicReducer, ReducerName);
    }
    render() {
        return (
            <View style={styles.container}>
                {!(this.state.ready || this.state.ready_alway)
                    ? <Text>Loading</Text>
                    : <View style={[styles.container, { width: '100%' }]}>
                        <ProgressBar max={this.props.BasicReducer.question.test_length} step_no={this.props.BasicReducer.question.step_no} />
                        {(typeof this.props.BasicReducer.question.branch === 'undefined') ? null :
                            this.props.BasicReducer.question.branch.map((obj, index) => {
                                return (
                                    <ProgressBar key={index} max={obj.test_length} step_no={obj.step_no} color={color_ProgreesBar[index]} />
                                );
                            })}

                        {this.props.BasicReducer.question.answer_type != "selectedtext" ?
                            <ScrollView style={styles.box} persistentScrollbar={true}>{this.renderQuestion(this.props.BasicReducer, ReducerName)}</ScrollView> :
                            <SafeAreaView style={styles.box}>{this.renderQuestion(this.props.BasicReducer, ReducerName)}</SafeAreaView>}
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    BasicReducer: state.BasicReducer,
});

const mapDispatchToProps = {
    Save,
    Back,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicQuestion);