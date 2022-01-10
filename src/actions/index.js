export const SET_USER = 'SET_USER';
export const SET_WALLET = 'SET_WALLET';

export const userAction = (email) => ({
  type: SET_USER,
  email,
});
