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

var ReducerName = 'HamiltonReducer';

class HamiltonQuestion extends Questionnaire {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.props.navigation.setOptions({
            headerTitle: () => (
                <View>
                    <Text style={[{ color: 'white', fontWeight: 'bold', },]}>แบบวัด HAMILTON รหัส: {this.props.route.params.volunteer.id}</Text>
                </View>
            )
        });
    }
    async componentDidMount() {
        await this.getData(this.props, this.props.HamiltonReducer, ReducerName);
    }
    async UNSAFE_componentWillReceiveProps(nextProps) {
        await this.getData(nextProps, nextProps.HamiltonReducer, ReducerName);
    }
    render() {
        return (
            <View style={styles.container}>
                {!(this.state.ready || this.state.ready_alway)
                    ? <Text>Loading</Text>
                    : <View style={[styles.container, { width: '100%' }]}>
                        <ProgressBar max={this.props.HamiltonReducer.question.test_length} step_no={this.props.HamiltonReducer.question.step_no} />
                        {(typeof this.props.HamiltonReducer.question.branch === 'undefined') ? null :
                            this.props.HamiltonReducer.question.branch.map((obj, index) => {
                                return (
                                    <ProgressBar key={index} max={obj.test_length} step_no={obj.step_no} color={color_ProgreesBar[index]} />
                                );
                            })}

                        {this.props.HamiltonReducer.question.answer_type != "selectedtext" ?
                            <ScrollView style={styles.box} persistentScrollbar={true}>{this.renderQuestion(this.props.HamiltonReducer, ReducerName)}</ScrollView> :
                            <SafeAreaView style={styles.box}>{this.renderQuestion(this.props.HamiltonReducer, ReducerName)}</SafeAreaView>}
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    HamiltonReducer: state.HamiltonReducer,
});

const mapDispatchToProps = {
    Save,
    Back,
};

export default connect(mapStateToProps, mapDispatchToProps)(HamiltonQuestion);