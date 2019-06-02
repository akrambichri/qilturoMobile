import {
    FETCH_ARTICLE_ALL,
    FETCH_ARTICLE_POPULAR,
    FETCH_ARTICLE_RATINGS,
    FETCH_ARTICLE_ONE,
    SEARCH_ARTICLE
} from "../actions/articleActions"

export default (state= {articles:[],popular:[],search:[]},{type,payload}) => {

        switch(type){
            case FETCH_ARTICLE_ALL:
                return {...state,articles:payload}
            case FETCH_ARTICLE_POPULAR:
                return {...state,popular:payload}
            case FETCH_ARTICLE_RATINGS:
                return {...state,ratings:payload}
            case FETCH_ARTICLE_ONE:
                return { ...state, show:payload}
            case SEARCH_ARTICLE:
                 return {...state,search:payload}
            default:
                return state;

        }
} 