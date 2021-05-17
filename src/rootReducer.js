import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import NotifyReducer from './Redux/NotifyReducer';

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: NotifyReducer,
});
