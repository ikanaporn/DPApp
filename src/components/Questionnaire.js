import React, { Component } from 'react';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    SafeAreaView,
    Picker,
    ScrollView,
    Image,
} from 'react-native';
import { Autocomplete } from "react-native-dropdown-autocomplete";
import DatePicker from 'react-native-datepicker';

import { color1 } from '../constants';
import { styles } from '../css';
import { initialState } from './QuestionInitialState';
import { writeUserData, getQuestion, getQuestionnaire, removeQuestion } from '../server/server';

const button_next_text = 'ถัดไป';
const button_back_text = 'ย้อนกลับ';
const button_hexcode = color1[0];
const button_selected_hexcode = color1[1];
const win_height = Dimensions.get('window').height;

const bar = <Image
    style={{
        alignSelf: 'flex-end',
        width: 20,
        height: 50,
        zIndex: 3,
        position: 'absolute',
    }}
    source={require("../../assets/img/updown.png")}
></Image>;

export default class Questionnaire extends Component {
    async getData(props, Reducer, ReducerName) {
        try {
            if (!this.state.ready_alway) {
                console.log("get");
                var userId;
                if (typeof props.route.params.volunteer === 'undefined') {
                    userId = Reducer.volunteer_id;
                    console.log(userId);
                } else {
                    userId = props.route.params.volunteer.id;
                }
                console.log("userId " + userId);
                var question = await getQuestion(userId, ReducerName, Reducer.question_id);
                var selected_index = '';
                if (typeof question.question.selected_index != 'undefined')
                    selected_index = question.question.selected_index;
                var select_multiple_index = [];
                if (typeof question.question.select_multiple_index != 'undefined')
                    select_multiple_index = question.question.select_multiple_index;
                var text_data = '';
                if (typeof question.question.text_data != 'undefined')
                    text_data = question.question.text_data;
                var d = new Date();
                d.setFullYear(new Date().getFullYear() - 30);
                var date = "01-01-" + d.getFullYear();
                if (question.question.answer_type == 'calendar')
                    date = question.question.text_data;
                var isVisibleOther = false;
                if (text_data != '') {
                    isVisibleOther = true;
                }
                this.setState({
                    selected_index: selected_index,
                    select_multiple_index: select_multiple_index,
                    text_data: text_data,
                    date: date,
                    isVisibleOther: isVisibleOther,
                    ready: true,
                });
            }
        } catch (err) {
            this.setState({
                ...initialState,
                ready_alway: true,
            });
        }
    }
    async save_question(Reducer, ReducerName, selected_index, select_multiple_index, text_data) {
        if (ReducerName === "AdminReducer") {
            if (Reducer.question_id == 0) {
                text_data = text_data == "" ? this.state.text_data : text_data;
            }
        }
        var question = Reducer.question;
        question.selected_index = selected_index;
        question.select_multiple_index = select_multiple_index;
        question.text_data = text_data;
        question.question_id = Reducer.question_id;
        if (question.is_branch_node) {
            var userId;
            if (typeof this.props.route.params.volunteer === 'undefined') {
                userId = Reducer.volunteer_id;
            } else {
                userId = this.props.route.params.volunteer.id;
            }
            var questionnaire = await getQuestionnaire(userId, ReducerName);
            if (typeof questionnaire[question.question_id] !== 'undefined') {
                var next_question = questionnaire[question.question_id].question;
                while (true) {
                    try {
                        var next_question_id = next_question.next_state[next_question.selected_index - 1];
                        if (next_question_id == 0)
                            break;
                        next_question = questionnaire[next_question_id].question;
                        console.log("remove " + next_question.question + " " + next_question.question_id);
                        removeQuestion(userId, ReducerName, next_question.question_id);
                        if (next_question.is_branch_end)
                            break;
                    } catch (err) {
                        break;
                    }
                }
            }
        }
        if (ReducerName === "AdminReducer") {
            if (Reducer.question_id == 0) {
                writeUserData(text_data, ReducerName, Reducer.question_id, question);
            } else {
                writeUserData(Reducer.volunteer_id, ReducerName, Reducer.question_id, question);
            }
        } else {
            writeUserData(this.props.route.params.volunteer.id, ReducerName, Reducer.question_id, question);
        }
        this.setState({
            ...initialState,
            ready: false,
        }, () => {
            console.log(text_data);
            this.props.Save(ReducerName, this.props.navigation, this.props.route, selected_index, select_multiple_index, text_data,)
        });
    }
    handleSelectItem(item, index) {
        this.setState({ text_data: item, });
    }
    select(index) {
        this.setState({ selected_index: index, });
    }
    select_multiple(index) {
        var a = this.state.select_multiple_index;
        var i = a.indexOf(index);
        if (i == -1) {
            this.setState({ select_multiple_index: this.state.select_multiple_index.concat(index), });
        } else {
            a.splice(i, index);
            this.setState({ select_multiple_index: a, });
        }
        this.setState({ selected_index: '' });
    }
    toggleOther(index) {
        if (this.state.selected_index == '') {
            selected_index = index;
        } else {
            selected_index = ''
        }
        text_data = this.state.isVisibleOther ? this.state.text_data : '';
        this.setState({ isVisibleOther: !this.state.isVisibleOther, selected_index: selected_index, text_data: text_data });
    }
    renderAnswer(Reducer, ReducerName) {
        var type = Reducer.question.answer_type;
        var choices = Reducer.question.choices;
        var remark = Reducer.question.remark;
        switch (type) {
            case "text":
                return (
                    <View>
                        <TextInput
                            value={this.state.text_data == '' ? this.state.TextInput : this.state.text_data}
                            editable={this.state.text_data == ''}
                            style={styles.textinput}
                            onChangeText={(text) => this.setState({ TextInput: text })}
                        />
                        {this.state.text_data == '' ? null : <Text>ไม่สามารถแก้ไขรหัสอาสาสมัครได้</Text>}
                        <TouchableOpacity
                            style={styles.buttonnext}
                            onPress={() => {
                                var text_data = this.state.TextInput;
                                var selected_index = null;
                                this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                            }}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextNext]}>
                                {button_next_text}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case "option":
                return (
                    <ScrollView
                        onContentSizeChange={(width, height) => {
                            if (height > (win_height * 0.6))
                                this.setState({ isScrollable: true });
                            else
                                this.setState({ isScrollable: false });
                        }}
                    >
                        {choices.map((key, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity
                                        style={[styles.button,
                                        {
                                            backgroundColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                            borderColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                        }]}
                                        onPress={() => {
                                            var selected_index = key.id;
                                            var text_data = null;
                                            this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                        }}
                                    >
                                        <Text
                                            style={[styles.buttonText,
                                            { color: this.state.selected_index == key.id ? 'white' : 'black' }]}
                                        >
                                            {this.state.selected_index == key.id ? '\u2713 ' : null}{key.content}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                );
            case "option_other":
                return (
                    <ScrollView
                        onContentSizeChange={(width, height) => {
                            if (height > (win_height * 0.6))
                                this.setState({ isScrollable: true });
                            else
                                this.setState({ isScrollable: false });
                        }}
                    >
                        {choices.map((key, index) => {
                            if (key.is_other) {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            style={[styles.button,
                                            {
                                                backgroundColor: this.state.selected_index === key.id ? button_hexcode : button_selected_hexcode,
                                                borderColor: this.state.selected_index === key.id ? button_hexcode : button_selected_hexcode
                                            }]}
                                            onPress={() => {
                                                this.select(key.id);
                                                this.toggleOther(key.id);
                                            }}
                                        >
                                            <Text style={styles.buttonText}>
                                                {key.content}
                                            </Text>
                                            {this.state.isVisibleOther || this.state.selected_index === key.id ?
                                                <TextInput
                                                    value={this.state.text_data}
                                                    style={styles.textinput}
                                                    onChangeText={(text) => this.setState({ text_data: text })}
                                                />
                                                : null
                                            }
                                        </TouchableOpacity>
                                        {this.state.isVisibleOther || this.state.selected_index === key.id ?
                                            <TouchableOpacity
                                                style={styles.buttonnext}
                                                onPress={() => {
                                                    var selected_index = this.state.selected_index;
                                                    var text_data = this.state.text_data;
                                                    if (text_data != '') {
                                                        this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                                    }
                                                }}
                                            >
                                                <Text style={[styles.buttonText, styles.buttonTextNext]}>
                                                    {button_next_text}
                                                </Text>
                                            </TouchableOpacity>
                                            : null
                                        }
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            style={[styles.button,
                                            {
                                                backgroundColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                                borderColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                            }]}
                                            onPress={() => {
                                                var selected_index = key.id;
                                                var text_data = null;
                                                this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                            }}
                                            disabled={this.state.isVisibleOther}
                                        >
                                            <Text
                                                style={[styles.buttonText,
                                                { color: this.state.selected_index == key.id ? 'white' : 'black' }]}
                                            >
                                                {this.state.selected_index == key.id ? '\u2713 ' : null}{key.content}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                        })}
                    </ScrollView>
                );
            case "calendar":
                return (
                    <View>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            androidMode="spinner"
                            confirmBtnText="ตกลง"
                            cancelBtnText="ยกเลิก"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />

                        <TouchableOpacity
                            style={styles.buttonnext}
                            onPress={() => {
                                var selected_index = null;
                                var text_data = this.state.date;
                                this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                            }}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextNext]}>
                                {button_next_text}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case "selectedtext":
                return (
                    <SafeAreaView>
                        <Autocomplete
                            data={choices}
                            valueExtractor={item => item}
                            minimumCharactersCount={0}
                            placeholder={remark}
                            handleSelectItem={(item, id) => this.handleSelectItem(item, id)}
                            noDataText='ไม่พบข้อมูล'
                            style={[styles.autocomplete,]}
                            inputStyle={styles.autocomplete}
                            initialValue={this.state.text_data}
                        />
                        <TouchableOpacity
                            style={styles.buttonnext}
                            onPress={() => {
                                var selected_index = null;
                                var text_data = this.state.text_data;
                                this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                            }}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextNext]}>
                                {button_next_text}
                            </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                );
            case "multiple":
                const next_button = <TouchableOpacity
                    style={styles.buttonnext}
                    onPress={() => {
                        if (this.state.select_multiple_index.length > 0) {
                            var selected_index = null;
                            var text_data = this.state.text_data;
                            this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                        }
                    }}
                >
                    <Text style={[styles.buttonText, styles.buttonTextNext]}>
                        {button_next_text}
                    </Text>
                </TouchableOpacity >;
                return (
                    <ScrollView
                        onContentSizeChange={(width, height) => {
                            if (height > (win_height * 0.6))
                                this.setState({ isScrollable: true });
                            else
                                this.setState({ isScrollable: false });
                        }}
                    >
                        {choices.map((key, index) => {
                            return (
                                <View key={index}>
                                    <TouchableOpacity
                                        disabled={key.is_go_to_next && this.state.select_multiple_index.length > 0}
                                        style={[styles.button,
                                        {
                                            backgroundColor: this.state.select_multiple_index.find(element => element == key.id) || this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                            borderColor: this.state.select_multiple_index.find(element => element == key.id) || this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                            opacity: (key.is_go_to_next && this.state.select_multiple_index.length > 0) ? 0.5 : 1
                                        }]}
                                        onPress={() => {
                                            this.select_multiple(key.id);
                                            if (key.is_other) { this.toggleOther(key.id) }
                                            if (key.is_go_to_next) {
                                                var selected_index = key.id;
                                                var text_data = null;
                                                this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                            }
                                        }}
                                    >
                                        <Text
                                            style={[styles.buttonText,
                                            { color: this.state.select_multiple_index.find(element => element == key.id) || this.state.selected_index == key.id ? 'white' : 'black' }]}
                                        >
                                            {this.state.select_multiple_index.find(element => element == key.id) || this.state.selected_index == key.id ? '\u2713 ' : null}{key.content}
                                        </Text>
                                        {this.state.isVisibleOther ?
                                            key.is_other ?
                                                <TextInput
                                                    value={this.state.text_data}
                                                    style={styles.textinput}
                                                    onChangeText={(text) => this.setState({ text_data: text })}
                                                />
                                                : null
                                            : null
                                        }
                                    </TouchableOpacity>
                                    {choices.length - 1 === index ? next_button : null}
                                </View>
                            );
                        })}
                    </ScrollView>
                );
            case "option_selection":
                return (
                    <ScrollView
                        onContentSizeChange={(width, height) => {
                            if (height > (win_height * 0.6))
                                this.setState({ isScrollable: true });
                            else
                                this.setState({ isScrollable: false });
                        }}
                    >
                        {choices.map((key, index) => {
                            if (key.is_selection) {
                                return (
                                    <View key={index}>
                                        <View
                                            style={[styles.button, { backgroundColor: color1[2], borderColor: color1[2] }]}
                                        >
                                            <Text style={styles.buttonText} key={index}>
                                                {key.content}
                                            </Text>
                                            {key.sub_choices.map((sub, sub_index) => {
                                                return (
                                                    <TouchableOpacity
                                                        key={sub_index}
                                                        style={[styles.button,
                                                        {
                                                            backgroundColor: this.state.selected_index == sub.id ? button_hexcode : button_selected_hexcode,
                                                            borderColor: this.state.selected_index == sub.id ? button_hexcode : button_selected_hexcode,
                                                        }]}
                                                        onPress={() => {
                                                            var selected_index = sub.id;
                                                            var text_data = null;
                                                            this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                                        }}
                                                    >
                                                        <Text style={[styles.buttonText, { color: 'white' }]}>
                                                            {this.state.selected_index == sub.id ? '\u2713 ' : null}{sub.content}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            style={[styles.button,
                                            {
                                                backgroundColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                                borderColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                            }]}
                                            onPress={() => {
                                                var selected_index = key.id;
                                                var text_data = null;
                                                this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                            }}
                                            disabled={this.state.isVisibleOther}
                                        >
                                            <Text style={styles.buttonText}>
                                                {key.content}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                        })}
                    </ScrollView>
                );
            case "option_picker":
                return (
                    <ScrollView
                        onContentSizeChange={(width, height) => {
                            if (height > (win_height * 0.6))
                                this.setState({ isScrollable: true });
                            else
                                this.setState({ isScrollable: false });
                        }}
                    >
                        {choices.map((key, index) => {
                            if (key.is_picker) {
                                return (
                                    <View key={index}>
                                        <View
                                            style={[styles.button,]}
                                        >
                                            <Text style={[styles.buttonText,]} key={index}>
                                                {key.content[0]}
                                                <Picker
                                                    selectedValue={this.state.selected_index != "" ? this.state.selected_index : "เลือก"}
                                                    style={{ width: 100, backgroundColor: color1[2], borderColor: color1[2] }}
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        var selected_index = itemValue;
                                                        var text_data = null;
                                                        this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                                    }}
                                                >
                                                    <Picker.Item label="เลือก" value="เลือก" />
                                                    {key.sub_choices.map((sub, sub_index) => {
                                                        return (
                                                            <Picker.Item key={sub_index} label={sub.content} value={sub.id} />
                                                        );
                                                    })}
                                                </Picker>
                                                {key.content[1]}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            style={[styles.button,
                                            {
                                                backgroundColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                                borderColor: this.state.selected_index == key.id ? button_hexcode : button_selected_hexcode,
                                            }]}
                                            onPress={() => {
                                                var selected_index = key.id;
                                                var text_data = null;
                                                this.save_question(Reducer, ReducerName, selected_index, this.state.select_multiple_index, text_data);
                                            }}
                                            disabled={this.state.isVisibleOther}
                                        >
                                            <Text
                                                style={[styles.buttonText,
                                                { color: this.state.selected_index == key.id ? 'white' : 'black' }]}
                                            >
                                                {this.state.selected_index == key.id ? '\u2713 ' : null}{key.content}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }
                        })}
                    </ScrollView>
                );
            default:
                return null;
        }
    }
    renderQuestion(Reducer, ReducerName) {
        return (
            <View style={[{
                height: win_height * 0.8,
                alignItems: 'center',
                justifyContent: 'center',
            }]}>
                <View style={[styles.box2]}>
                    {this.state.isScrollable ? bar : null}
                    <Text style={styles.contentText}>
                        {Reducer.question.question}
                    </Text>
                    {Reducer.question.answer_type !== 'selectedtext' &&
                        typeof Reducer.question.remark !== 'undefined' ?
                        <View style={styles.remark}>
                            <Text style={styles.remarkText}>
                                {Reducer.question.remark}
                            </Text>
                        </View>
                        : null
                    }
                    {this.renderAnswer(Reducer, ReducerName)}
                </View>
                <View style={[styles.box1]}>
                    {Reducer.question_id > 0
                        ?
                        <TouchableOpacity
                            style={styles.buttonback}
                            onPress={() => {
                                this.props.Back(ReducerName, this.props.navigation, this.props.route,);
                            }}
                        >
                            <Text style={[styles.buttonText, styles.buttonTextBack]}>
                                {button_back_text}
                            </Text>
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        );
    }
}
