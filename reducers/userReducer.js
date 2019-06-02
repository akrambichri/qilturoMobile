import {
    SUCCESS_LOGIN_USER,
    ATTEMPT_REQUEST_USER,
    SUCCESS_REGISTER_USER,
    LOGOUT_USER,
    ADD_ARTICLE_BIBLIO_USER,
    FETCH_PROFILE_USER,
    FETCH_BIBLIO_USER,
    FAILED_REQUEST_USER,
    REMOVE_ARTICLE_BIBLIO_USER,
    SUBSCRIPTION_SUCCESS,
    SUCCESS_READ_BOOK,
    SUCCESS_GETNEXT_PAGE,
    SUCCESS_GETPREVIOUS_PAGE,
    CLEAR_READING_USER,
    CHOOSE_SUSBSC_PLAN,
    FETCH_NOTES_USER,
    ADD_NOTE_USER,
    DELETE_NOTE_USER,
    VERIFY_EMAIL_USER,
    CHANGE_EMAIL_USER,
    CHANGE_PASSWORD_USER,
    PASSWORD_RESET_USER,
    CANCEL_SUBS_USER,
    RESUME_SUBS_USER,
    FETCH_BADGES_USER,
    FETCH_INVOICES_USER,
    EDIT_CREDITCARD_USER,
    FETCH_ALL_EVENTS,
    FETCH_PARTICIPATING_EVENTS_USER,
    PARTICIPATE_EVENT_USER,
    FETCH_LEVELS_USER,
    UNPARTICIPATE_EVENT_USER,
    SET_KINDLE_EMAIL,
    SET_EVERNOTE_EMAIL

} from "../actions/userActions"
import { SecureStore } from 'expo';
const USER_INIT={
    token:SecureStore.getItemAsync("token") || "",
    biblio:[],
    profile:undefined,
    notes:[],
}
export default (state = USER_INIT , {type,payload}) => {
    switch(type){
        case ATTEMPT_REQUEST_USER :
            return {...state,loading:true};

        case SUCCESS_LOGIN_USER : 
            return {...state,loading:false,token:payload };

        case SUCCESS_REGISTER_USER : 
            return {...USER_INIT,loading:false, token:payload };
       
        case LOGOUT_USER :
            return {...state,token:""};

        case  FETCH_PROFILE_USER:
            return {...state,profile:payload,loading:false}

        case  FETCH_BIBLIO_USER:
            return {...state,biblio:[...payload],loading:false}
        case ADD_ARTICLE_BIBLIO_USER:
            return {...state,biblio:[...state.biblio, payload]}

        case REMOVE_ARTICLE_BIBLIO_USER :
            return {...state,biblio:state.biblio.filter(book => book.id !== payload)}
        case FAILED_REQUEST_USER:
            return {...state,loading:false}
        case SUBSCRIPTION_SUCCESS :
            return {...state,subscription:payload,loading:false}
        case SUCCESS_READ_BOOK:
            return {...state,reading:payload,loading:false}
        case SUCCESS_GETNEXT_PAGE:
            return {...state,reading:payload,loading:false}
        case SUCCESS_GETPREVIOUS_PAGE:
            return {...state,reading:payload, loading:false}
        case CLEAR_READING_USER:
            return {...state,reading:undefined}
        case CHOOSE_SUSBSC_PLAN :
        return {...state,plan:payload}
        case ADD_NOTE_USER:
            return {...state,loading:false}
        case FETCH_NOTES_USER:
            return {...state,notes:payload,loading:false}
        case DELETE_NOTE_USER:
            return {...state,notes:state.notes.filter(note => note.note_info.id !== payload),loading:false}
        case VERIFY_EMAIL_USER:
            return {...state, profile:{...state.profile,email_verified_at:new Date()},loading:false}
        case CHANGE_EMAIL_USER:
            return {...state,profile:{...state.profile,email:payload,loading:false}}
        case CHANGE_PASSWORD_USER:
            return {...state,loading:false}
        case CANCEL_SUBS_USER:
            return {...state,profile:{...state.profile,cancel:true},loading:false}
        case RESUME_SUBS_USER:
            return {...state,profile:{...state.profile,cancel:false},loading:false}
        case FETCH_BADGES_USER:
            return {...state,badges:payload}
        case FETCH_INVOICES_USER:
            return {...state,invoices:payload}
        case EDIT_CREDITCARD_USER :
            return {...state,profile:{...state.profile,card_last_four:payload.last4,card_brand:payload.brand}}
        case FETCH_ALL_EVENTS:
             return {...state, events:payload}
        case FETCH_PARTICIPATING_EVENTS_USER:
             return {...state,events_participating:payload}
        case PARTICIPATE_EVENT_USER:
            return {...state,events_participating:{...state.events_participating,data:[...state.events_participating.data,payload]}}
        case UNPARTICIPATE_EVENT_USER:
            return {...state,events_participating:{...state.events_participating,data:[...state.events_participating.data.filter(ev => ev.id !== payload.id)]}}
        case FETCH_LEVELS_USER:
            return {...state,levels:payload}
        case  SET_KINDLE_EMAIL:
            return {...state,profile:{...state.profile,kindle_email:payload}}
        case  SET_EVERNOTE_EMAIL:
                return {...state,profile:{...state.profile,evernote_email:payload}}
        default :
         return state;
    }
} 