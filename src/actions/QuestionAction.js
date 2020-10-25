import { SAVE, BACK } from '../constants';

export const Save = (reducer_name, navigation, route, selected_index, select_multiple_index, data,) => {
    return {
        type: SAVE,
        Choice_Selected: selected_index,
        select_multiple_index: select_multiple_index,
        text: data,
        name: reducer_name,
        navigation: navigation,
        route: route,
    }
}

export const Back = (reducer_name, navigation, route,) => {
    return {
        type: BACK,
        name: reducer_name,
        navigation: navigation,
        route: route,
    }
}