import { FETCH_GROSSPAY } from '../actions/types';

export default function(state = [{"loaded": false}], action) {
    // console.log(action);
    switch(action.type) {
        case FETCH_GROSSPAY:
            return action.payload;
        default:
            return state; 
    }
}