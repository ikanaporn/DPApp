import { combineReducers } from "redux";
import { NEXT_COMMAND, END_TEST, BACK_COMMAND } from "../constants";
import VideoInitial from "./VideoInitial";
import { State } from "react-native-gesture-handler";

var num = 14;
var prog = 0;
const INITIAL_STATE = {
    command_num: num,
    element: VideoInitial[num],
    isCommand: false,
    isEnd: false,
    
    //progress: prog,
};

export default (state = INITIAL_STATE, action) => {
    console.log("Reducer command_num : ",state.command_num)
    if (state.command_num == 31) {
        action.navigation.goBack();
        action.navigation.goBack();
        action.navigation.goBack();
        return {
            command_num: num,
            element: VideoInitial[num],
            isCommand: false,
            isEnd: false,
        }
    }
    switch (action.type) {
        
        case NEXT_COMMAND:
            return {
                ...state,
                command_num: state.command_num + 1,
                //command_text: VideoInitial[state.command_num+1].data,
                element: VideoInitial[state.command_num+1],
                isCommand: true,
                isEnd: false,
                //progress: this.state.progress,
            };

        case BACK_COMMAND:
            return {
                ...state,
                command_num: state.command_num - 1,
                element: VideoInitial[state.command_num-1],
                //command_text: VideoInitial[state.command_num-1].data,
                isCommand: true,
                isEnd: false,
                //progress: this.state.progress,
            };

        case END_TEST:
            return {
                ...state,
                command_num: num,
                test_number: num,
                command_text: VideoInitial[num].data,
                isCommand: false,
                isEnd: true,
            };
        default:
            return state;
    }
};
