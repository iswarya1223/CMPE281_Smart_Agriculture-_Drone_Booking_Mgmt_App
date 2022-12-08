import {
    FARM_REGISTER_SUCCESS,
    FARM_REGISTER_FAIL,
    FARM_PLOT_INFO1,
    FARM_CERTIFICATE,
    FARMER_DRIVING_LIC,
    GET_FARM_SUCCESS,
    GET_FARM_FAIL,
    FARMER_BILLING_SUCCESS,
    FARMER_BILLING_FAIL,
    GET_PLOTS_FAIL,
    GET_PLOTS_SUCCESS,
    PLOT_SELECT,
} from '../actions/types';


export const farmReducer= (state = {}, action) => {

    switch(action.type){
      
        case FARM_REGISTER_SUCCESS:
            return{
                ...state,
                farmdetails : action.payload,
            }
            case GET_FARM_SUCCESS:
                return{
                    ...state,
                    farmdetails : action.payload,
                } 
        case FARM_REGISTER_FAIL:
            return {
                ...state,
success: false

            }
            case GET_PLOTS_SUCCESS:
                return{
                    ...state,
                    plotdetails : action.payload,
                }
                case GET_PLOTS_FAIL:
                    return {
                    ...state,  
                    }
            case FARMER_BILLING_SUCCESS:
                return {
                    ...state,
    billing_success: true
                }
                case FARMER_BILLING_FAIL:
                    return {
                        ...state,
        billing_success: false
                    }
            case GET_FARM_FAIL:
            return {
                ...state,
success: false
            }
        default:
            return state;  
    }
}

export const farmplotReducer= (state = {}, action) => {

    switch(action.type){
      
        case FARM_PLOT_INFO1:
            return{
                ...state,
                plotdet1 : action.payload,
            }
        case FARM_CERTIFICATE:
            return{
                ...state,
                plotcerti : action.payload,
            }
        case FARMER_DRIVING_LIC:
            return {
                ...state,
                farmdrivelic : action.payload,
            }
        case PLOT_SELECT:
            return {
                ...state,
                plotselect : action.payload,
            }
        default:
            return state;  
    }
}
