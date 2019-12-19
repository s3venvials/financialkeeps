import axios from 'axios';
import { FETCH_USER, FETCH_BILLS, DELETE_BILLS, FETCH_GROSSPAY } from './types';

export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');

        dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBills = (values, history) => async dispatch => {
        const res = await axios.post('/api/bills', values);

        history.push('/dashboard');
        dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBills = () => async dispatch => {
        const res = await axios.get('/api/bills');

        dispatch({ type: FETCH_BILLS, payload: res.data });
};

export const deleteBills = (value, history) => async dispatch => {
        const res = await axios.post('/api/delete_bill', value);

        history.push('/dashboard');
        dispatch({ type: DELETE_BILLS, payload: res.data });
};

export const submitGrossPay = (values, history) => async dispatch => {
        const res = await axios.post('/api/grosspay', values);

        history.push('/dashboard');
        dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchGrossPay = () => async dispatch => {
        const res = await axios.get('/api/grosspay');

        dispatch({ type: FETCH_GROSSPAY, payload: res.data });
};

export const editGrossPay = (value, history) => async dispatch => {
        const res = await axios.post('/api/grossedit', value);

        history.push('/dashboard');
        dispatch({ type: FETCH_USER, payload: res.data });
};
