// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      email: action.email,
    };

  default:
    return state;
  }
};

export default user;
