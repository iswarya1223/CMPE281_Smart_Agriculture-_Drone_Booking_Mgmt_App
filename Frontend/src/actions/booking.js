import axios from 'axios';
import { SEARCH_DRONE_FAIL,SEARCH_DRONE_SUCCESS,ASSIGN_PILOT_SUCCESS,ASSIGN_PILOT_FAIL,BOOK_DRONE_SUCCESS,BOOK_DRONE_FAIL
,USER_BOOKINGS_SUCCESS,USER_BOOKINGS_FAIL,USER_BOOKINGDET_SUCCESS,USER_BOOKINGDET_FAIL,PILOT_BOOKINGDET_SUCCESS,PILOT_BOOKINGDET_FAIL} from './types';


export const searchDrone = (servicetype='',brand='',startDate,endDate,baseprice=[0,10000]) => async dispatch =>{
  

    
    try{
        const res = await axios.get(`/api/booking/searchdrones?servicetype=${servicetype}&brand=${brand}&startdate=${startDate}&enddate=${endDate}&max_price=${baseprice[1]}&min_price=${baseprice[0]}`);
        dispatch({
            type: SEARCH_DRONE_SUCCESS,
            payload: res.data
        })
    }catch(err){
        const errors = err.response.data.errors;
        
        dispatch({
            type:  SEARCH_DRONE_FAIL
        })
    }
    }

export const assignPilot = (startdate,enddate) => async dispatch =>{
  
        
        try{
            const res = await axios.get(`/api/booking/assignpilot?startdate=${startdate}&enddate=${enddate}`);
            dispatch({
                type: ASSIGN_PILOT_SUCCESS,
                payload: res.data
            })
        }catch(err){
            const errors = err.response.data.errors;
            
            dispatch({
                type:  ASSIGN_PILOT_FAIL
            })
        }
        }

        export const saveBooking = (bookingdate,startdate,enddate,droneid,dronename,droneimage,pilotid,userid,starttime,
            endtime,plotdetails,payment,servicetype,duration,status) => async dispatch =>{
  
        const body ={bookingdate:bookingdate,startdate:startdate,enddate:enddate,dronename:dronename,droneimage:droneimage,droneid:droneid,pilotid:pilotid,userid:userid,
        starttime:starttime,endtime:endtime,plotdetails:plotdetails,payment:payment,servicetype:servicetype,serviceduration:duration,status:status}
            try{
                const res = await axios.post('/api/booking/bookdrone',body);
                dispatch({
                    type: BOOK_DRONE_SUCCESS,
                    payload: res.data
                })
            }catch(err){
                const errors = err.response.data.errors;
                
                dispatch({
                    type:  BOOK_DRONE_FAIL
                })
            }
            }
    export const getBookings = (userid) => async dispatch =>{
      
                try{
                    const res = await axios.get(`/api/booking/mybookings/${userid}`);
                    dispatch({
                        type: USER_BOOKINGS_SUCCESS,
                        payload: res.data
                    })
                }catch(err){
                    const errors = err.response.data.errors;
                    
                    dispatch({
                        type:  USER_BOOKINGS_FAIL
                    })
                }
                }
        export const getBookingdetail = (bookingid) => async dispatch =>{
      
                    try{
                        const res = await axios.get(`/api/booking/mybookingdet/${bookingid}`);
                        dispatch({
                            type: USER_BOOKINGDET_SUCCESS,
                            payload: res.data
                        })
                    }catch(err){
                        const errors = err.response.data.errors;
                        
                        dispatch({
                            type:  USER_BOOKINGDET_FAIL
                        })
                    }
                    }
    export const getPilotbooking = (pilotid) => async dispatch =>{
      
                        try{
                            const res = await axios.get(`/api/booking/getpilotbookings/${pilotid}`);
                            dispatch({
                                type: PILOT_BOOKINGDET_SUCCESS,
                                payload: res.data
                            })
                        }catch(err){
                            const errors = err.response.data.errors;
                            
                            dispatch({
                                type:  PILOT_BOOKINGDET_FAIL
                            })
                        }
                        }
    export const makePayment = (bookingid) => async dispatch =>{
      
        try{
            const res = await axios.get(`/api/booking/savepayment/${bookingid}`);
            // dispatch({
            //     type: PILOT_BOOKINGDET_SUCCESS,
            //     payload: res.data
            // })
        }catch(err){
            const errors = err.response.data.errors;
            
            // dispatch({
            //     type:  PILOT_BOOKINGDET_FAIL
            // })
        }
        }
        
    