//book Actions creator
import Api from "../api"
import {addError} from "./errorsActions"
import { stringify } from 'query-string'

export const FETCH_ARTICLE_ATTEMPT = "FETCH_ARTICLE_ATTEMPT"
export const FETCH_ARTICLE_ALL = "FETCH_ARTICLE_ALL"
export const FETCH_ARTICLE_OFCAT = "FETCH_ALL_OF_CAT"
export const FETCH_ARTICLE_ONE = "FETCH_ARTICLE_ONE"
export const FETCH_ARTICLE_POPULAR ="FETCH_ARTICLE_POPULAR"

export const fetchAll = (page=1,per_page=49) => {

    return async dispatch => {
        let query = {
            page,
            per_page
        }
        Api.get("/allarticles?"+stringify(query))
        .then( resp =>
            {dispatch(
                {
                    type: FETCH_ARTICLE_ALL,
                    payload: resp.data.data
                }
                )
           
        }
        ).catch(err =>{
            dispatch(addError(err))
        })
    }
}

export const fetchOne = (id) => {

    return async dispatch => {
        Api.get("/articles/show/"+id )
        .then( resp =>
            {dispatch(
                {
                    type: FETCH_ARTICLE_ONE,
                    payload: resp.data.data
                }
            )
            
        }
        ).catch(err =>{
            dispatch(addError(err))
        })
    }
}

export const fetchPopular = () => {
    return async dispatch => {
        
        Api.get("/articles/mostread")
        .then( resp =>
            {
               
                dispatch(
                {
                    type: FETCH_ARTICLE_POPULAR,
                    payload: resp.data.data
                }
                )
            
        }
        ).catch(err =>{
            dispatch(addError(err))
        })
    }
}
export const FETCH_ARTICLE_RATINGS ="FETCH_ARTICLE_RATINGS"

export const fetchRatings = article_id => {
    return async dispatch => {
        
        Api.get("/articles/show/"+article_id)
        .then( resp =>
            {
                dispatch(
                {
                    type: FETCH_ARTICLE_RATINGS,
                    payload: resp.data.data[0].users
                }
                )
            
        }
        ).catch(err =>{
            dispatch(addError(err))
        })
    }

}

export const SEARCH_ARTICLE = "SEARCH_ARTICLE"

export const search = cle => {
    return async dispatch => {
        let query = {
            page:1,
            per_page:50,
            book_name:`${cle}%`
        }
        Api.get("/allarticles?"+stringify(query))
        .then( resp =>
            {dispatch(
                {
                    type: SEARCH_ARTICLE,
                    payload: resp.data.data.data
                }
                )
           
        }
        ).catch(err =>{
            dispatch(addError(err))
        })
    }
}

