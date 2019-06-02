import {combineReducers} from "redux";
import categoriesReducer from "./CategoriesReducer"
import userReducer from "./userReducer"
import errorsReducer from "./errorsReducer"
import articleReducer from "./articleReducer"
import plansReducer from "./plansReducer"
import messagesReducer from "./messagesReducer"

export default combineReducers({
    categories: categoriesReducer,
    user : userReducer,
    errors:  errorsReducer,
    articles: articleReducer,
    plans:plansReducer,
    messages:messagesReducer,
})