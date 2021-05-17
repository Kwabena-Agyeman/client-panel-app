import { NOTIFY_USER, CLEAR_ALERT } from './types';

const initialState = {
  message: null,
  messageType: null,
};

export const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        message: null,
        messageType: null,
      };
    default:
      return state;
  }
};

export default notifyReducer;
