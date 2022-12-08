import {
    SEARCH_DRONE_SUCCESS,
    SEARCH_DRONE_FAIL,
    DRONE_SELECTION,SERVICE_TIME,
    ASSIGN_PILOT_FAIL,
    ASSIGN_PILOT_SUCCESS,
    USER_BOOKINGS_SUCCESS,
    USER_BOOKINGS_FAIL,
    USER_BOOKINGDET_SUCCESS,
    USER_BOOKINGDET_FAIL
} from '../actions/types';


export const searchdroneReducer= (state = {}, action) => {

    switch(action.type){
      
        case SEARCH_DRONE_SUCCESS:
            return{
                ...state,
                searchdronedet : action.payload,
            }
        case SEARCH_DRONE_FAIL:
                return{
                    ...state,
                }
        case DRONE_SELECTION:
                    return{
                        ...state,
                        droneselect: action.payload
                    }
        case SERVICE_TIME:
            return{
                ...state,
                dronetimeselect: action.payload
            }
        case ASSIGN_PILOT_SUCCESS:
            return{
                ...state,
                pilotselect: action.payload
            }
        case ASSIGN_PILOT_FAIL:
            return{
                ...state,
                
            }
        case USER_BOOKINGS_SUCCESS:
        return{
            ...state,
            userbookings: action.payload
        }
        case USER_BOOKINGS_FAIL:
        return{
            ...state,
        }
        default:
            return state; 
    }
}

export const bookdroneReducer= (state = {}, action) => {

    switch(action.type){
        case USER_BOOKINGDET_SUCCESS:
        return{
            ...state,
            bookingdet: action.payload
        }
        case USER_BOOKINGDET_FAIL:
        return{
            ...state,
        }
        default:
            return state;  
    }
}

