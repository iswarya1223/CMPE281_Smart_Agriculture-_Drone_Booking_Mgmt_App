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
import {FARMER_DRIVING_LIC} from "../../actions/types";
import {Farmverification} from "../../actions/farm";
import {getfarmdetails} from "../../actions/farm"
export const Farmutilitybill= ({ history }) => {
    const dispatch=useDispatch();
    const {plotcerti,farmdrivelic} = useSelector((state)=> state.plotsave)
    const {user} = useSelector(state=>state.auth)
    const userid= user && user._id
    const [farmagreementid,setFarmagreementid]=useState('')
    const [farmutilitydtissue,setFarmutilitydtissue]=useState('')
    const [farmutilitybillimg,setFarmutilitybillimg]=useState('')
    const {farmdetails} = useSelector(state=>state.farm)
    useEffect(() => {
      if (farmdetails){
        setFarmagreementid(farmdetails.farmagreementid);
        setFarmutilitydtissue(farmdetails.farmutilitydtissue);
        setFarmutilitybillimg(farmdetails.farmutilitybillimg);
      }
    }, [history,farmdetails]);
    const onSubmit = () => {

        if (plotcerti && farmdrivelic){
dispatch(Farmverification(userid,plotcerti.landownername,plotcerti.certificateid,plotcerti.certissuedate,plotcerti.totalarea,plotcerti.certimage,
  farmdrivelic.farmerdrivelicid,farmdrivelic.farmerdrivelicname,farmdrivelic.farmerdrivelicimg,farmutilitydtissue,farmutilitybillimg,farmagreementid)).then(()=> dispatch(getfarmdetails(userid))).then(()=> history.push('/Farmerbilling'))
       }
      else
       {
        history.push('/Farmerprofile')       
    }
};
const onSubmitback = () =>{
  history.push('/Farmerdrivinglic')
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
        setFarmutilitybillimg(res.data.secure_url)
        })
      }
      return(
        <><div className="container">
         <div className="farmer-verifi-form">
          <h5>Let's verify your farm operation</h5>
          <p>Please submit a copy of your farm's utility bill</p>
        </div>
            <div className="register-form1">
            <h6>Farm Utility Bill</h6>
              <Form>
                <Form.Group className="mb-3" controlId="farmagreementid">
                  <Form.Label>Statement Agreement ID</Form.Label>
                  <Form.Control
                    type="text"
                    name='farmagreementid'
                    value={farmagreementid}
                    onChange={(e) => setFarmagreementid(e.target.value)}
                    aria-describedby="farmagreementid" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="farmutilitydtissue">
                  <Form.Label>Date of bill statement</Form.Label>
                  <Form.Control
                    type="text"
                    name='farmutilitydtissue'
                    value={farmutilitydtissue}
                    onChange={(e) => setFarmutilitydtissue(e.target.value)}
                    aria-describedby="farmutilitydtissue" />
                </Form.Group>
                <p>Upload Image of utility bill</p>
                {farmutilitybillimg && (
                  <Image className="img"
                    style={{ height: 80, width: 100, marginBottom: 20, borderRadius: '100%' }}
                    cloudName='dj3in4dua'
                    public_id={farmutilitybillimg} />
                )}
                <input
                  type='file'
                  className='form-control'
                  name='farmutilitybillimg'
                  onChange={(e) => uploadImage(e)}
                ></input>
              </Form>
              <div className="farmbtn_panel">
              <Button variant="primary" style={{ backgroundColor: '#B9B9C3' }} onClick={() => onSubmitback()}>Back</Button>
              <Button variant="primary" style={{backgroundColor:'#1A3447'}} onClick={() => onSubmit()}>Next</Button>
            </div>
            </div>
          </div></>
      )
}

export default Farmutilitybill;