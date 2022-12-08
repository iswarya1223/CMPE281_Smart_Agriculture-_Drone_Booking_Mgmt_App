import { createStore,combineReducers, applyMiddleware } from "redux";
import { configureStore,} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
 authReducer
} from "./reducers/auth";
import {farmReducer,farmplotReducer}  from "./reducers/farmred"
import {pilotReducer} from "./reducers/pilotred"
import {adminReducer} from "./reducers/adminred"
import {searchdroneReducer,bookdroneReducer} from "./reducers/bookingred"


const reducer = combineReducers({
  auth: authReducer,
  farm: farmReducer,
  plotsave: farmplotReducer,
  pilotsave: pilotReducer,
  dronedet: adminReducer,
  searchdrone:searchdroneReducer,
  dtdrone: bookdroneReducer
});

let initialState = {
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;