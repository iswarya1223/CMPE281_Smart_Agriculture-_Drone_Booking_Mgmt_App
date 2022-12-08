import React, {Fragment,useEffect} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import '../admin/drone.css';
import {Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Badge from 'react-bootstrap/Badge';
import {getBookings}  from '../../actions/booking';
import moment from 'moment';

export const Servicereport =({history}) =>
{
    const dispatch =useDispatch();
    
    const {userbookings} = useSelector(state=>state.searchdrone)
    const {user} = useSelector(state=>state.auth)
    const userid = user && user._id

    // const onMybooking = (_id) =>
    // {
    //     history.push(`/Bookingdetail/${_id}`)
    // }
    useEffect(() => {
        dispatch(getBookings(userid))
      }, []);

    return (
        <><div className='tablehead'>
            <p id='pdrone'>Service Reports</p>
            <p id='pcheck'>You can view your reports for finished services here</p>
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
                    <Fragment>
                    {bookdt.status === 'finished' ?
                    <MDBTableBody>
                   
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
                            <Badge bg="info">Finished</Badge> 
                            </td>
                        </tr>
                        
                    </MDBTableBody>
                    
                    : ''}
                    </Fragment>
                     ))}
                   
    </Fragment>
                </MDBTable> 
                 
            </div>
           
            </>
      );
    }
    
    export default Servicereport;