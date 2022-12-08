import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Button, Spinner,Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {Modal} from "react-bootstrap";
import './../booking/droneCard.css';
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';
import './../dashboard/farm.css';
import {getDrones,Editdrone}  from '../../actions/admin'
export const Dronecatalog = ({history}) => {

    const dispatch = useDispatch()
    const handleClose = () => setShow(false);
    const [showModal, setShow] = useState(false);
    const [dronename, setDronename] = useState('');
    const [brand, setBrand] = useState('');
    const [flightspeed, setFlightspeed] = useState('');
    const [camera, setCamera] = useState('');
    const [baseprice, setBaseprice] = useState('');
    const [weight,setWeight] = useState('');
    const [servicetype,setServicetype] = useState('');
    const [droneid,setDroneid] = useState('');
    const [image,setImage] = useState('');

    const {dronedetails}  = useSelector(state=>state.dronedet)

    const handleShow = (e,dronedt) =>
    {
        if (dronedt)
        {
            // eslint-disable-next-line no-unused-expressions
            setDronename(dronedt.dronename),
            setBrand(dronedt.brand),
            setFlightspeed(dronedt.flightspeed),
            setCamera(dronedt.camera),
            setBaseprice(dronedt.baseprice),
            setWeight(dronedt.weight),
            setServicetype(dronedt.servicetype)
            setDroneid(dronedt.droneid)
            setImage(dronedt.image)
        }
        setShow(true);
    }
    const createDrone =(e) =>
    {
        history.push('/Adddrone')
    }
    const updateDroneSubmit = (e,droneid,dronename,baseprice,weight,flightspeed,image,camera,servicetype,brand) => {
        e.preventDefault();
        dispatch(Editdrone(droneid,dronename,baseprice,weight,flightspeed,image,camera,servicetype,brand)).then(()=>dispatch(getDrones()));
          setShow(false);
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
          console.log(res.data.secure_url)
          setImage(res.data.secure_url)
        })
      }
  
      useEffect(()=>{
        dispatch(getDrones())
      },[]);
return (
    <><div className='drone'>
        <h4>Drone Catalog</h4>
        <p>Add, update, or edit drones to the catalog</p>
        <Button variant="primary" onClick={(e)=> createDrone(e)}>Add New Drone</Button>
    </div><div>
            <Row xs={1} md={4} className="g-4">
                {dronedetails && dronedetails.map((dronedt)=>(
                    <Col>
                        <div className='dronecard'>
                            <Card style={{ width: '15rem', height: '14rem', borderRadius: '30px' }}>
                                <Card.Body>
                                    <img variant="top" src={dronedt.image}  alt='noimagefound' width="60" height="60" />
                                    <Card.Text>
                                        <p><b>{dronedt.dronename}</b></p>
                                    </Card.Text>
                                    <Card.Text>
                                        <p><b>{dronedt.servicetype}</b></p>
                                    </Card.Text>
                                    <Card.Text>
                                        <p>{dronedt.brand}</p>
                                    </Card.Text>

                                    <Card.Text>
                                        <p>{dronedt.camera} camera</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <p>{dronedt.flightspeed} flightspeed</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <p>{dronedt.weight}</p>
                                    </Card.Text>
                                    <Card.Text>
                                        <p><b>{dronedt.baseprice} $ </b> / hour</p>
                                    </Card.Text>
                                    <Card.Text>
                                    <Button variant="primary"  onClick={(e)=> handleShow(e,dronedt)}>Edit </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
        <Fragment>
                <Modal show={showModal} onHide={handleClose}  bsClass="my-modal">
                <Modal.Header closeButton>
                </Modal.Header>
                    <Modal.Body className="jogger">
                        <div className="container">
                            <div>
                            </div>
                            <div>
                                <h5>Edit a New Drone</h5>
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
                    <select className="form-control"  onChange={(e) => setServicetype(e.target.value)} name="servicetype" value={servicetype}>
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
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" style={{ backgroundColor: '#1A3447' }} onClick={(e) => updateDroneSubmit(e,droneid,dronename,baseprice,weight,flightspeed,image,camera,servicetype,brand)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment></>
      )
    }

    export default Dronecatalog;    