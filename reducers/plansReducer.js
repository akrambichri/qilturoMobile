import {
    FETCH_ALL_PLANS,

} from "../actions/planActions"

const INIT = []

export default (state= INIT,{type,payload}) => {

    switch(type){
        case FETCH_ALL_PLANS:
            return payload
        default:
         return state;
    }
}