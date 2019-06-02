//cat Actions creator
import Api from "../api"
import {addError} from "../actions/errorsActions"

export const ATTEMPT_CATEGORIES_REQUEST ="ATTEMPT_CATEGORIES_REQUEST"

export const FETCH_CATEGORIES ="FETCH_CATEGORIES";

export const fetchCategories = () => {
    
    return async dispatch => {
         Api.get("/categories?per_page=50")
        .then( resp =>
            dispatch(
                {
                    type: FETCH_CATEGORIES,
                    payload: resp.data.data.data
                }
            )
        );
    }
};

export const FETCH_CATEGORY_ARTICLES ="FETCH_CATEGORY_ARTICLES"

export const fetchArticleOF= (id_cat) => {
    return async dispatch => {
        dispatch({type:ATTEMPT_CATEGORIES_REQUEST})
        Api.get("/allarticles",
       { params:{
            category_id:id_cat
        }})
        .then(resp =>{
            dispatch({
                type:FETCH_CATEGORY_ARTICLES,
                payload:resp.data.data.data
            })
        })
        .catch(err => {
            dispatch(addError(err));
        })
    }
}