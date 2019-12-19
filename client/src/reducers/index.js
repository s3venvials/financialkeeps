import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import billsReducer from './billsReducer';
import grossPayReducer from './grossPayReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    bills: billsReducer,
    grossPay: grossPayReducer
});