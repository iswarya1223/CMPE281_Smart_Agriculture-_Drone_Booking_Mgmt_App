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
import {FARM_CERTIFICATE} from "../../actions/types";
import'./farm.css';

export const Farmcertificate = ({ history }) => {
    const dispatch=useDispatch();
    const [landownername,setLandownername]=useState('')
    const [certificateid,setCertificateid]=useState('')
    const [certissuedate,setCertissuedate]=useState('')
    const [totalarea,setTotalarea]=useState('')
    const [certimage,setCertimage]=useState('')
    const {farmdetails} = useSelector(state=>state.farm)
    useEffect(() => {
      if (farmdetails){
        setLandownername(farmdetails.landownername);
        setCertificateid(farmdetails.certificateid);
        setCertissuedate(farmdetails.certissuedate);
        setTotalarea(farmdetails.totalarea);
        setCertimage(farmdetails.certimage); 
      }
    }, [history,farmdetails]);
    const onSubmit = () => {
        //e.preventDefault();
        //console.log("HI");
        //return <Redirect to="/register" />;
        dispatch({type:FARM_CERTIFICATE,
        payload:{landownername:landownername,
            certificateid:certificateid,
            certissuedate:certissuedate,
            totalarea:totalarea,
            certimage: certimage}}).then(history.push('/Farmerdrivinglic'))
            
    };
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
        setCertimage(res.data.secure_url)
        })
      }

    return(
      <>
      <div className="container">
      <div className="farmer-verifi-form">
        <h5>Let's verify your farm</h5>
        <p>Fill in more data regarding your farm certification</p>
      </div>
          <div className="register-form1">
            <h5>Land Ownership Certificate</h5>
            <Form>
              <Form.Group className="mb-3" controlId="landownername">
                <Form.Label>Land Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  name='plotname'
                  value={landownername}
                  onChange={(e) => setLandownername(e.target.value)}
                  aria-describedby="landownername" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="certificateid">
                <Form.Label>Certificate ID</Form.Label>
                <Form.Control
                  type="text"
                  name='certificateid'
                  value={certificateid}
                  onChange={(e) => setCertificateid(e.target.value)}
                  aria-describedby="certificateid" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="certissuedate">
                <Form.Label>Certificate Issue Date</Form.Label>
                <Form.Control
                  type="text"
                  name='certissuedate'
                  value={certissuedate}
                  onChange={(e) => setCertissuedate(e.target.value)}
                  aria-describedby="certissuedate" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="totalarea">
                <Form.Label>Total Area(Squarefeet)</Form.Label>
                <Form.Control
                  type="text"
                  name='totalarea'
                  value={totalarea}
                  onChange={(e) => setTotalarea(e.target.value)}
                  aria-describedby="totalarea" />
              </Form.Group>
              <p>Upload Image of certificate</p>
              {certimage && (
                <Image className="img"
                  style={{ height: 80, width: 100, marginBottom: 20, borderRadius: '100%' }}
                  cloudName='dj3in4dua'
                  public_id={certimage} />
              )}

              <input
                type='file'
                className='form-control'
                name='userName'
                onChange={(e) => uploadImage(e)}
              ></input>
            </Form>
            <div className="btn_panel">
            <Button variant="primary" style={{backgroundColor:'#1A3447'}} onClick={() => onSubmit()}>Next</Button>

          </div>
          </div>
         
        </div></>
    )
}

export default Farmcertificate;