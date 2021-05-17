import { NOTIFY_USER, CLEAR_ALERT } from './types';

export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    message: message,
    messageType: messageType,
  };
};

export const clearAlert = () => {
  return {
    type: CLEAR_ALERT,
  };
};
