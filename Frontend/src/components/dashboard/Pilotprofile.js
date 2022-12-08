import React, { Fragment, useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Spinner, Table } from 'react-bootstrap';
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';

export const Pilotprofile=({ history }) => {
    const { user } = useSelector((state) => state.auth);
    const onSubmitbooking =() =>
    {
        history.push('/pilotbooking')
    }
    const onSubmitprofile = () =>
    {
        history.push('/pilotinfo')  
    }
    return (
        <Fragment >
            {user && 
        <><div className="pilotprofile"><h5>Welcome, {user.uname} !</h5>
            <p>Please select an option to continue</p>
        </div>
        <div className="pilotprofile-img">
        {user.picture ?
            <img src={user.picture} alt="https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg" height='150' width='150'/>
            : <img src='https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg' alt="https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg" height='150' width='150'/>
        }
        </div>
        <div className="pilotbutton1">
        <button className="btn btn-primary" style={{backgroundColor:'#1A3447'}} onClick={()=>onSubmitbooking()}>View Schedule</button>
            </div>
            <div className="pilotbutton2">
            <button className="btn btn-primary"  style={{backgroundColor:'#1A3447'}} onClick={()=>onSubmitprofile()}> Edit Profile</button>
                </div></> };
                </Fragment>
    )
}
export default Pilotprofile;
