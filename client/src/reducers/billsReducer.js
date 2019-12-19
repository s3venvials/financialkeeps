import { FETCH_BILLS, DELETE_BILLS } from '../actions/types';

export default function(state = [{"loaded": false}], action) {
    // console.log(action);
    switch(action.type) {
        case FETCH_BILLS:
            return action.payload;
        case DELETE_BILLS:
            return state.filter((bills) => bills.id !== action.id);
        default:
            return state; 
    }
}