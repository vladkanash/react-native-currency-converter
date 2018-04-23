export const GET_CURRENCY_DYNAMICS = 'GET_CURRENCY_DYNAMICS';
export const DYNAMICS_RESULT = 'DYNAMICS_RESULT';
export const DYNAMICS_ERROR = 'DYNAMICS_ERROR';

export const getCurrencyDynamics = (currency, startDate, endDate) => ({
  type: GET_CURRENCY_DYNAMICS,
  currency,
  startDate,
  endDate,
});