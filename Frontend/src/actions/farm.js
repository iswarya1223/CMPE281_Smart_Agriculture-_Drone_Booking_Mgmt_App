import axios from 'axios';
//import { setAlert } from './alert';
import{
    FARM_REGISTER_SUCCESS,
    FARM_REGISTER_FAIL,
    GET_FARM_SUCCESS,
    GET_FARM_FAIL,
    FARMER_BILLING_SUCCESS,
    FARMER_BILLING_FAIL,
    GET_PLOTS_SUCCESS,
    GET_PLOTS_FAIL,
} from './types';

export const farmregister = (userid,farmname, farmaddress,farmcountry,farmcity, farmzipcode) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({userid:userid,farmname:farmname, 
        farmaddress:farmaddress,farmcountry:farmcountry,farmcity:farmcity, farmzipcode:farmzipcode});
    
    try{
        const res = await axios.post('/api/users/addfarmprofile',body,config);
        dispatch({
            type: FARM_REGISTER_SUCCESS,
            payload: res.data.result
        })
    }catch(err){
        const errors = err.response.data.errors;
        
        dispatch({
            type: FARM_REGISTER_FAIL
        })
    }
    }

    export const getfarmdetails = (userid) => async dispatch =>{
        
        try{
            const res = await axios.get(`/api/users/getfarmprofile/?userid=${userid}`);
            console.log(res)
            dispatch({
                type: GET_FARM_SUCCESS,
                payload: res.data[0]
            })
        }catch(err){
            const errors = err.response.data.errors;
            
            dispatch({
                type: GET_FARM_FAIL
            })
        }
        }
export const plotinfo = (userid,farmid, plotname,plot_type,plotimage, boundaries) => async dispatch =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({userid:userid,farmid:farmid, 
            plotname:plotname,plot_type:plot_type,plotimage:plotimage, boundaries:boundaries});
        
        try{
            const res = await axios.post('/api/users/addplotinfo',body,config);
            console.log(res)
        }catch(err){
            const errors = err.response.data.errors;
        }
        }

export const Farmverification = (userid,landownername,certificateid,certissuedate,totalarea,certimage,
    farmerdrivelicid,farmerdrivelicname,farmerdrivelicimg,farmutilitydtissue,farmutilitybillimg,farmagreementid) => async dispatch =>{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
           const body = JSON.stringify({userid:userid,landownername:landownername,certificateid:certificateid,certissuedate:certissuedate,totalarea:totalarea,certimage:certimage,
            farmerdrivelicid:farmerdrivelicid,farmerdrivelicname:farmerdrivelicname,farmerdrivelicimg:farmerdrivelicimg,farmutilitydtissue:farmutilitydtissue,farmutilitybillimg:farmutilitybillimg,farmagreementid:farmagreementid});
            
            try{
                const res = await axios.post('/api/users/farmverification',body,config);
                dispatch({
                    type: GET_FARM_SUCCESS,
                    payload: res.data[0]
                })
            }catch(err){
                const errors = err.response.data.errors;
                dispatch({
                    type: GET_FARM_FAIL
                })
            }
            }

export const addbilling = (userid,billinginfo) => async dispatch =>{
        const config = {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
        const body = JSON.stringify({userid:userid,billinginfo:billinginfo});
                        
        try{
            const res = await axios.post('/api/users/addbillinginfo',body,config);
                dispatch({
                    type: FARMER_BILLING_SUCCESS,
                    })
            }catch(err){
            const errors = err.response.data.errors;
                dispatch({
                    type: FARMER_BILLING_FAIL
                    })
                }
            }
export const getplots = (userid) => async dispatch =>{
                try{
                    const res = await axios.get(`/api/booking/myplots?userid=${userid}`);
                    console.log(res)
                        dispatch({
                            type: GET_PLOTS_SUCCESS,
                            payload: res.data
                            })
                    }catch(err){
                    const errors = err.response.data.errors;
                        dispatch({
                            type: GET_PLOTS_FAIL
                            })
                        }
                    }