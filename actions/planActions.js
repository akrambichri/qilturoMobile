import Api from "../api"
import {addError} from "../actions/errorsActions"

export const FETCH_ALL_PLANS = "FETCH_ALL_PLANS"
export const ATEEMPT_ACTION_pLANS ="ATEEMPT_ACTION_pLANS"

export const fetchallPlans = () => {
    return dispatch => {
        dispatch({
            type:ATEEMPT_ACTION_pLANS,
        })
        Api.get("/plans")
           .then(resp => {
               console.log(resp.data.data)
               dispatch({
                   type:FETCH_ALL_PLANS,
                   payload:resp.data.data.data
                })
           }).catch( err => {
               console.log(err)
                dispatch(addError(err))            
           }
           )

    }
}