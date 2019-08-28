import { FETCH_BILLS } from '../actions/types';

export default function(state = [], action) {
    // console.log(action);
    switch(action.type) {
        case FETCH_BILLS:
            return action.payload;
        default:
            return state; 
    }
}