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
import { Image } from 'cloudinary-react'

const Farmerprofile = ({ history }) => {

const [uname,setUname]=useState('')
const [email,setEmail]=useState('')
const [address,setAddress]=useState('')
const [mobile,setMobile]=useState('')
const [picture,setPicture]=useState('https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg')

const dispatch = useDispatch();
const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
//const email = user && user.email;
const [showModal, setShow] = useState(false);
//console.log(email)
useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/");
    }
  }, [history, isAuthenticated]);
  const onSubmitFarm = () => {
    //e.preventDefault();
    //console.log("HI");
    //return <Redirect to="/register" />;
    history.push('/Farmprofile')
        
};
const onSubmitFarmverifi = () => {
  //e.preventDefault();
  //console.log("HI");
  //return <Redirect to="/register" />;
  history.push('/Farmcertificate')
      
};

const updateProfileSubmit = (e) => {
  e.preventDefault();
  dispatch(updateProfile(email,uname,picture,address,mobile)).then(()=>dispatch(loadUser()));
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
    setPicture(res.data.secure_url)
  })
}

const handleClose = () => setShow(false);

  const handleShow = (e,user) => 
  {
    // dispatch(getProductDetails(productid))
    if (user){
      setUname(user.uname);
      setEmail(user.email);
      setAddress(user.address);
      setMobile(user.mobile);
      setPicture(user.picture);
  }
    setShow(true);

  }

return (
    <><Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <div className="Homecontainer">
        {user &&
          <><div className="profileContainer">
            <EditIcon onClick={(e)=> handleShow(e, user)}/>
            <Row>
              <Col xs={2}>
                {user.picture ?
                <img src={user.picture} alt="https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg" width="150" height="150" style={{ borderRadius: '50%' }} />
                : <img src="https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg" alt="https://i.pinimg.com/236x/97/43/ec/9743ecac80966a95e9d328c08b995c04.jpg" width="150" height="150" style={{ borderRadius: '50%' }} />
}
              </Col>
            </Row>
          </div>
            <div classname="Profileinfo">
              <Row>
                <Col xs={2}>
                    <p>Email</p>
                </Col>
                <Col>
                  <p>{user.email}</p>
                </Col>
              </Row>
              <Row>
              <Col xs={2}>
                  <p>username: </p>
                  </Col>
                  <Col>
                  <p>{user.uname}</p>
                  </Col>
                  </Row>
                  <Row>
                    <Col xs={2}>
                  <p>mobile:</p>
                    </Col>
<Col>
                     <p>{user.mobile}</p>
                     </Col>

                  </Row>
                 
                  
                {user && user.address &&
                  <>
                  <Row>
                  <Col xs={2}>
                    <p>address: </p>
                    </Col>
                    <Col>
                     <p> {user.address}</p>
                      </Col>
                      </Row></>}     
                {user && user.billinginfo &&
                  <>
                  <Row>
                <Col  xs={2}>
                    <p>Creditcard:</p>
                    </Col>
                    <Col>
                    <p>
                     card number ending with {user.billinginfo.cardnumber.slice(15,19)}
                     </p>
                     </Col>
                     </Row>
                    </>}

            </div>
            <div className="profile-button">
              <button onClick={() => onSubmitFarm()} style={{backgroundColor:'#1A3447'}} className="btn btn-primary">Farm Profile</button>
              </div>
              <div className="profile-button1">
              <button onClick={() => onSubmitFarmverifi()} style={{ marginTop: '30px',backgroundColor:'#1A3447' }}  className="btn btn-primary">Farm Verification</button>
            </div>
            
          </>}
          </div>
      </Fragment>
    )}
  </Fragment><Fragment>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update farmer profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
			<div >
			</div>
			<div className='update-profile' >
			<h5>Update Profile Information</h5>
			<Form>
            <Form.Group className="mb-3" controlId="uname">
					<Form.Label>Name</Form.Label>
					<Form.Control
                    type="text"
                      name='uname'
                      value={uname}
                      onChange={(e) => setUname(e.target.value)}
                      aria-describedby="uname"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
                    type="text"
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="email"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
                    type="text"
                      name='address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      aria-describedby="address"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
					<Form.Label>Mobile</Form.Label>
					<Form.Control
                    type="text"
                      name='mobile'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      aria-describedby="mobile"/>
            </Form.Group>
            {/* {picture && (
        <Image className="img"
          style={{ height: 80, width: 100, marginBottom: 20 , borderRadius: '100%' }}
          cloudName='dj3in4dua'
          public_id={picture}
        />
      )} */}
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
          <Button variant="primary" style={{ backgroundColor: '#1A3447' }} onClick={(e) => updateProfileSubmit(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment></>
);
}
export default Farmerprofile;