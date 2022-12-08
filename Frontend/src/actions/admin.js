import axios from 'axios';
import { DRONE_REGISTER_FAIL,DRONE_REGISTER_SUCCESS,GET_DRONE_DETAILS_FAIL,GET_DRONE_DETAILS_SUCCESS,
    EDIT_DRONE_DETAILS_SUCCESS,EDIT_DRONE_DETAILS_FAIL,UNREGISTER_DRONE_SUCCESS,
    UNREGISTER_DRONE_FAIL,REGISTER_DRONE_SUCCESS,REGISTER_DRONE_FAIL,DEREGISTER_DRONE_SUCCESS,
    GET_FLEET_DRONE_SUCCESS,GET_FLEET_DRONE_FAIL,DEREGISTER_DRONE_FAIL,FLEET_DRONE_DETAIL_SUCCESS,FLEET_DRONE_DETAIL_FAIL } from './types';

export const createDrone = (dronename,baseprice,brand,flightspeed,weight,image,camera,servicetype) => async dispatch =>{
  

    const body = {dronename:dronename,baseprice:baseprice,brand:brand,flightspeed:flightspeed,
        weight:weight,image:image,camera:camera,servicetype:servicetype};
    
    try{
        const res = await axios.post('/api/admin/adddrone',body);

        if(res.status===400){
            alert("DRONE ALREADY EXISTS");
        }
        else{
            alert("DRONE REGISTRATION SUCCESSFUL")
        }
        dispatch({
            type: DRONE_REGISTER_SUCCESS,
            payload: res.data.userInfo
        })
    }catch(err){
        const errors = err.response.data.errors;
        
        dispatch({
            type:  DRONE_REGISTER_FAIL
        })
    }
    }

    export const getDrones = () => async dispatch =>{
  
        
        try{
            const res = await axios.get('/api/admin/getdrones');
           
            dispatch({
                type: GET_DRONE_DETAILS_SUCCESS,
                payload: res.data
            })
        }catch(err){
            const errors = err.response.data.errors;
            
            dispatch({
                type:  GET_DRONE_DETAILS_FAIL
            })
        }
        }

        export const Editdrone = (droneid,dronename,baseprice,weight,flightspeed,image,camera,servicetype,brand) => async dispatch =>{
  
        const body ={dronename:dronename,baseprice:baseprice,weight:weight,flightspeed:flightspeed,
            image:image,camera:camera,servicetype:servicetype,brand:brand}

            try{
                const res = await axios.post(`/api/admin/editdrone/${droneid}`,body);
                console.log(res)
                dispatch({
                    type: EDIT_DRONE_DETAILS_SUCCESS,
                    payload: res.data
                })
            }catch(err){
                const errors = err.response.data.errors;
                
                dispatch({
                    type:  EDIT_DRONE_DETAILS_FAIL
                })
            }
            }

            export const getunRegisterdrones = () => async dispatch =>{
                    try{
                        const res = await axios.get('/api/admin/getunregistereddrones');
                        
                        dispatch({
                            type: UNREGISTER_DRONE_SUCCESS,
                            payload: res.data
                        })
                    }catch(err){
                        const errors = err.response.data.errors;
                        
                        dispatch({
                            type:   UNREGISTER_DRONE_FAIL,
                        })
                    }
                    }
                    export const registerDrone = (droneid,dronename,brand,servicetype) => async dispatch =>{
                        try{
                            const body ={dronename:dronename,brand:brand,servicetype:servicetype}
                            const res = await axios.put(`/api/admin/registerdrone/${droneid}`,body);
                         
                            dispatch({
                                type: REGISTER_DRONE_SUCCESS,
                                payload: res.data
                            })
                        }catch(err){
                            const errors = err.response.data.errors;
                            
                            dispatch({
                                type:   REGISTER_DRONE_FAIL,
                            })
                        }
                        }
    export const deRegisterdrone = (droneid) => async dispatch =>{
                            try{
                                const res = await axios.put(`/api/admin/deregisterdrone/${droneid}`);
                             
                                dispatch({
                                    type: DEREGISTER_DRONE_SUCCESS,
                                    payload: res.data
                                })
                            }catch(err){
                                const errors = err.response.data.errors;
                                
                                dispatch({
                                    type:   DEREGISTER_DRONE_FAIL,
                                })
                            }
                            }
    export const  getfleetDrones = () => async dispatch =>{
                                try{
                                    const res = await axios.get(`/api/admin/getregisterdrones`);
                                 
                                    dispatch({
                                        type: GET_FLEET_DRONE_SUCCESS,
                                        payload: res.data
                                    })
                                }catch(err){
                                    const errors = err.response.data.errors;
                                    
                                    dispatch({
                                        type:   GET_FLEET_DRONE_FAIL,
                                    })
                                }
                                }
    export const  getfleetDronesdetail = (drone_id) => async dispatch =>{
                                    try{
                                        const res = await axios.get(`/api/admin/gettrackingdrone/${drone_id}`);
                                     
                                        dispatch({
                                            type: FLEET_DRONE_DETAIL_SUCCESS,
                                            payload: res.data
                                        })
                                    }catch(err){
                                        const errors = err.response.data.errors;
                                        
                                        dispatch({
                                            type:   FLEET_DRONE_DETAIL_FAIL,
                                        })
                                    }
                                    }
                
            