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
import {getplots} from '../../actions/farm';
const Farmlandprofile = ({ history }) => {

  const {plotdetails} = useSelector(state=>state.farm)
  const [plotdis,setPlotdis]=useState({
    plotname: '',
    plot_type: '',
    plotimage: '',
    boundaries: [],
})
  const onSubmit =() =>{
    history.push('/Farmplotinfo')
  }
  const onPlotdisplay =(plotname,plotimage,plot_type,boundaries) =>
  {
   let updatedValue= {plotname:plotname,plot_type:plot_type,plotimage:plotimage,boundaries:boundaries};
setPlotdis(plotdis => ({
  ...plotdis,
  ...updatedValue
}));

  }
  const {user} = useSelector(state=>state.auth)
const dispatch =useDispatch();
  const userid= user&& user._id
  useEffect(() => {
   dispatch(getplots(userid))
  }, [history]);
  useEffect(() => {
    if (plotdetails && plotdetails[0]){
    let updatedValue= {plotname:plotdetails[0].plotname,plot_type:plotdetails[0].plot_type,plotimage:plotdetails[0].plotimage,boundaries:plotdetails[0].boundaries};
    setPlotdis(plotdis => ({
      ...plotdis,
      ...updatedValue
    }));
  }
   }, [history, plotdetails])
     
    return (
        <>
        <div className="profile-button2">
          <Row>
            <Col>
              <button className="btn btn-primary" onClick={()=> onSubmit()}>Add Another Plot</button>
            </Col>
          </Row>
        </div>
        {plotdetails && plotdetails.map((plot)=>(
        <div className="profile-button2">
          <Row>
            <Col>
              <button className="btn btn-primary" onClick={() => onPlotdisplay(plot.plotname,plot.plotimage,plot.plot_type,plot.boundaries)}>{plot.plotname}</button>
            </Col>
          </Row>
        </div>
        ))}
      <div className='Container'>
      {plotdis && plotdis.plotname && plotdis.plot_type && plotdis.plotimage && plotdis.boundaries ?
      <div className='Farm-land-profile'>     
 <div><b>{plotdis.plotname}</b></div>
 <div>
  </div>
  <div>
 <img src={plotdis.plotimage} alt="cropimage" width="250" height="150"></img>
 </div>
 <div>
  <p><b>Plot Type:</b> {plotdis.plot_type}</p>
 </div>
 <div><p><b>Map Boundaries </b>(Latitude, Longitute):</p>
 <p><b>Top-left Corner:</b> ({plotdis.boundaries[0].lat},{plotdis.boundaries[0].lng})</p>
 <p><b>Top-right Corner:</b> ({plotdis.boundaries[1].lat},{plotdis.boundaries[1].lng})</p>
 <p><b>Bottom-left Corner:</b>({plotdis.boundaries[2].lat},{plotdis.boundaries[2].lng})</p>
 <p><b>Bottom-right Corner:</b>({plotdis.boundaries[3].lat},{plotdis.boundaries[3].lat})</p>
 </div>
        </div>
: ''}</div></>
    )
}

export default Farmlandprofile;