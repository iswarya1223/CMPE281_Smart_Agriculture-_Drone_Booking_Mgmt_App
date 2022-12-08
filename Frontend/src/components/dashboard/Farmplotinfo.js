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
import {FARM_PLOT_INFO1} from "../../actions/types";
import './farm.css';
export const Farmplotinfo = ({ history }) => {

    const dispatch=useDispatch();
    const [plotname,setPlotname]=useState('')
    const [plot_type,setPlot_type]=useState('')
    const [plotimage,setPlotimage]=useState('')

    const onSubmit = () => {
        //e.preventDefault();
        //console.log("HI");
        //return <Redirect to="/register" />;
        dispatch({type:FARM_PLOT_INFO1,
        payload:{plotname:plotname,
            plot_type:plot_type,
        plotimage:plotimage}}).then(history.push('/Farmplotmap'))
            
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
          setPlotimage(res.data.secure_url)
        })
      }
      
    return(
        <div className="container">
			<div className="register-form1">
			<h5>Farm Information</h5>
			<Form>
            <Form.Group className="mb-3">
          <Form.Label >Select plottype</Form.Label>
          <Form.Select name='plot_type'
                      value={plot_type}
                      onChange={(e) => setPlot_type(e.target.value)}
                      aria-describedby="plot_type">
            <option value="null">Select plot type</option>
            <option value="Livestock">Livestock</option>
            <option value="Crops">Crops</option>
            <option value="Fruit">Fruit</option>
            <option value="Nursery">Nursery</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="plotname">
					<Form.Label>Plot Name</Form.Label>
					<Form.Control
                    type="text"
                      name='plotname'
                      value={plotname}
                      onChange={(e) => setPlotname(e.target.value)}
                      aria-describedby="plotname"/>
            </Form.Group>
            <p>Upload Plot Image</p>
            {plotimage && (
        <Image className="img"
          style={{ height: 80, width: 100, marginBottom: 20 , borderRadius: '100%' }}
          cloudName='dj3in4dua'
          public_id={plotimage}
        />
      )}
            <input
                        type='file'
                        className='form-control'
                        name='userName'
                        onChange={(e) => uploadImage(e)}
                      ></input>
        </Form>
        <div className="btn_panel">
				<Button variant="primary" style={{backgroundColor:'#1A3447'}} onClick={() => onSubmit()}>Select Plots</Button>
				
			</div>
        </div>
        
        </div>


    )
};

export default Farmplotinfo