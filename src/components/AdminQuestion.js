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

var ReducerName = 'AdminReducer';

class AdminQuestion extends Questionnaire {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>ข้อมูลอาสาสมัคร</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData(this.props, this.props.AdminReducer, ReducerName);
    }
    async UNSAFE_componentWillReceiveProps(nextProps) {
        await this.getData(nextProps, nextProps.AdminReducer, ReducerName);
    }
    render() {
        return (
            <View style={styles.container}>
                {!(this.state.ready || this.state.ready_alway)
                    ? <Text>Loading</Text>
                    : <View style={[styles.container, { width: '100%' }]}>
                        <ProgressBar max={this.props.AdminReducer.question.test_length} step_no={this.props.AdminReducer.question.step_no} />
                        {(typeof this.props.AdminReducer.question.branch === 'undefined') ? null :
                            this.props.AdminReducer.question.branch.map((key, index) => {
                                return (
                                    <ProgressBar key={index} max={key.test_length} step_no={key.step_no} color={color_ProgreesBar[index]} />
                                );
                            })}

                        {this.props.AdminReducer.question.answer_type != "selectedtext" ?
                            <ScrollView style={styles.box} persistentScrollbar={true}>{this.renderQuestion(this.props.AdminReducer, ReducerName)}</ScrollView> :
                            <SafeAreaView style={styles.box}>{this.renderQuestion(this.props.AdminReducer, ReducerName)}</SafeAreaView>}
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    AdminReducer: state.AdminReducer,
});

const mapDispatchToProps = {
    Save,
    Back,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminQuestion);