import { takeEvery, takeLatest, select, call, put } from 'redux-saga/effects';
import Moment from 'moment';
// 1. Swap
// 2. Change Base
// 3. Initial request

import {
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_RESULT,
  CONVERSION_ERROR, CHANGE_QUOTE_CURRENCY,
} from '../actions/currencies';

import {
  GET_CURRENCY_DYNAMICS,
  DYNAMICS_RESULT,
  DYNAMICS_ERROR,
} from '../actions/dynamics';

const dateFormat = (date) => Moment(date).format('YYYY[-]M[-]D');

const getLatestRate = () =>
  fetch(`http://www.nbrb.by/API/ExRates/Rates?Periodicity=0`);

const getCurrencyDynamics = (currency, startDate, endDate) => {
  let start = dateFormat(startDate);
  let end = dateFormat(endDate);
  return fetch(`http://www.nbrb.by/API/ExRates/Rates/Dynamics/${currency}?startDate=${start}&endDate=${end}`);
};

function* fetchLatestConversionRates() {
  try {
    const response = yield call(getLatestRate);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    yield put({ type: CONVERSION_ERROR, error: e.message });
  }
}

function* fetchCurrencyDynamics(action) {
  try {
    let {currency, startDate, endDate } = action;
    const response = yield call(getCurrencyDynamics, currency, startDate, endDate);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: DYNAMICS_ERROR, error: result.error });
    } else {
      yield put({ type: DYNAMICS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: DYNAMICS_ERROR, error: e.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_QUOTE_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(GET_CURRENCY_DYNAMICS, fetchCurrencyDynamics);
}
