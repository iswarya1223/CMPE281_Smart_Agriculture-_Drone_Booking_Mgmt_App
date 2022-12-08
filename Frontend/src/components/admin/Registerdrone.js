import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Button, Spinner,Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {Modal} from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';
import './drone.css';
import {registerDrone,getunRegisterdrones} from '../../actions/admin'

export const Registerdrone =({history}) =>
{
    const dispatch =useDispatch()
    const {unregisterdrones} = useSelector(state=>state.dronedet)
   
    const [droneregister,setDroneregister]=useState({
        droneid: '',
        dronename: '',
        brand: '',
        servicetype: '',
    })
    const {droneid,dronename,brand,servicetype} = droneregister

    useEffect(
        () => {
            dispatch(getunRegisterdrones())
        },[])
const onSubmitback=() =>
        {
        history.push('/Dronemanagement')
        }
        const onSubmit =(droneid,dronename,brand,servicetype) =>
        {
           dispatch(registerDrone(droneid,dronename,brand,servicetype)).then(() => history.push('/Dronemanagement'))
            
        }
    const displayDronedet =(e) => {
        
        // eslint-disable-next-line array-callback-return
        unregisterdrones && unregisterdrones.map((unregisterdt) => {
           
            if(parseInt(unregisterdt.droneid) === parseInt(e.target.value))
            {
                
                let updatedValue= {dronename:unregisterdt.dronename,brand:unregisterdt.brand,droneid:e.target.value,servicetype:unregisterdt.servicetype};
                setDroneregister({
                    ...droneregister,
                    ...updatedValue
                  });
            }
        }
        )
                    
                }
    return (
        <><div>
                <div className="container">
                <div className="create-drone-form">
            <h5>Register a New Drone</h5>
            <p>Register the drone in mission planner</p>
        </div>
                    <div className="register-form1">
                        
                        <Form>
                            <Form.Group className="mb-3" controlId="droneid">
                                <select className="form-control" onChange={(e) => displayDronedet(e)} name="droneid" value={droneid}>
                                    <option value="null"> Select Droneid</option>
                                    {unregisterdrones && unregisterdrones.map(unregisterdt => <option value={unregisterdt.droneid}>{unregisterdt.droneid}</option>
                                    )}
                                </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="dronename">
                                <Form.Label>DroneName</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='dronename'
                                    value={dronename}
                                    aria-describedby="dronename" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='brand'
                                    value={brand}

                                    aria-describedby="brand" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="servicetype">
                                <Form.Label>servicetype</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='servicetype'
                                    value={servicetype}

                                    aria-describedby="servicetype" />
                            </Form.Group>
                        </Form>
                        <div className="farmbtn_panel">
              <Button variant="primary" style={{ backgroundColor: '#B9B9C3' }} onClick={() => onSubmitback()}>Back</Button>
              <Button variant="primary" style={{ backgroundColor: '#1A3447' }} onClick={() => onSubmit(droneid,dronename,brand,servicetype)}>Save</Button>
            </div>
                    </div>
                    
                </div>

            </div></>
    )
}
