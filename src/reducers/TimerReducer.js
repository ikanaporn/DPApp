import { TIMER_NEXT, TIMER_START, TIMER_RETRY, TIMER_STOP } from '../actions/types';
import CountDown from 'react-native-countdown-component';

//var num = 0
const INITIAL_STATE = {
    limit:  60 * 2 + 0
    
    //command_num: num,
    // test_number: num,
    //command_text: Test3Commandinitial[num].data,
    //isCommand: false
    
}

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {

        case TIMER_START:
            return {
                ...state,
                limit: 60 * 2 + 0

            }
        case TIMER_NEXT:
                return {
                    ...state,
                    limit: 60 * 0 + 0
    
                }
        default:
            return state
                
    }
};