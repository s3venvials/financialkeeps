import axios from 'axios';
import { FETCH_USER, FETCH_BILLS } from './types';

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
}
