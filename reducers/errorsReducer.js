import {ADD_ERROR, REMOVE_ERROR, CLEAR_ERROR} from "../actions/errorsActions"

export default (state= [], {type,payload}) =>{
    switch(type){
        case ADD_ERROR:
            return [...state,payload];
        case REMOVE_ERROR:
            return state.filter((err,index) => index !== payload);
        case CLEAR_ERROR:
            return [];
        default :
            return state;
    }
}