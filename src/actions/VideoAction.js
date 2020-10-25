import { NEXT_COMMAND, BACK_COMMAND } from "../constants";

export const NextCommand = (navigation) => ({
  type: NEXT_COMMAND,
  navigation: navigation
});

export const BackCommand = () => ({
  type: BACK_COMMAND,
});



// export const next = () => {
//     return dispatch => {
//         dispatch(NextCommand())
//     }
// }
