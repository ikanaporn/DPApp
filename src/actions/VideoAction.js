import { NEXT_COMMAND, BACK_COMMAND } from "../constants";

export const NextCommand = (navigation) => ({
  type: NEXT_COMMAND,
  navigation: navigation
});

export const BackCommand = (navigation) => ({
  type: BACK_COMMAND,
  navigation: navigation
});



// export const next = () => {
//     return dispatch => {
//         dispatch(NextCommand())
//     }
// }
