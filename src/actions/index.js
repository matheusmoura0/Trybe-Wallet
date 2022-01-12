export const SET_USER = 'SET_USER';
export const SET_WALLET = 'SET_WALLET';
export const SET_WALLET_STATE = 'SET_WALLET_STATE';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const GET_TOTAL = 'GET_TOTAL';

export function getcurrency() {
  return { type: REQUEST_CURRENCY };
}

// export function getexchange() {
//   return { type: REQUEST_EXCHANGE };
// }
export const userAction = (email) => ({
  type: SET_USER,
  email,
});

export function getTotal(total) {
  return { type: GET_TOTAL,
    total,
  };
}

export function walletAction({ currencies, expenses }) {
  return { type: SET_WALLET,
    currencies,
    // exchangeRates,
    expenses };
}

// export function exchangeAction({ exchangeRates }) {
//   return { type: REQUEST_EXCHANGE,
//     exchangeRates };
// }

export function saveWallet(savdWallet) {
  return { type: SET_WALLET_STATE,
    savdWallet,
  };
}

export function fetchAPI(expenses) {
  return async (dispatch) => {
    dispatch(getcurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        return dispatch(walletAction({ expenses,
          exchangeRates: data,
          currencies: data }));
      });
  };
}

// export function fetchExchanges(exchangeRates, currencies) {
//   return async (dispatch) => {
//     dispatch(getcurrency());
//     return fetch('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => response.json())
//       .then((data) => {
//         delete data.USDT;
//         return dispatch(exchangeAction({
//           exchangeRates: data,
//           currencies: data }));
//       });
//   };
// }
