import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
