import React, {Fragment,useEffect} from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './drone.css';
import {Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {getDrones,deRegisterdrone}  from '../../actions/admin';
import { BsTrash } from "react-icons/bs";


export const Dronemanagement =({history}) =>
{
    const dispatch =useDispatch()
    const {dronedetails} = useSelector(state=>state.dronedet)
    const registerDrone = () =>
    {
        history.push('/Registerdrone')
    }
    const unRegisterdrone = (droneid) =>{
dispatch(deRegisterdrone(droneid)).then(()=>  dispatch(getDrones()))
    }
    useEffect(()=>{
        dispatch(getDrones())
      },[]);
return (
    <><div className='tablehead'><h4>Drone Management</h4>
        <p>Add or Update Drones</p>
        <Button variant="primary" onClick={() => registerDrone()}>Register Drone</Button>
        </div>
        
        <div className='droneregister'>
        
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>DroneID#</th>
                        <th scope='col'>Drone Model</th>
                        <th scope='col'>Service</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </MDBTableHead>
                { dronedetails && dronedetails.map((dronedt) =>(
                <Fragment>
                {dronedt.registered ?
                <MDBTableBody>
                    <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-normal mb-1'>{dronedt.droneid}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>{dronedt.dronename}</p>
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>{dronedt.servicetype}</p>
                        </td>
                        <td>
                            <BsTrash  onClick ={() => unRegisterdrone(dronedt.droneid)}/>
                        </td>
                    </tr>
                </MDBTableBody>

                :' '}
</Fragment>
                ))}
            </MDBTable> 
             
        </div>
       
        </>
  );
}

export default Dronemanagement;