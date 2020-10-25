import { combineReducers } from "redux";
import AdminInitial from './AdminInitials';
import {
    NavigationName,
    EDIT
} from '../constants';

var num = 0;
const initialState = {
    name: 'ViewAdminReducer',
    questionnaire: num,
};

export default (state = initialState, action) => {
    var next_question_id =0;
    switch (action.type) {
        case EDIT:
            return {
                ...state,
                question_id: next_question_id,
                question_text: AdminInitial[next_question_id].question,
                answer_type: AdminInitial[next_question_id].answer_type,
                choices_text: AdminInitial[next_question_id].choices,
                next_state: AdminInitial[next_question_id].next_state,
                remark: AdminInitial[next_question_id].remark,
                test_length: AdminInitial[next_question_id].test_length,
                step_no: AdminInitial[next_question_id].step_no,
                branch: AdminInitial[next_question_id].branch,
                is_branch_node: AdminInitial[next_question_id].is_branch_node,
            };
        default:
            return state;
    }
}