import {
    PILOT_INFO_SAVE,
    PILOT_CERTIFICATE,
    PILOT_DRIVING_LIC,
    PILOT_BOOKINGDET_SUCCESS,
    PILOT_BOOKINGDET_FAIL
} from '../actions/types';

export const pilotReducer= (state = {}, action) => {

    switch(action.type){
      
        case PILOT_INFO_SAVE:
            return{
                ...state,
                pilotdetails : action.payload,
            }
        case PILOT_CERTIFICATE:
            return{
                ...state,
                pilotcert : action.payload,
            }
            case PILOT_DRIVING_LIC:
                return{
                    ...state,
                    pilotdrivelic : action.payload,
                }   
            case PILOT_BOOKINGDET_SUCCESS:
                return {
                    ...state,
                    pilotbooking : action.payload,  
                }
            case PILOT_BOOKINGDET_FAIL:
                return {
                    ...state, 
                } 
        default:
            return state;  
    }
}
