import React,{useState, useEffect} from "react";
import './farm.css';
import  {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import { Form, Button} from 'react-bootstrap';
import { Image } from 'cloudinary-react'
import { PILOT_INFO_SAVE } from "../../actions/types";

export const Pilotinfo = ({history}) => {
    const dispatch = useDispatch();
    const [uname,setUname]=useState('')
    const [email,setEmail]=useState('')
    const [address,setAddress]=useState('')
    const [mobile,setMobile]=useState('')
    const [picture,setPicture]=useState('https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true')

    const {isAuthenticated,user} = useSelector(state => state.auth)
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
          setPicture(res.data.secure_url)
        })
      }
useEffect(() => {
        if (isAuthenticated === false) {
          history.push("/");
        }
        if (user){
            setUname(user.uname);
            setEmail(user.email);
            setAddress(user.address);
            setMobile(user.mobile);
            setPicture(user.picture); 
        }
      }, [history, isAuthenticated,user ]);

      const onSubmitback = () => {
        //e.preventDefault();
        //console.log("HI");
        //return <Redirect to="/register" />;
        history.push('/Pilotprofile')
            
    };
    const onSubmit = () => {
        dispatch({type: PILOT_INFO_SAVE,
    payload : {uname:uname,
    email:email,
address:address,
mobile:mobile,
picture:picture}}).then(history.push('/Pilotcertificate'))
            
    };
return (
    <><div className="container">
        <div className="farmer-verifi-form">
        <h5>Pilot Information</h5>
        <p>Fill in the data for your profile</p>
    </div>
            <div className="register-form1">
                <Form>
                    <Form.Group className="mb-3" controlId="uname">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='uname'
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            aria-describedby="uname" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-describedby="email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name='address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            aria-describedby="address" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                            type="text"
                            name='mobile'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            aria-describedby="mobile" />
                    </Form.Group>
                    <p>upload the profile picture</p>
                    {picture && (
                        <Image className="img"
                            style={{ height: 80, width: 100, marginBottom: 20, borderRadius: '100%' }}
                            cloudName='dj3in4dua'
                            public_id={picture} />
                    )}
                    <input
                        type='file'
                        className='form-control'
                        name='userName'
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

export default Pilotinfo;