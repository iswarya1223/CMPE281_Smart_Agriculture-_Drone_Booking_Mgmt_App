import React,{useState, useEffect} from "react";
import './farm.css';
import  {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import { Form, Button} from 'react-bootstrap';
import { Image } from 'cloudinary-react'
import {PILOT_CERTIFICATE } from "../../actions/types";

export const Pilotcertificate = ({ history }) => {
    const dispatch=useDispatch();
    const {user} = useSelector(state=>state.auth)
    const [certholder,setCertholder]=useState('')
    const [certid,setCertid]=useState('')
    const [certimage,setCertimage]=useState('')
    const [gender,setGender]=useState('')

    useEffect(() => {
      if (user && user.pilotcertinfo){
        setCertholder(user.pilotcertinfo.certholder);
        setCertid(user.pilotcertinfo.certid);
        setCertimage(user.pilotcertinfo.certimg);
        setGender(user.pilotcertinfo.gender);
      }
    }, [history,user ]);
    const onSubmitback = () =>
    {
        history.push('/Pilotinfo') 
    }
    const onSubmit = () => {
        //e.preventDefault();
        //console.log("HI");
        //return <Redirect to="/register" />;
        dispatch({type: PILOT_CERTIFICATE,
        payload:{certholder:certholder,
            certid:certid,
            certimage:certimage,
            gender:gender}}).then(history.push('/Pilotdrivinglic'))
            
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
        <h5>Pilot Information</h5>
        <p>Fill in more data regarding your pilot certification</p>
      </div>
          <div className="register-form1">
            <h6>Remote Pilot Certificate</h6>
            <Form>
              <Form.Group className="mb-3" controlId="certid">
                <Form.Label>Certificate ID number</Form.Label>
                <Form.Control
                  type="text"
                  name='certid'
                  value={certid}
                  onChange={(e) => setCertid(e.target.value)}
                  aria-describedby="certid" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="certholder">
                <Form.Label>Name Of Certificate Holder</Form.Label>
                <Form.Control
                  type="text"
                  name='certholder'
                  value={certholder}
                  onChange={(e) => setCertholder(e.target.value)}
                  aria-describedby="certholder" />
              </Form.Group>
              <Form.Group className="mb-3">
          <Form.Select name='role'
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      aria-describedby="role">
            <option value="null">Gender</option>
            <option value="female">female</option>
            <option value="male">male</option>
          </Form.Select>
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
            <div className="farmbtn_panel">
            <Button variant="primary" style={{ backgroundColor: '#B9B9C3' }}  onClick={() => onSubmitback()}>Back</Button>
            <Button variant="primary"  style={{backgroundColor:'#1A3447'}} onClick={() => onSubmit()}>Next</Button>

          </div>
          </div>
         
        </div></>
    )
}

export default Pilotcertificate;