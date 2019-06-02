    import {
        FETCH_CATEGORIES,
        FETCH_CATEGORY_ARTICLES,
        ATTEMPT_CATEGORIES_REQUEST
    } from "../actions/categoryActions"

    export default (state = [], {type,payload}) => {
        switch(type){
            case ATTEMPT_CATEGORIES_REQUEST:
                return {...state,loading:true}
            case FETCH_CATEGORIES : 
                return {...state,categories:payload,loading:false}
            case FETCH_CATEGORY_ARTICLES:
                return {...state,articlesCat:payload,loading:false}
            default :
             return state;
        }
    } 