export const ADD_MSG ="ADD_MSG";
export const REMOVE_MSG ="REMOVE_MSG";
export const CLEAR_MSGS ="CLEAR_MSGS";




export const addMsg = msg => {
    return (dispatch) =>{

        dispatch ({
            type:ADD_MSG,
            payload:msg
        })
    }
}



export const removeMsg = index => {

    return {
        type:REMOVE_MSG,
        payload:index
    }
}
export const clearError = () => {

    return {
        type:CLEAR_MSGS,
    }
}