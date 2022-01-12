import { SET_WALLET, SET_WALLET_STATE, REQUEST_CURRENCY, GET_TOTAL } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  getTotal: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_WALLET:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SET_WALLET_STATE:
    return {
      ...state,
      expenses: [...state.expenses, action.savdWallet],
    };
  case REQUEST_CURRENCY: return { ...state };
  case GET_TOTAL:
    return {
      ...state,
      getTotal: action.total,
    };
  default:
    return state;
  }
};

export default wallet;
