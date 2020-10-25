import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import { styles } from '../css';
import { TouchableOpacity } from 'react-native-gesture-handler';

const win_height = Dimensions.get('window').height;
const bar = <Image
    style={{
        alignSelf: 'flex-end',
        width: 10,
        height: 50,
        zIndex: 3,
        position: 'absolute',
    }}
    source={require("../../assets/img/updown.png")}
></Image>;

export default class ViewQuestion extends Component {
    renderAnswer(question, answer_type, choices, is_show_content_choice, selected_index, select_multiple_index, text_data, remark,) {
        var render_question =
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    {question}
                </Text>
            </TouchableOpacity>;

        var render_remark =
            <View style={[styles.remark, { marginTop: 10, },]}>
                <Text style={styles.remarkText}>{remark}</Text>
            </View>;

        switch (answer_type) {
            case 'text':
                return (
                    <View>
                        {render_question}
                        <Text>{text_data}</Text>
                        {remark ? render_remark : null}
                    </View>
                );
            case 'option':
                return (
                    <View>
                        {render_question}
                        {choices.map((obj, index) => {
                            return (selected_index == obj.id) ? (<Text key={index}>{obj.content}</Text>) : null;
                        })}
                        {remark ? render_remark : null}
                    </View>
                );
            case 'option_other':
                return (
                    <View>
                        {render_question}
                        {choices.map((obj, index) => {
                            return (selected_index == obj.id && !obj.is_other) ? (<Text key={index}>{obj.content}</Text>) : null;
                        })}
                        {text_data ? <View><Text>{text_data}</Text></View> : null}
                        {remark ? render_remark : null}
                    </View>
                );
            case 'calendar':
                // months are indexed from 0 in js.  text_data='01-01-1990'
                var d = parseInt(text_data.substring(0, 2));
                var m = parseInt(text_data.substring(3, 5));
                var y = parseInt(text_data.substring(6, 10));
                var date = new Date(y, m - 1, d);
                const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
                let formatted_date = date.getDate() + " " + months[date.getMonth()] + " พ.ศ. " + (date.getFullYear() + 543);
                return (
                    <View>
                        {render_question}
                        <Text>{formatted_date}</Text>
                        {remark ? render_remark : null}
                    </View>
                );
            case 'selectedtext':
                return (
                    <View>
                        {render_question}
                        <Text>{text_data}</Text>
                    </View>
                );
            case 'multiple':
                var all_index = select_multiple_index;
                if (typeof all_index === 'undefined') {
                    all_index = [selected_index];
                }
                return (
                    <View>
                        {render_question}
                        {choices.map((obj, index) => {
                            return (all_index.find(element => element == obj.id) && !obj.is_other) ? (<Text key={index}>{obj.content}</Text>) : null;
                        })}
                        {text_data ? <View><Text>{text_data}</Text></View> : null}
                        {remark ? render_remark : null}
                    </View>
                );
            case "option_selection":
                return (
                    <View>
                        {render_question}
                        {choices.map((obj, index) => {
                            if (obj.is_selection) {
                                return obj.sub_choices.map((sub_obj, sub_index) => {
                                    return (selected_index == sub_obj.id && !sub_obj.is_other) ? (<Text key={sub_index}>{obj.content}{"\n"}{sub_obj.content}</Text>) : null;
                                });
                            } else {
                                return (selected_index == obj.id && !obj.is_other) ? (<Text key={index}>{obj.content}</Text>) : null;
                            }
                        })}
                        {text_data ? <View><Text>{text_data}</Text></View> : null}
                        {remark ? render_remark : null}
                    </View>
                );
            case "option_picker":
                return (
                    <View>
                        {render_question}
                        {choices.map((obj, index) => {
                            if (obj.is_picker) {
                                return obj.sub_choices.map((sub_obj, sub_index) => {
                                    return (selected_index == sub_obj.id && !sub_obj.is_other) ? (<Text key={sub_index}>{obj.content[0]} {sub_obj.content} {obj.content[1]}</Text>) : null;
                                });
                            } else {
                                return (selected_index == obj.id && !obj.is_other) ? (<Text key={index}>{obj.content}</Text>) : null;
                            }
                        })}
                        {text_data ? <View><Text>{text_data}</Text></View> : null}
                        {remark ? render_remark : null}
                    </View>
                );
            default:
                return null;
        }
    }

    renderQuestion() {
        switch (this.state.render_type) {
            case 'ADMIN':
                this.props.navigation.setOptions({
                    headerTitle: () => (
                        <View>
                            <Text style={[{ color: 'white', fontWeight: 'bold', },]}>ข้อมูลอาสาสมัคร</Text>
                            <Text style={[{ color: 'white', },]}>รหัสอาสาสมัคร {this.props.route.params.volunteer.id}</Text>
                        </View>
                    )
                });
                break;
            case 'BASIC':
                this.props.navigation.setOptions({
                    headerTitle: () => (
                        <View>
                            <Text style={[{ color: 'white', fontWeight: 'bold', },]}>ข้อมูลพื้นฐาน</Text>
                            <Text style={[{ color: 'white', },]}>รหัสอาสาสมัคร {this.props.route.params.volunteer.id}</Text>
                        </View>
                    )
                });
                break;
            case 'HAMILTON':
                this.props.navigation.setOptions({
                    headerTitle: () => (
                        <View>
                            <Text style={[{ color: 'white', fontWeight: 'bold', },]}>แบบวัด HAMILTON</Text>
                            <Text style={[{ color: 'white', },]}>รหัสอาสาสมัคร {this.props.route.params.volunteer.id}</Text>
                        </View>
                    )
                });
                break;
            case 'PHQ9':
                this.props.navigation.setOptions({
                    headerTitle: () => (
                        <View>
                            <Text style={[{ color: 'white', fontWeight: 'bold', },]}>แบบประเมิน PHQ9</Text>
                            <Text style={[{ color: 'white', },]}>รหัสอาสาสมัคร {this.props.route.params.volunteer.id}</Text>
                        </View>
                    )
                });
                break;
            default:
                break;
        }
        return (
            <View style={styles.container}>
                {this.state.isScrollable ? bar : null}
                <ScrollView style={styles.box}
                    onContentSizeChange={(width, height) => {
                        if (height > (win_height * 0.82))
                            this.setState({ isScrollable: true });
                        else
                            this.setState({ isScrollable: false });
                    }}
                >
                    {this.state.questionnaire == null
                        ? <Text>Loading</Text>
                        : this.state.questionnaire.map((obj, index) => {
                            return (
                                <View style={{ flex: 1 }} key={index}>
                                    {this.renderAnswer(
                                        obj.question.question,
                                        obj.question.answer_type,
                                        obj.question.choices,
                                        obj.question.is_show_content_choice,
                                        obj.question.selected_index,
                                        obj.question.select_multiple_index,
                                        obj.question.text_data,
                                        obj.question.remark,
                                    )}
                                </View>
                            );
                        })}
                </ScrollView>
            </View>
        );
    }
}