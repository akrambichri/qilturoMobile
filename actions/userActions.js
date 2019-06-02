// user Actions creator
import Api from "../api"
import {addError} from "./errorsActions"
import {addMsg} from "./msgsActions"
//import history from "../history"
import NavigationService from "../navigation/NavigationService"
import { SecureStore } from 'expo';

export const ATTEMPT_REQUEST_USER ="ATTEMPT_REQUEST_USER";

export const SUCCESS_LOGIN_USER ="SUCCESS_LOGIN_USER";


export const SUCCESS_REGISTER_USER ="SUCCESS_REGISTER_USER";

export const FAILED_REQUEST_USER ="FAILED_REQUEST_USER";

export const LOGOUT_USER ="LOGOUT_USER";


export const FETCH_PROFILE_USER ="FETCH_PROFILE_USER"

export const FETCH_BIBLIO_USER ="FETCH_BIBLIO_USER"
export const ADD_ARTICLE_BIBLIO_USER ="ADD_ARTICLE_BIBLIO_USER"
export const REMOVE_ARTICLE_BIBLIO_USER ="REMOVE_ARTICLE_BIBLIO_USER"
export const UPDATE_ARTICLE_BIBLIO_USER ="UPDATE_ARTICLE_BIBLIO_USER"

export const ADD_NOTE_USER="ADD_NOTE_USER"

export const loginUser = (email,password,cb) => {

    return  async dispatch => {
        dispatch(
            {
                type: ATTEMPT_REQUEST_USER,
            }
        )

        Api.post("/login",
        {
          email:email,
          password:password
        })
        .then(resp => {
            dispatch({
                type: SUCCESS_LOGIN_USER,
                payload:resp.data.token
            })
            SecureStore.setItemAsync("token", resp.data.token)
            .then(e =>{ 
                dispatch(fetchBiblio(resp.data.token))
                dispatch(fetchProfile())
                NavigationService.navigate("Main")
            }
                )
        }
        )
        .catch(err =>{
                   dispatch(addError("Erreur, logins sont Faux!"))
                    dispatch({
                        type:FAILED_REQUEST_USER,
                        
                    })
            }
            )
    }
};

export const socialLogin = (provider,access_token) => {
    return async dispatch => {
        dispatch(
            {
                type: ATTEMPT_REQUEST_USER,
            }
        )

        Api.post("callback",{
            provider,
            access_token
       })
        .then(resp => {
            dispatch({
                type: SUCCESS_LOGIN_USER,
                payload:resp.data.token
            })
            dispatch(fetchBiblio(resp.data.token))
            dispatch(fetchProfile())
            SecureStore.setItemAsync("token", resp.data.token)
        }
        )
        .catch(err =>{
                    dispatch(addError(err))
                    dispatch({
                        type:FAILED_REQUEST_USER,
                        
                    })
            }
            )
    }
   

}
export const registerUser = (email,password,name,code=undefined) => {

    return  dispatch => {

        dispatch(
            {
                type: ATTEMPT_REQUEST_USER,
            }
        )
        let params = {
            email:email,
            password:password,
            password_confirmation:password,
            name:name
          }
        if(code)
         {
          params = {...params,code}
         }
        Api.post("/register",
            params
        ).then(resp =>
           { 
                dispatch({
                    type: SUCCESS_REGISTER_USER,
                    payload: resp.data.token, 
                })
                SecureStore.setItemAsync("token", resp.data.token)
                NavigationService.navigate("Main")
             }
        ).catch(err =>{
            dispatch(addError(err))
            dispatch({
                type:FAILED_REQUEST_USER,
                
            })

    
    }
    )
        
    }
};

export const logoutUser = () => {
   SecureStore.deleteItemAsync("token")
    console.log("login out...",SecureStore.getItemAsync("token"))   
    NavigationService.navigate('Auth',{user:"xx"})
    return {
       type: LOGOUT_USER,
    }
}


export const fetchProfile = () =>{

return async dispatch => {
   let  token =  await SecureStore.getItemAsync("token")
    dispatch({
        type:ATTEMPT_REQUEST_USER
    })
    Api.defaults.headers.common['Authorization'] = "bearer " + token;
    Api.get("/profile")
        .then(resp => {
            dispatch({
                type:FETCH_PROFILE_USER,
                payload:resp.data.data
            })
        })
        .catch( err =>
            {
                dispatch(addError(err))  
                dispatch({type:FAILED_REQUEST_USER,}) 
            }
        )
}

}

export const fetchBiblio = () => {
    return async dispatch => {
       let token = await SecureStore.getItemAsync("token")
        dispatch({
           type: ATTEMPT_REQUEST_USER
        })
        Api.defaults.headers.common['Authorization'] = "bearer " + token;
       await Api.get("/users/biblios")
        .then( resp => {
           
            if(resp.status === 205) //biblio vide
            dispatch({
                type: FETCH_BIBLIO_USER,
                payload: []
             })
             else
            dispatch({
                type: FETCH_BIBLIO_USER,
                payload: resp.data.data.data
             })
        })
        .catch(err =>{
            dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER,})
        })
    }
}

export const addArticleBiblio = (id) => {
    
        
    return async dispatch => {
        let token = await SecureStore.getItemAsync("token")
        dispatch({
           type: ATTEMPT_REQUEST_USER
        })
        Api.defaults.headers.common['Authorization'] = "bearer " + token;
        Api.post("/users/biblios",{
            article_id:id
        })
        .then( resp => {
            console.log(resp.data)
            dispatch({
                type: ADD_ARTICLE_BIBLIO_USER,
                payload: resp.data
             })
        })
        .catch(err =>{
            dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER,})
        })
    }
}

export const removeArticleBiblio = ( id) => {
    return async dispatch => {
        let token = await SecureStore.getItemAsync("token")
    dispatch({
        type: ATTEMPT_REQUEST_USER
    })
    Api.defaults.headers.common['Authorization'] = "bearer " + token;
    Api.delete("/users/biblios/1",{params:{token,article_id:id}})
    .then( resp => {
        dispatch({
            type: REMOVE_ARTICLE_BIBLIO_USER,
            payload: id
            })
    })
    .catch(err =>{
        dispatch(addError(err))
        dispatch({type:FAILED_REQUEST_USER,})
    })
}

}

export const SUBSCRIPTION_SUCCESS ="SUBSCRIPTION_SUCCESS"

export const subscribe = (planID,stripeToken,token=SecureStore.getItemAsync("token")) => {

    return dispatch => {
        dispatch({
            type:ATTEMPT_REQUEST_USER
        })
        Api.post("/subscription",{
            stripeToken:stripeToken,
            token:token,
            plan_id:planID
        }).then( resp => {
            console.log(resp)
            dispatch({
                type:SUBSCRIPTION_SUCCESS,
                payload:planID
            })
            //history.push("/sucess_subscription")
            
        }).catch( err => {
            console.log(err.response)
            dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER,})
            //history.push("/failure_subscription")
        })
    }
}

export const CHOOSE_SUSBSC_PLAN ="CHOOSE_SUSBSC_PLAN"

export const subsPlan = id =>{

    return {
        type : CHOOSE_SUSBSC_PLAN,
        payload:id
    }
}

export const CANCEL_SUBS_USER ="CANCEL_SUBS_USER"

export const cancelSubs = () => {
    return async dispatch => {
        await Api.get("users/cancel",{
            token:SecureStore.getItemAsync("token")
        }).then(resp => {
            console.log(resp)
            dispatch({type:CANCEL_SUBS_USER})
            dispatch(addError({data:"Subscription Cancelled Successfully"}))
        }).catch(err => {
            dispatch(addError(err))
        })
    }
}
export const RESUME_SUBS_USER ="RESUME_SUBS_USER"

export const resumeSubs = () => {
    return async dispatch => {
        await Api.get("users/resume",{
            token:SecureStore.getItemAsync("token")
        }).then(resp => {
            dispatch({type:RESUME_SUBS_USER})
            dispatch(addError({data:"Subscription Resumed Successfully"}))
        }).catch(err => {
            dispatch(addError(err))
        })
    }
}

export const SUCCESS_READ_BOOK ="SUCCESS_READ_BOOK"
export const FAILED_READ_BOOK ="FAILED_READ_BOOK"

// AKA GET CURRENT PAGE
export const readBook = (article_id) => { 
        return async dispatch => {
        const token =  await SecureStore.getItemAsync("token")

            dispatch({type:ATTEMPT_REQUEST_USER})
           await Api.post("texts/currentpage/"+article_id,{
            
                token:token
            }).then(resp => {
                dispatch({
                    type:SUCCESS_READ_BOOK,
                    payload:resp.data.data
                })
            }).catch(err => {
                dispatch(addError(err))
                dispatch({type:FAILED_REQUEST_USER})
            })

        }
}

export const SUCCESS_GETNEXT_PAGE ="SUCCESS_GETNEXT_PAGE"
export const FAILED_GETNEXT_PAGE  ="FAILED_GETNEXT_PAGE"

export const getNextPage = (article_id,token=SecureStore.getItemAsync("token")) => {

        return async dispatch => {
            dispatch({type:ATTEMPT_REQUEST_USER})

            await Api.post("texts/nextpage/"+
                article_id
            )
            .then(resp => {
                dispatch({
                    type:SUCCESS_GETNEXT_PAGE,
                    payload:resp.data.data
                })
            })
            .catch(err =>{
                dispatch(addError(err))
                dispatch({type:FAILED_GETNEXT_PAGE})
            })
        }
}

export const SUCCESS_GETPREVIOUS_PAGE = "SUCCESS_GETPREVIOUS_PAGE"
export const getPreviousPage = (article_id,token = SecureStore.getItemAsync("token")) => {

    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
        
        await Api.post("texts/previouspage/"+article_id,
        {
            
            token
        })
        .then(resp => {
            dispatch({
                type:SUCCESS_GETPREVIOUS_PAGE,
                payload:resp.data.data
            })
        })
        .catch(err => {
            dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})
        })
    }
}

export const GET_AUDIO = "GET_AUDIO"
export const getAudio = (article_id,token = SecureStore.getItemAsync("token")) => {

    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
    
        await Api.post("articles/getaudio/"+article_id,
        {
            
            token
        })
        .then(resp => {
            dispatch({
                type:GET_AUDIO,
                payload:resp.data.data
            })
        })
        .catch(err => {
            dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})
        })
    }
}
export const GET_VIDEO = "GET_VIDEO"
export const getVideo = (article_id,token = SecureStore.getItemAsync("token")) => {

    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
    
        await Api.post("articles/getvideo/"+article_id,
        {
            
            token
        })
        .then(resp => {
            dispatch({
                type:GET_VIDEO,
                payload:resp.data.data
            })
        })
        .catch(err => {
            dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})
        })
    }
}

export const CLEAR_READING_USER ="CLEAR_READING_USER"

export const clearReading = () => {
        return {
            type:CLEAR_READING_USER
        }
}

export const addNote = (text_id,note_content,token=SecureStore.getItemAsync("token")) =>{

    return async dispatch => {
        
      await Api.post("users/notes",{
            token,
            text_id,
            note_content:note_content.toString()
        }).then(resp => {
            dispatch({
                type:ADD_NOTE_USER,
                payload:resp.data
            })
        }).catch(err => {dispatch(addError(err))
        dispatch({type:FAILED_REQUEST_USER})})
    }
}

export const FETCH_NOTES_USER ="FETCH_NOTES_USER"
export const fetchNotes =(token =SecureStore.getItemAsync("token")) => {
    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
        Api.defaults.headers.common['Authorization'] = "bearer " + token;
        await Api.get("users/notes")
        .then(resp => {
            dispatch({
                type:FETCH_NOTES_USER,
                payload:resp.data.data
            })
        }).catch(err => {dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})})
    }
}

export const DELETE_NOTE_USER ="DELETE_NOTE_USER"

export const deleteNote = (text_id, note_id, token =SecureStore.getItemAsync("token")) =>{
    console.log(text_id + " " + note_id)
    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
        Api.defaults.headers.common['Authorization'] = "bearer " + token;
        await Api.delete("users/notes",{
            params:{text_id,
            note_id}
        })
        .then(resp => {
            dispatch({
                type:DELETE_NOTE_USER,
                payload:note_id
            })
        }).catch(err => {dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})})
    }
}

export const VERIFY_EMAIL_USER ="VERIFY_EMAIL_USER"

export const verifyEmail = (email_token) => {

    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
        await Api.get("users/verify",
        {
            params:{token:email_token}
        })
        .then(resp => {
            dispatch({
                type:VERIFY_EMAIL_USER,
            })
             dispatch(addError({data:"email Verified successfully"}))
        }).catch(err => {dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})})
    }
}

export const CHANGE_EMAIL_USER ="CHANGE_EMAIL_USER"

export const changeEmail= (email,token=SecureStore.getItemAsync("token"),oldpassword="") => {

    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
        await Api.put("/users/profile",
        {
            email,
            token,
            oldpassword,
            password_validation:oldpassword
        })
        .then(resp => {
            dispatch({
                type:CHANGE_EMAIL_USER,
                payload:resp.data.email
            })
            dispatch(addError({data:"Email changed successfully"}))
        }).catch(err => {dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})})
    }
}
export const CHANGE_PASSWORD_USER="CHANGE_PASSWORD_USER"

export const changePass= (token=SecureStore.getItemAsync("token"),oldpassword,password,password_confirmation) => {

    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
        await Api.put("/users/profile",
        {
            token,
            oldpassword,
            password,
            password_confirmation,
        })
        .then(resp => {
            dispatch({
                type:CHANGE_PASSWORD_USER,
            })
            dispatch(addError({data:"password changed successfully"}))
        }).catch(err => {dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})})
    }
}


export const DEMADNE_PASSWORD_RESET_USER ="DEMADNE_PASSWORD_RESET_USER"

export const demandeResetPass= (email) => {

    return async dispatch => {
        dispatch({type:ATTEMPT_REQUEST_USER})
        await Api.post("passwordreset/create",
        {
            email
        }
        )
        .then(resp => {
            dispatch({
                type:DEMADNE_PASSWORD_RESET_USER,
            })
            dispatch(addError({data:"un email vous a ete envoye!"}))
        }).catch(err => {dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})})
    }
}


export const RESET_PASSWORD_USER ="RESET_PASSWORD_USER"
export const resetPass= (token,password) => {

    return async dispatch => {
       // dispatch({type:ATTEMPT_REQUEST_USER})
        await Api.post("passwordreset/reset",
        {
            token,
            password,
            password_confirmation:password
        }
        )
        .then(resp => {
            dispatch({
                type:RESET_PASSWORD_USER,
            })
            dispatch(addError({data:"Changement Mot de pass avec succes!"}))
           // setTimeout(()=>history.push("/login"),1000)
        }).catch(err => {dispatch(addError(err))
            dispatch({type:FAILED_REQUEST_USER})})
    }
}

export const FINISH_READING_USER ="FINISH_READING_USER"

export const finishReading = ( article_id) => {
    let token = SecureStore.getItemAsync("token")
    return async dispatch => {
        await Api.get("users/biblios/finish/"+article_id,
        {
           params:{ token,
            }
        }
        )
        .then(resp => {
            dispatch({
                type:FINISH_READING_USER,
            })
            
        }).catch(err => dispatch(addError(err)))

        }
}

export const RATE_ARTICLE_USER ="RATE_ARTICLE_USER"
export const rateArticle =(article_id,scoreF,scoreR,scoreA) => {
   let token= SecureStore.getItemAsync("token")
    return async dispatch => {
        Api.defaults.headers.common['Authorization'] = "bearer " + token;
        await Api.post("/ratings",
        {
            article_id,
            scoreF,
            scoreR,
            scoreA
        }
        )
        .then(resp => {
            dispatch({
                type:RATE_ARTICLE_USER,
            })
            
        }).catch(err => dispatch(addError(err)))

        }
}

export const FETCH_BADGES_USER ="FETCH_BADGES_USER"

export const fetchBadges = () => {

    let token= SecureStore.getItemAsync("token")
    return async dispatch => {
        await Api.get("/users/badges",
        {
           token
        }
        )
        .then(resp => {
            dispatch({
                type:FETCH_BADGES_USER,
                payload:resp.data.data
            })
            
        }).catch(err => dispatch(addError(err)))

        }
}

export const FETCH_INVOICES_USER ="FETCH_INVOICES_USER"

export const fetchInvoices = () => {

    let token= SecureStore.getItemAsync("token")
    return async dispatch => {
        await Api.get("/users/invoices",
        {
           token
        }
        )
        .then(resp => {
            dispatch({
                type:FETCH_INVOICES_USER,
                payload:resp.data.data
            })
            
        }).catch(err => dispatch(addError(err)))

        }
}

export const EDIT_CREDITCARD_USER ="EDIT_CREDITCARD_USER"

export const editCreaditCard = (stripeToken,token=SecureStore.getItemAsync("token") ) => {

    return async dispatch => {
        await Api.post("users/updatecard",
        {
           token,
           stripeToken:stripeToken.id,
        }
        )
        .then(resp => {
            
            dispatch({
                type:EDIT_CREDITCARD_USER,
                payload:{...stripeToken.card}
            })
            dispatch(addError({data:"card Changed Successfully."}))
        }).catch(err => dispatch(addError(err)))

        }
}

export const FETCH_ALL_EVENTS ="FETCH_ALL_EVENTS"

export const fetchEvents = (token=SecureStore.getItemAsync("token")) => {

    return async dispatch => {
        await Api.get("/events",
        {
           token,
        }
        )
        .then(resp => {
            dispatch({
                type:FETCH_ALL_EVENTS,
                payload:resp.data.data
            })
        }).catch(err => dispatch(addError(err)))

        }
}

export const PARTICIPATE_EVENT_USER ="PARTICIPATE_EVENT_USER"

export const participatEvent = (event_id,token=SecureStore.getItemAsync("token") ) => {
    return async dispatch => {
        await Api.get("/users/participate",
        {
           params:{token,
           event_id}
        }
        )
        .then(resp => {
            dispatch({
                type:PARTICIPATE_EVENT_USER,
                payload:resp.data
            })
            dispatch(addMsg("Participation avec succes"))
           
        }).catch(err => dispatch(addError(err)))

    }
}
export const UNPARTICIPATE_EVENT_USER ="UNPARTICIPATE_EVENT_USER"

export const unparticipatEvent = (event_id,token=SecureStore.getItemAsync("token") ) => {
   
    return async dispatch => {
        await Api.get("users/unparticipate",
        {
           params:{
           token,
           event_id}
        }
        )
        .then(resp => {
            dispatch({
                type:UNPARTICIPATE_EVENT_USER,
                payload:resp.data
            })
            dispatch(addMsg("Participation retirer avc succes"))
        }).catch(err => {
            
            dispatch(addError(err))
        })

    }
}

export const FETCH_PARTICIPATING_EVENTS_USER ="FETCH_PARTICIPATING_EVENTS_USER"


export const fetchParticipatEvent = (token=SecureStore.getItemAsync("token") ) => {
    return async dispatch => {
        await Api.get("users/participating",
        {
           token,
        }
        )
        .then(resp => {
            console.log(resp)
            dispatch({
                type:FETCH_PARTICIPATING_EVENTS_USER,
                payload:resp.data.data
            })
        }).catch(err => dispatch(addError(err)))

        }
}

export const CHECK_REFF_TOKEN_USER ="CHECK_REFF_TOKEN_USER"

export const checkReff = refToken => {
    return async dispatch => {
        await Api.get("checkref",{
            params:{
                token:refToken
            }
        }).then(resp => 
                dispatch({type:CHECK_REFF_TOKEN_USER})
            )
           .catch(err => dispatch(addError(err))) 
    }
} 

export const FETCH_LEVELS_USER ="FETCH_LEVELS_USER"

export const fetchLevels = (token=SecureStore.getItemAsync("token")) => {

    return async dispatch => {
        await Api.get("/levels",{
            token
        }).then(resp => 
                dispatch({type:FETCH_LEVELS_USER, payload:resp.data.data.data})
            )
           .catch(err => dispatch(addError(err))) 
    }
}

export const CREATE_EVENT_USER ="CREATE_EVENT_USER"

export const createEvent = (event,token = SecureStore.getItemAsync("token")) => {

    const {e} = event;
    return async dispatch => {
        await Api.post("/events",
        {
            token,
          // {event}
        }
        )
        .then(resp =>
                dispatch({type:CREATE_EVENT_USER})    
        )
        .catch(err => 
            dispatch(addError(err))
        )
    }
}


export const SET_READ_DURATION ="SET_READ_DURATION"

export const setReadDuration = (duration, article_id, token = SecureStore.getItemAsync("token")) => {
    return async dispatch => {
        await Api.get("users/history/duration",
        {
            params:{
                duration,
                article_id,
                token,
            }
        })
    }
} 

export const EXPORT_KINDLE_EMAIL ="EXPORT_KINDLE_EMAIL"

export const exportKindle = (article_id, token = SecureStore.getItemAsync("token")) => {
    return async dispatch => {
        await Api.get("article/sendkindle/"+article_id,
        {
            params:{
                token,
            }
        }).then(resp => {
            dispatch({type:EXPORT_KINDLE_EMAIL,})
            dispatch(addError("Envoi avec Succes !"))
        })
    }
} 


export const SET_KINDLE_EMAIL ="SET_KINDLE_EMAIL"

export const setKindle = (kindle_email, token = SecureStore.getItemAsync("token")) => {
    return async dispatch => {
        await Api.post("users/profile",
        {
        
                token,
                kindle_email
            
        }).then(resp => {
            dispatch({type:SET_KINDLE_EMAIL,payload:kindle_email})
            dispatch(addMsg("Kindle email changer avec succes"))
        })
    }
} 

export const SET_EVERNOTE_EMAIL ="SET_EVERNOTE_EMAIL"

export const setEverNote = (evernote_email, token = SecureStore.getItemAsync("token")) => {
    return async dispatch => {
        await Api.post("users/profile",
        {
        
                token,
                evernote_email
            
        }).then(resp => {
            dispatch({type:SET_EVERNOTE_EMAIL,payload:evernote_email})
            dispatch(addMsg("evernote email changer avec succes"))
        })
        .catch(err => dispatch(addError("set email evernote faileed")))
    }
} 