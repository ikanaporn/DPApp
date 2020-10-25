import { EDIT } from '../constants';

export const Edit = (reducer_name, navigation, route, question_id) => {
    return {
        type: EDIT,
        name: reducer_name,
        navigation: navigation,
        route: route,
        question_id: question_id,
    }
}