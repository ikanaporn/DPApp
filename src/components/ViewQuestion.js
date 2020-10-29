import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import { styles } from '../css';
import { bar, color1, NavigationName } from '../constants';
import { getQuestionnaire } from '../server/server';

const win_height = Dimensions.get('window').height;

export default class ViewQuestion extends Component {
    async getData(name) {
        try {
            this.setState({ questionnaire: await getQuestionnaire(this.state.volunteer_id, name) });
        } catch (err) {
            return null;
        }
    }
    renderAnswer(question, answer_type, choices, is_show_content_choice, selected_index, select_multiple_index, text_data, remark,) {
        var render_question =
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {question}
                </Text>
            </View>;

        var render_remark =
            <View style={[styles.remark, { marginTop: 10, },]}>
                <Text style={styles.remarkText}>{remark}</Text>
            </View>;

        var pad = 20;
        switch (answer_type) {
            case 'text':
                return (
                    <View>
                        {render_question}
                        <Text style={{ paddingLeft: pad, marginLeft: pad, }}>{text_data}</Text>
                        {remark ? render_remark : null}
                    </View>
                );
            case 'option':
                return (
                    <View>
                        {render_question}
                        {choices.map((obj, index) => {
                            return (selected_index == obj.id) ? (<Text key={index} style={{ paddingLeft: pad, marginLeft: pad, }}>{obj.content}</Text>) : null;
                        })}
                        {remark ? render_remark : null}
                    </View>
                );
            case 'option_other':
                return (
                    <View>
                        {render_question}
                        {choices.map((obj, index) => {
                            return (selected_index == obj.id && !obj.is_other) ? (<Text key={index} style={{ paddingLeft: pad, marginLeft: pad, }}>{obj.content}</Text>) : null;
                        })}
                        {text_data ? <Text style={{ paddingLeft: pad, marginLeft: pad, }}>{text_data}</Text> : null}
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
                        <Text style={{ paddingLeft: pad, marginLeft: pad, }}>{formatted_date}</Text>
                        {remark ? render_remark : null}
                    </View>
                );
            case 'selectedtext':
                return (
                    <View>
                        {render_question}
                        <Text style={{ paddingLeft: pad, marginLeft: pad, }}>{text_data}</Text>
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
                            return (all_index.find(element => element == obj.id) && !obj.is_other) ? (<Text key={index} style={{ paddingLeft: pad, marginLeft: pad, }}>{obj.content}</Text>) : null;
                        })}
                        {text_data ? <Text style={{ paddingLeft: pad, marginLeft: pad, }}>{text_data}</Text> : null}
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
                                    return (selected_index == sub_obj.id && !sub_obj.is_other) ? (<Text key={sub_index} style={{ paddingLeft: pad, marginLeft: pad, }}>{obj.content}{"\n"}{sub_obj.content}</Text>) : null;
                                });
                            } else {
                                return (selected_index == obj.id && !obj.is_other) ? (<Text key={index} style={{ paddingLeft: pad, marginLeft: pad, }}>{obj.content}</Text>) : null;
                            }
                        })}
                        {text_data ? <Text style={{ paddingLeft: pad, marginLeft: pad, }}>{text_data}</Text> : null}
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
                                    return (selected_index == sub_obj.id && !sub_obj.is_other) ? (<Text key={sub_index} style={{ paddingLeft: pad, marginLeft: pad, }}>{obj.content[0]} {sub_obj.content} {obj.content[1]}</Text>) : null;
                                });
                            } else {
                                return (selected_index == obj.id && !obj.is_other) ? (<Text key={index} style={{ paddingLeft: pad, marginLeft: pad, }}>{obj.content}</Text>) : null;
                            }
                        })}
                        {text_data ? <Text style={{ paddingLeft: pad, marginLeft: pad, }}>{text_data}</Text> : null}
                        {remark ? render_remark : null}
                    </View>
                );
            default:
                return null;
        }
    }
    renderQuestion() {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                {this.state.isScrollable ? bar : null}
                <ScrollView style={styles.box2}
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
                <View style={styles.box1}>
                    <TouchableOpacity
                        style={[styles.buttonnext, {
                            backgroundColor: color1[4],
                            borderColor: color1[4],
                            height: '80%',
                            justifyContent: 'center'
                        }]}
                        onPress={() => {
                            this.props.navigation.goBack();
                            this.props.navigation.navigate(
                                NavigationName.HamiltonQuestion, {
                                volunteer: { id: this.props.route.params.volunteer.id },
                            }
                            )
                        }}
                    >
                        <Text style={[styles.buttonTextNext, { color: 'white', fontWeight: 'bold', }]}>แบบทดสอบถัดไป</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}