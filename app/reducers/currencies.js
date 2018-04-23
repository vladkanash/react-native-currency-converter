import {
  CHANGE_CURRENCY_AMOUNT,
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  CHANGE_QUOTE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/currencies';

const DEFAULT_CURRENCY = 'BYN';

const initialState = {
  baseCurrency: DEFAULT_CURRENCY,
  quoteCurrency: 'USD',
  amount: 100,
  conversions: {},
  error: null,
  swapped: false,
};

const mapConversions = (jsonResult) => {
  let result = {};
  jsonResult.forEach(e => {
    result[e.Cur_Abbreviation] = e;
  });
  return result;
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY_AMOUNT:
      return {
        ...state,
        amount: action.amount || 0,
      };

    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
        swapped: !state.swapped,
      };

    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        isFetching: true,
        swapped: true,
        baseCurrency: action.currency,
        quoteCurrency: DEFAULT_CURRENCY,
      };

    case CHANGE_QUOTE_CURRENCY: //TODO do not use this action
      return {
        ...state,
        baseCurrency: DEFAULT_CURRENCY,
        quoteCurrency: action.currency,
        isFetching: true,
        swapped: false,
      };

    case GET_INITIAL_CONVERSION:
      return {
        ...state,
        baseCurrency: DEFAULT_CURRENCY,
        isFetching: true,
      };

    case CONVERSION_RESULT:
      return {
        ...state,
        conversions: mapConversions(action.result),
        isFetching: false,
      };

    case CONVERSION_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
