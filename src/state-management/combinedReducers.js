import { combineReducers } from "redux";
import CartReducer from "./reducers/cart";
import CurrencyReducer from "./reducers/currency";

export default combineReducers({
    currency : CurrencyReducer,
    cart : CartReducer

})