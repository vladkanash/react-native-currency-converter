import { combineReducers } from 'redux';

import currencies from './currencies';
import theme from './theme';
import dynamics from './dynamics';

export default combineReducers({
  currencies,
  theme,
  dynamics,
});
