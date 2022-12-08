import React, { Fragment, useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';
import {getPilotbooking} from '../../actions/booking'
import moment from 'moment'; 
import '../admin/drone.css';
export const Pilotbooking=({ history }) => {

  const dispatch = useDispatch()
  const {pilotbooking} = useSelector(state=>state.pilotsave)
  const {user} =  useSelector(state=>state.auth)
  const userid = user && user._id
 useEffect(()=>{
        dispatch(getPilotbooking(userid))
      },[]);
    return(
      <><div className="heading"><h3>My Schedule</h3></div>
     
         <div className='droneregister'>
        
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>BookingID#</th>
                    <th scope='col'>Service Type</th>
                    <th scope='col'>PlotType</th>
                    <th scope='col'>PlotName</th>
                    <th scope='col'>StartDate</th>
                    <th scope='col'>StartTime</th>
                </tr>
            </MDBTableHead>
            { pilotbooking && pilotbooking.map((pilotdt) =>(
            <Fragment>
            <MDBTableBody>
                <tr>
                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                                <p className='fw-normal mb-1'>{pilotdt._id}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p className='fw-normal mb-1'>{pilotdt.servicetype}</p>
                    </td>
                    <td>
                        <p className='fw-normal mb-1'>{pilotdt.plotdetails && pilotdt.plotdetails.plot_type}</p>
                    </td>
                    <td>
                    <p className='fw-normal mb-1'>{pilotdt.plotdetails && pilotdt.plotdetails.plotname}</p>
                    </td>
                    <td>
                    
                    <p className='fw-normal mb-1'>{moment(new Date(pilotdt.startdate).setDate(new Date(pilotdt.startdate).getDate() + (1))).format("DD-MM-YYYY")}</p>
                    </td>
                    <td>
                    <p className='fw-normal mb-1'>{pilotdt.starttime}</p>
                    </td>
                </tr>
            </MDBTableBody>
</Fragment>
            ))}
        </MDBTable> 
      </div></>
    );
  }

  export default Pilotbooking;