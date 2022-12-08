import React, { Fragment, useState, useEffect } from 'react'

import {Form, Button} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
//import { useAlert } from "react-alert";
import {farmregister, getfarmdetails} from "../../actions/farm";
import {Modal} from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { Row, Col, Spinner } from 'react-bootstrap';
import { loadUser } from '../../actions/auth';

export const Farmprofile = ({ history }) => {
    const dispatch = useDispatch();
    //const alert = useAlert();
    const {farmdetails} = useSelector((state) => state.farm)
    const {user} = useSelector((state)=>state.auth)
    const [showModal, setShow] = useState(false);
    const [farmname, setFarmname] = useState('')
    const [farmaddress, setFarmaddress] = useState('')
    const [farmcity, setFarmcity] = useState('')
    const [farmcountry, setFarmcountry] = useState('')
    const [farmzipcode, setFarmzipcode] = useState('')
const userid= user && user._id
    const onSubmit = () => {
       //e.preventDefault();
    
            dispatch(farmregister(userid,farmname,farmaddress,farmcity,farmcountry,farmzipcode));
    }
    useEffect(() => {
        dispatch(getfarmdetails(userid))
        if (farmdetails) {
            setFarmname(farmdetails.farmname)
            setFarmaddress(farmdetails.farmaddress)
            setFarmcity(farmdetails.farmcity)
            setFarmcountry(farmdetails.farmcountry)
            setFarmzipcode(farmdetails.farmzipcode)
        }
    }, [history,user]);
    const updateFarmSubmit = (e) => {
        e.preventDefault();
        dispatch(farmregister(userid,farmname,farmaddress,farmcity,farmcountry,farmzipcode)).then(()=>dispatch(loadUser()));
          setShow(false);
      }
      const onSubmitfarmland = () => {
        //e.preventDefault();
        //console.log("HI");
        //return <Redirect to="/register" />;
        history.push('/Farmlandprofile')
            
    };
    const handleClose = () => setShow(false);

  const handleShow = (e,farmdetails) => 
  {
    // dispatch(getProductDetails(productid))
    if (farmdetails) {
        setFarmname(farmdetails.farmname)
        setFarmaddress(farmdetails.farmaddress)
        setFarmcity(farmdetails.farmcity)
        setFarmcountry(farmdetails.farmcountry)
        setFarmzipcode(farmdetails.farmzipcode)
    }
    setShow(true);

  }
    return (

        <><div className="container">
                <div className="farm-profile">
                    <h5>Farm Profile</h5>
                    <p>Fill in data for your profile</p>
                    </div>
            <div className="register-farm">
                <Form>
                    <h5>Farm address</h5>
                    <Form.Group className="mb-3" controlId="farmname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmname'
                            value={farmname}
                            onChange={(e) => setFarmname(e.target.value)}
                            aria-describedby="farmname" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="farmaddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmaddress'
                            value={farmaddress}
                            onChange={(e) => setFarmaddress(e.target.value)}
                            aria-describedby="farmaddress" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="farmcity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmcity'
                            value={farmcity}
                            onChange={(e) => setFarmcity(e.target.value)}
                            aria-describedby="farmcity" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="farmcountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmcountry'
                            value={farmcountry}
                            onChange={(e) => setFarmcountry(e.target.value)}
                            aria-describedby="farmcountry" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="farmzipcode">
                        <Form.Label>Zip code</Form.Label>
                        <Form.Control
                            type="farmzipcode"
                            name='farmzipcode'
                            value={farmzipcode}
                            onChange={(e) => setFarmzipcode(e.target.value)}
                            aria-describedby="farmzipcode" />
                    </Form.Group>
                </Form>
                <div className="btn_panel">
                    <Button variant="primary" style={{backgroundColor:'#1A3447'}} onClick={() => onSubmit()}>Save</Button>
                </div>
            </div>
            <div className="profile-button">
              <button onClick={() => onSubmitfarmland()} style={{ marginTop: '20px',backgroundColor:'#1A3447'}} className="btn btn-primary">Farm Land</button>
            </div>
        </div>
        <Fragment>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update a farm profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div>
                            </div>
                            <div>
                                <h5>Update Farm Profile</h5>
                                <Form>
                                <Form.Group className="mb-3" controlId="farmname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmname'
                            value={farmname}
                            onChange={(e) => setFarmname(e.target.value)}
                            aria-describedby="farmname" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="farmaddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmaddress'
                            value={farmaddress}
                            onChange={(e) => setFarmaddress(e.target.value)}
                            aria-describedby="farmaddress" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="farmcity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmcity'
                            value={farmcity}
                            onChange={(e) => setFarmcity(e.target.value)}
                            aria-describedby="farmcity" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="farmcountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name='farmcountry'
                            value={farmcountry}
                            onChange={(e) => setFarmcountry(e.target.value)}
                            aria-describedby="farmcountry" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="farmzipcode">
                        <Form.Label>Zip code</Form.Label>
                        <Form.Control
                            type="farmzipcode"
                            name='farmzipcode'
                            value={farmzipcode}
                            onChange={(e) => setFarmzipcode(e.target.value)}
                            aria-describedby="farmzipcode" />
                    </Form.Group>
                </Form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => updateFarmSubmit(e)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment></>
    )
}

export default Farmprofile;