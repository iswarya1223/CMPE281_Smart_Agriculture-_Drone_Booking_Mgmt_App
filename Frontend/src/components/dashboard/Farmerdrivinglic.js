import React, { Fragment, useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import moment from 'moment';
import {Modal} from "react-bootstrap";
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';
import { loadUser } from "../../actions/auth";
import { updateProfile } from "../../actions/auth";
import { Image } from 'cloudinary-react';
import {PILOT_DRIVING_LIC,FARMER_DRIVING_LIC} from "../../actions/types";
import './farm.css';
export const Farmerdrivinglic = ({ history }) => {
    const dispatch=useDispatch();
    const {user} =useSelector(state=>state.auth)
    const [farmerdrivelicid,setFarmerdrivelicid]=useState('')
    const [farmerdrivelicimg,setFarmerdrivelicimg]=useState('')
    const [farmerdrivelicname,setFarmerdrivelicname]=useState('')
    const {farmdetails} = useSelector(state=>state.farm)
    useEffect(() => {
      if (farmdetails){
        setFarmerdrivelicid(farmdetails.farmerdrivelicid);
        setFarmerdrivelicimg(farmdetails.farmerdrivelicimg);
        setFarmerdrivelicname(farmdetails.farmerdrivelicname);
      }
    }, [history,farmdetails]);
    useEffect(() => {
      if (user && user.pilotlicense){
        setFarmerdrivelicid(user.pilotlicense.licenseid);
        setFarmerdrivelicimg(user.pilotlicense.licenseimg);
        setFarmerdrivelicname(user.pilotlicense.licensename);
      }
    }, [history,user ]);
    const onSubmit = () => {
        //e.preventDefault();
        //console.log("HI");
        //return <Redirect to="/register" />;
        if (user && user.role === 'farmer')
        {
        dispatch({type:FARMER_DRIVING_LIC,
        payload:{farmerdrivelicid:farmerdrivelicid,
            farmerdrivelicname:farmerdrivelicname,
            farmerdrivelicimg:farmerdrivelicimg}}).then(history.push('/Farmutilitybill'))
        }
        if (user && user.role === 'pilot')
        {
        dispatch({type:PILOT_DRIVING_LIC,
        payload:{pilotlicense:farmerdrivelicid,
          licensename:farmerdrivelicname,
          licenseimg:farmerdrivelicimg}}).then(history.push('/Pilotbilling'))
        }
           
            
    };
    const onSubmitback = () =>{
      if (user && user.role === 'farmer')
{
      history.push('/Farmcertificate')
}
if (user && user.role === 'pilot')
{
      history.push('/Pilotcertificate')
}
    }
    const uploadImage = async (e) => {
        e.preventDefault()
        // console.log('image',image);
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('cloud_name', 'dj3in4dua')
        formData.append('upload_preset', 'hbhuqhw2')
        // console.log('image',image);
        await axios.post(
          'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
          formData
        ).then((res) => {
        setFarmerdrivelicimg(res.data.secure_url)
        })
      }
      return(
        <><div className="container">
<div className="farmer-verifi-form">
          <h5>Let's verify your identity</h5>
          <p>Please upload your driver's license</p>
        </div>
            <div className="register-form1">
              <h6>Driver's License</h6>
              <Form>
                <Form.Group className="mb-3" controlId="farmerdrivelicname">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name='farmerdrivelicname'
                    value={farmerdrivelicname}
                    onChange={(e) => setFarmerdrivelicname(e.target.value)}
                    aria-describedby="farmerdrivelicname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="farmerdrivelicid">
                  <Form.Label>License ID</Form.Label>
                  <Form.Control
                    type="text"
                    name='farmerdrivelicid'
                    value={farmerdrivelicid}
                    onChange={(e) => setFarmerdrivelicid(e.target.value)}
                    aria-describedby="farmerdrivelicid" />
                </Form.Group>
                <p>Upload Image of License</p>
                {farmerdrivelicimg && (
                  <Image className="img"
                    style={{ height: 80, width: 100, marginBottom: 20, borderRadius: '100%' }}
                    cloudName='dj3in4dua'
                    public_id={farmerdrivelicimg} />
                )}
                <input
                  type='file'
                  className='form-control'
                  name='farmerdrivelicimg'
                  onChange={(e) => uploadImage(e)}
                ></input>
              </Form>
              <div className="farmbtn_panel">
              <Button variant="primary" style={{ backgroundColor: '#B9B9C3' }}onClick={() => onSubmitback()}>Back</Button>
              <Button variant="primary" style={{backgroundColor:'#1A3447'}} onClick={() => onSubmit()}>Next</Button>
            </div>
            </div>
           
          </div></>
      )
}

export default Farmerdrivinglic;