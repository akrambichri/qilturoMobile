import {logoutUser} from "./userActions";

export const ADD_ERROR ="ADD_ERROR";
export const REMOVE_ERROR ="REMOVE_ERROR";
export const CLEAR_ERROR ="CLEAR_ERROR";



export const addError = error => {
    return (dispatch,getState) =>{
        const errors = getState().errors
    if(error.response)
    {    if(error.response.status === 401)
        {  
            dispatch(logoutUser())
        }
        if(error.response.status === 403)
        {  
            //history.goBack();
        }
        if(errors.filter(err => err.data == error.response.data.data).length<1)
            dispatch ({
                type:ADD_ERROR,
                payload:error.response.data
            })
    }
    else{
        dispatch ({
            type:ADD_ERROR,
            payload:error
        })
    }}
}


export const removeError = index => {

    return {
        type:REMOVE_ERROR,
        payload:index
    }
}
export const clearError = () => {

    return {
        type:CLEAR_ERROR,
        payload: []
    }
}