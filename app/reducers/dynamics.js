import {GET_CURRENCY_DYNAMICS, DYNAMICS_RESULT, DYNAMICS_ERROR} from "../actions/dynamics";

const initialState = {
  data: [],
  error: null,
  isDynamicsFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCY_DYNAMICS:
      return {
        ...state,
        isDynamicsFetching: true,
      };

    case DYNAMICS_RESULT:
      return {
        ...state,
        data: action.result,
        isDynamicsFetching: false,
      };

    case DYNAMICS_ERROR:
      return {
        ...state,
        error: action.error,
        isDynamicsFetching: false,
      };

    default:
      return state;
  }
};
