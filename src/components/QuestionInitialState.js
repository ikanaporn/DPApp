import {
    color1,
} from '../constants';

var d = new Date();
d.setFullYear(new Date().getFullYear() - 30);
export const initialState = {
    selected_index: '',
    text_data: '',
    date: "01-01-" + d.getFullYear(),
    select_multiple_index: [],
    isVisibleOther: false,
};
export const color_ProgreesBar = [color1[3], color1[2], color1[4], color1[1]];