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
import "./billing.css";
import { addbilling } from "../../actions/farm";
import {addpilotprofile}  from "../../actions/auth"
const Farmerbilling = ({ history }) => {
	const {user} = useSelector(state => state.auth)
	const userid = user && user._id
	const dispatch= useDispatch();
	const {pilotdetails,pilotcert,pilotdrivelic} = useSelector(state=>state.pilotsave)
    const [bilname,setBilname]=useState('')
const [cardnum,setCardnum]=useState('')
const [expirydt,setExpirydt]=useState('')
const [cvv,setCvv]=useState('')

useEffect(() => {
	if (user && user.billinginfo){
		setBilname(user.billinginfo.nameoncard);
		setCardnum(user.billinginfo.cardnumber);
		setExpirydt(user.billinginfo.expiration);
		setCvv(user.billinginfo.cvv);
	}
  }, [history,user ]);
const onSubmit = () => {
    //e.preventDefault();
    //console.log("HI");
    //return <Redirect to="/register" />;
    //dispatch(Farmerbilling({bilname:bilname,cardnum:cardnum,expirydt:expirydt,cvv:cvv})).
	
	if (user && user.role === 'farmer'){
		dispatch(addbilling(userid,{nameoncard:bilname,cardnumber:cardnum,expiration:expirydt,cvv:cvv})).then(()=>dispatch(loadUser())).then(history.push('/Farmerprofile'))
	}
	if (user && user.role === 'pilot')
		{
			if (pilotdetails && pilotcert && pilotdrivelic){ 
			dispatch(addpilotprofile(pilotdetails.uname,pilotdetails.email,pilotdetails.address,pilotdetails.mobile,pilotdetails.picture,
				{certholder:pilotcert.certholder,
					certid:pilotcert.certid,
					certimg:pilotcert.certimage,
					gender:pilotcert.gender},{licenseid:pilotdrivelic.pilotlicense,
						licensename:pilotdrivelic.licensename,
						licenseimg:pilotdrivelic.licenseimg},{nameoncard:bilname,cardnumber:cardnum,expiration:expirydt,cvv:cvv})).then(()=>dispatch(loadUser())).then(history.push('/Pilotprofile'))
}
else{
	history.push('/Pilotinfo')
}
 }

  };

    return (
        <div className='billing'>
        
        <div class="tabs mt-3"> 
        <h5> Billing Details</h5>
            <ul class="nav nav-tabs" id="myTab" role="tablist"> 
            
                <li class="nav-item" role="presentation"> 
                    <a class="nav-link active" id="visa-tab" data-toggle="tab" href="#visa" role="tab" aria-controls="visa" aria-selected="true"> 
                    <img src="https://i.imgur.com/sB4jftM.png" width="80"/> </a> 
                    </li>
							</ul> 
							<div class="tab-content" id="myTabContent"> <div class="tab-pane fade show active" id="visa" role="tabpanel" aria-labelledby="visa-tab"> 
							<div class="mt-4 mx-4"> 
							<div class="text-center"> 
							<h3>Credit card</h3> 
							</div> 
							<div class="form mt-3"> 
							<div class="inputbox"> 
							<input type="text" name="bilname" value={bilname} onChange={(e) => setBilname(e.target.value)} class="form-control" required="required"/> 
							<span>Cardholder Name</span> 
							</div> 
							<div class="inputbox"> 
							<input type="text" name="name" min="1" max="999" value={cardnum} onChange={(e) => setCardnum(e.target.value)} class="form-control" required="required"/> 
							<span>Card Number</span> 
							<i class="fa fa-eye"></i> 
							</div> 
							<div class="d-flex flex-row"> 
							<div class="inputbox"> 
							<input type="text" name="name" min="1" max="999" class="form-control" value={expirydt} onChange={(e) => setExpirydt(e.target.value)} required="required"/> 
							<span>Expiration Date(mm/yy)</span> 
							</div> 
							<div class="inputbox"> 
							<input type="text" name="name" min="1" max="999" class="form-control" value={cvv} onChange={(e) => setCvv(e.target.value)} required="required"/> 
							<span>CVV</span> 
							</div> 
							</div> 
							<div class="px-5 pay"> 
                            <Button variant="primary"  style={{backgroundColor:'#1A3447'}} onClick={() => onSubmit()}>Add Card</Button>
							</div> 
							</div> 
							</div> 
							</div> 
                            </div>
                            </div>
                            </div>
    )
}
export default Farmerbilling;