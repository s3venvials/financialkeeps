import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import billsReducer from './billsReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    bills: billsReducer
});