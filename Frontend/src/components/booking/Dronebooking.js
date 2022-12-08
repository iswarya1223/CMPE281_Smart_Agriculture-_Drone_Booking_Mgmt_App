import React, {Fragment,useEffect} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../admin/drone.css';
import {Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {getBookings}  from '../../actions/booking';
import moment from 'moment';

import Badge from 'react-bootstrap/Badge';

export const Dronebooking =({history}) =>
{

    const dispatch =useDispatch();
    const {userbookings} = useSelector(state=>state.searchdrone)
    const {user} = useSelector(state=>state.auth)
    const userid = user && user._id
    const startdate =  userbookings && userbookings[0].startdate
    const newDate= new Date(new Date(startdate).setDate(new Date(startdate).getDate() + (1)))
    console.log(newDate)
    const onMybooking = (_id) =>
    {
        history.push(`/Bookingdetail/${_id}`)
    }
    useEffect(() => {
        dispatch(getBookings(userid))
      }, [userid]);
    return (
        <><div className='tablehead'>
            <p id='pdrone'>Welcome {user && user.uname}</p>
            <p id='pcheck'>Check the status of your drone service bookings here</p>
            <img id='pimage' src={user && user.picture} alt='no imgfound'/>
            <h4 id='fbook'>All Bookings</h4>
            </div>
            <div className='droneregister'>
            
                <MDBTable align='middle'>
                    <MDBTableHead class="bg-light">
                        <tr>
                            <th scope='col'>ServiceID#</th>
                            <th scope='col'>Farm Land</th>
                            <th scope='col'>Land Type</th>
                            <th scope='col'>Service</th>
                            <th scope='col'>Service Time</th>
                            <th scope='col'>Status</th>
                        </tr>
                    </MDBTableHead>
                    
                    <Fragment>
                    {userbookings && userbookings.map((bookdt) =>(
                    <MDBTableBody onClick = {() => onMybooking(bookdt._id)}>
                        <tr>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='ms-3'>
                                        <p  className="fw-bold mb-1">ID# {bookdt.droneid}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-bold mb-1">{bookdt.plotdetails.plotname}</p>
                            </td>
                            <td>
                                <p className='fw-bold mb-1'>{bookdt.plotdetails.plot_type}</p>
                            </td>
                            <td>
                            <p className='fw-bold mb-1'>{bookdt.servicetype}</p>
                            </td>
                            <td>   
                            <p className='fw-bold mb-1'>{moment(new Date(bookdt.startdate).setDate(new Date(bookdt.startdate).getDate() + (1))).format("DD-MM-YYYY")}-</p>
                            <p className='fw-bold mb-1'>{moment(new Date(bookdt.enddate).setDate(new Date(bookdt.enddate).getDate() + (1))).format("DD-MM-YYYY")}</p>
                            </td>
                            <td>
                            {bookdt.status === 'active' ?
                            <Badge bg="success">Active</Badge> 
                            : <div>
                            { bookdt.status === 'booked' ? <Badge bg="danger">Booked</Badge>: <Badge bg="info">Finished</Badge>}
                            </div>}
                            </td>
                        </tr>
                        
                    </MDBTableBody>
                    ))}
                   
    </Fragment>
                </MDBTable> 
                 
            </div>
           
            </>
      );
    }
    
    export default Dronebooking;