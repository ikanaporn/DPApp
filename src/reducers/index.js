import { combineReducers } from "redux";
import AdminInitial from './AdminInitials';
import BasicInitial from './BasicInitials';
import HamiltonInitial from './HamiltonInitials';
import PHQ9Initial from './PHQ9Initials';
import VideoReducer from './VideoReducer';
import {
    NavigationName,
    SAVE,
    BACK
} from '../constants';

var num = 0;
const ADMIN_INITIAL_STATE = {
    name: 'AdminReducer',
    question_id: num,
    question: AdminInitial[num],
};
const BASIC_INITIAL_STATE = {
    name: 'BasicReducer',
    question_id: num,
    question: BasicInitial[num],
};
const HAMILTON_INITIAL_STATE = {
    name: 'HamiltonReducer',
    question_id: num,
    question: HamiltonInitial[num],
};
const PHQ9_INITIAL_STATE = {
    name: 'PHQ9Reducer',
    question_id: num,
    question: PHQ9Initial[num],
};

const makeReducer = (initialState, Initial, name) => (state = initialState, action) => {
    if (name !== action.name) return state;
    var next_question_id;
    if (action.Choice_Selected === null) {
        next_question_id = state.question.next_state[0];
    } else {
        next_question_id = state.question.next_state[action.Choice_Selected - 1];
    }
    if (parseInt(next_question_id) === 0) {
        if (name === 'AdminReducer') {
            action.navigation.goBack();
            action.navigation.navigate(NavigationName.ViewAdminQuestion, {
                volunteer: { id: state.volunteer_id },
            });
            return {
                name: 'AdminReducer',
                question_id: num,
                question: AdminInitial[num],
            };
        } else if (name === 'BasicReducer') {
            action.navigation.goBack();
            action.navigation.navigate(NavigationName.ViewBasicQuestion, {
                volunteer: action.route.params.volunteer,
            });
            return {
                name: 'BasicReducer',
                question_id: num,
                question: BasicInitial[num],
            };
        } else if (name === 'HamiltonReducer') {
            action.navigation.goBack();
            action.navigation.navigate(NavigationName.ViewHamiltonQuestion, {
                volunteer: action.route.params.volunteer,
            });
            return {
                name: 'HamiltonReducer',
                question_id: num,
                question: HamiltonInitial[num],
            };
        } else if (name === 'PHQ9Reducer') {
            action.navigation.goBack();
            action.navigation.navigate(NavigationName.ViewPHQ9Question, {
                volunteer: action.route.params.volunteer,
            });
            return {
                name: 'PHQ9Reducer',
                question_id: num,
                question: PHQ9Initial[num],
            };
        }
    }
    if (name === 'AdminReducer' && state.question_id == 0) {
        state.volunteer_id = action.text;
    }

    switch (action.type) {
        case SAVE:
            return {
                ...state,
                question_id: next_question_id,
                question: Initial[next_question_id],
            };
        case BACK:
            return {
                ...state,
                question_id: state.question_id - 1,
                question: Initial[state.question_id - 1],
            };
        default:
            return state;
    }
}

export default combineReducers({
    AdminReducer: makeReducer(ADMIN_INITIAL_STATE, AdminInitial, 'AdminReducer'),
    BasicReducer: makeReducer(BASIC_INITIAL_STATE, BasicInitial, 'BasicReducer'),
    HamiltonReducer: makeReducer(HAMILTON_INITIAL_STATE, HamiltonInitial, 'HamiltonReducer'),
    PHQ9Reducer: makeReducer(PHQ9_INITIAL_STATE, PHQ9Initial, 'PHQ9Reducer'),
    VideoReducer: VideoReducer,
});