import {ADD_MSG, REMOVE_MSG, CLEAR_MSGS} from "../actions/msgsActions.js"

export default (state= [], {type,payload}) =>{
    switch(type){
        case ADD_MSG:
            return [...state,payload];
        case REMOVE_MSG:
            return state.filter((err,index) => index !== payload);
        case CLEAR_MSGS:
            return [];
        default :
            return state;
    }
}