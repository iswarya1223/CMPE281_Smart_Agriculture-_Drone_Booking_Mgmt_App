import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Button, Spinner,Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {Modal} from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';
import './drone.css';
import {createDrone} from '../../actions/admin'
export const Adddrone = ({history}) => {
 
    const dispatch = useDispatch()
    const [dronename, setDronename] = useState('');
    const [brand, setBrand] = useState('');
    const [flightspeed, setFlightspeed] = useState('');
    const [camera, setCamera] = useState('');
    const [baseprice, setBaseprice] = useState('');
    const [weight,setWeight] = useState('');
    const [servicetype,setServicetype] = useState('');
    const [image,setImage] = useState('');

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
          console.log(res.data.secure_url)
          setImage(res.data.secure_url)
        })
      }
const onSubmitback=() =>
{
history.push('/Dronecatalog')
}
const onSubmit =(dronename,baseprice,brand,flightspeed,weight,image,camera,servicetype) =>
{
    dispatch(createDrone(dronename,baseprice,brand,flightspeed,weight,image,camera,servicetype)).then(() => history.push('/Dronecatalog'))
    
}
      return (
        <>
          <div className="container">
          <div className="create-drone-form">
              <h5>Add a New Drone</h5>
              <p>Enter details to create the drone</p>
          </div>
                  <div className="register-form1">
                      <Form>
                          <Form.Group className="mb-3" controlId="dronename">
                              <Form.Label>DroneName</Form.Label>
                              <Form.Control
                                  type="text"
                                  name='dronename'
                                  value={dronename}
                                  onChange={(e) => setDronename(e.target.value)}
                                  aria-describedby="dronename" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="brand">
                              <Form.Label>Brand</Form.Label>
                              <Form.Control
                                  type="text"
                                  name='brand'
                                  value={brand}
                                  onChange={(e) => setBrand(e.target.value)}
                                  aria-describedby="brand" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="baseprice">
                              <Form.Label>BasePrice</Form.Label>
                              <Form.Control
                                  type="text"
                                  name='baseprice'
                                  value={baseprice}
                                  onChange={(e) => setBaseprice(e.target.value)}
                                  aria-describedby="baseprice" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="camera">
                              <Form.Label>Camera</Form.Label>
                              <Form.Control
                                  type="text"
                                  name='camera'
                                  value={camera}
                                  onChange={(e) => setCamera(e.target.value)}
                                  aria-describedby="camera" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="flightspeed">
                              <Form.Label>Flight Speed</Form.Label>
                              <Form.Control
                                  type="text"
                                  name='flightspeed'
                                  value={flightspeed}
                                  onChange={(e) => setFlightspeed(e.target.value)}
                                  aria-describedby="flightspeed" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="weight">
                              <Form.Label>Weight</Form.Label>
                              <Form.Control
                                  type="text"
                                  name='weight'
                                  value={weight}
                                  onChange={(e) => setWeight(e.target.value)}
                                  aria-describedby="weight" />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="servicetype">
                              <select className="form-control" onChange={(e) => setServicetype(e.target.value)} name="servicetype" value={servicetype}>
                                  <option value="null"> Select servicetype</option>
                                  <option value="data collection">data collection</option>
                                  <option value="payload">payload</option>
                                  <option value="surveillance">surveillance</option>
                              </select>
                          </Form.Group>
                          <input
                              type='file'
                              className='form-control'
                              name='userName'
                              
                              onChange={(e) => uploadImage(e)}
                          ></input>
                      </Form>
                      <div className="farmbtn_panel">
              <Button variant="primary" style={{ backgroundColor: '#B9B9C3' }} onClick={() => onSubmitback()}>Back</Button>
              <Button variant="primary" style={{ backgroundColor: '#1A3447' }} onClick={() => onSubmit(dronename,baseprice,brand,flightspeed,weight,image,camera,servicetype)}>Next</Button>
            </div>
                  </div>
              </div></>
                            )
                            };
export default Adddrone;