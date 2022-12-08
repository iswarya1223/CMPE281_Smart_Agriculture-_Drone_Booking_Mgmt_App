import {
    GET_DRONE_DETAILS_FAIL,
    GET_DRONE_DETAILS_SUCCESS,
    EDIT_DRONE_DETAILS_SUCCESS,
    EDIT_DRONE_DETAILS_FAIL,
    UNREGISTER_DRONE_SUCCESS,
    UNREGISTER_DRONE_FAIL,
    GET_FLEET_DRONE_SUCCESS,
    GET_FLEET_DRONE_FAIL,FLEET_DRONE_DETAIL_SUCCESS,FLEET_DRONE_DETAIL_FAIL
} from '../actions/types';

export const adminReducer= (state = {}, action) => {

    switch(action.type){
      
        case GET_DRONE_DETAILS_SUCCESS:
            return{
                ...state,
                dronedetails : action.payload,
            }
            case EDIT_DRONE_DETAILS_SUCCESS:
            return {
                ...state,

            }
        case UNREGISTER_DRONE_SUCCESS:
            return {
                ...state,
                unregisterdrones : action.payload,
            }
        case UNREGISTER_DRONE_FAIL:
            return {
                ...state,
            }
            case EDIT_DRONE_DETAILS_FAIL:
            return {
                ...state,

            }
            case GET_DRONE_DETAILS_FAIL:
                return{
                    ...state,
                } 
            case GET_FLEET_DRONE_SUCCESS:
                return {
                    ...state,
                    fleetdrones : action.payload,
                }
                case GET_FLEET_DRONE_FAIL:
                    return {
                        ...state,
                       
                    }
                case FLEET_DRONE_DETAIL_SUCCESS:
                    return{
                        ...state,
                        fleetdronedet:action.payload
                    }
                case FLEET_DRONE_DETAIL_FAIL:
                    return{
                        ...state,
                    }
                default:
                    return state;  
            }
        }