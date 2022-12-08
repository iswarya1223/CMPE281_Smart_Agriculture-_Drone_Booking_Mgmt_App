import { Stepper, Step, StepLabel,StepButton } from "@material-ui/core";
import React, {Fragment,useEffect,useState} from 'react';
import { BsClock } from "react-icons/bs";
import './droneCard.css';
import { useSelector, useDispatch } from 'react-redux';
import {getBookings,getBookingdetail,makePayment}  from '../../actions/booking';
import moment from 'moment';
import { useParams} from "react-router-dom";
import {MdLocationOn,MdDateRange} from "react-icons/md";
import { useAlert } from "react-alert";
export const Bookingdetail = ({history}) =>
{
    const alert = useAlert();
    const dispatch =useDispatch();
    const {bookingdet} = useSelector(state=>state.dtdrone)
    const {user} = useSelector(state=>state.auth)
    const userid = user && user._id
    const status = bookingdet && bookingdet.status
    const [activestep,setActivestep]= useState(1)
    let {bookingid} = useParams();
    const  dbasecost =bookingdet && parseInt(bookingdet.serviceduration) * (bookingdet && bookingdet.payment && bookingdet.payment.baseprice)
    const  fdaycost = bookingdet && parseInt(bookingdet.serviceduration) * 10
    const  fservicecost =bookingdet && parseInt(bookingdet.serviceduration) * 10;
    const  fequip = bookingdet && bookingdet.payment && bookingdet.payment.equipment && bookingdet && parseInt(bookingdet.serviceduration) *10
    const shipping= 20
    const pcharge= bookingdet && parseInt(bookingdet.serviceduration) * 80;
    const onpayment = () =>
    {
        dispatch(makePayment(bookingdet && bookingdet._id)).then(()=>alert.success("Payment is Done successfully")).then(() =>dispatch(getBookings(userid))).then(() => history.push('/Servicereport'))

    }
    useEffect(() => {
        dispatch(getBookingdetail(bookingid))
      }, [bookingid]);
    
      useEffect(() => {
        if (status=== 'booked'){
            setActivestep(1)
        }
        if (status=== 'active'){
            setActivestep(3)
        }
        if (status=== 'finished' && bookingdet && bookingdet.payment.paystatus===true){
            alert.success("Payment Completed")
            dispatch(getBookings(userid)).then(() => history.push('/Servicereport'))
        }
    }, [status]);
    return (
        <Fragment>
            {(bookingdet && bookingdet.status) === 'booked' || (bookingdet && bookingdet.status) === 'active' ?
        <><div className='bookdronedet'>
            <h5>Service ID# {bookingdet && bookingdet._id}</h5>
        </div><div style={{ marginTop: 10, marginLeft: 450 }}>
                <Stepper orientation="vertical" activeStep={activestep}>
                    <Step>
                        <StepButton>Booked</StepButton>
                    </Step>
                    <Step>
                        <StepLabel> Pilot Confirmed</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Delivered</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Service Operation</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Service Completed</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Service Report Ready</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Payment</StepLabel>
                    </Step>
                </Stepper>
            </div>
            
            </> 
            : 
            <>
            <div className='booktitle'> 
                <p id='bookhead'>Make Payment</p>
                <p id='det1'>Review your total bill and pay</p>
            </div>
            <div className='contbook'>
                <p id='sum'>Summary</p>
                <img src={bookingdet && bookingdet.droneimage} alt='no imgfound'/>
                <p id='dronname'>{bookingdet && bookingdet.dronename}</p>
                <p id='sertype'>{bookingdet && bookingdet.servicetype}</p>
                <p id='location'><MdLocationOn size={16} /></p>
                <p id='add'>{bookingdet && bookingdet.plotdetails && bookingdet.plotdetails.farmaddress}, { bookingdet && bookingdet.plotdetails && bookingdet.plotdetails.farmcity}, {bookingdet && bookingdet.plotdetails && bookingdet.plotdetails.farmcountry}, {bookingdet  && bookingdet.plotdetails && bookingdet.plotdetails.farmzipcode},{bookingdet && bookingdet.plotdetails && bookingdet.plotdetails.plotname}: {bookingdet && bookingdet.plotdetails &&  bookingdet.plotdetails.plot_type}</p>
                <p id='daterange'><MdDateRange size={16}/></p>
               
                <p id='daybok'>{moment(bookingdet && bookingdet.startdate).format("L")} - {bookingdet && bookingdet.duration} day</p>
                <img id ='pimg' src={bookingdet && bookingdet.pilotid && bookingdet.pilotid.picture} alt='no imgfound'/>
                <p id ='dronepilot'>Drone Pilot</p>
                <p id ='pilotname'>{bookingdet && bookingdet.pilotid && bookingdet.pilotid.uname}</p>
                <p id ='plicense'>License#: {bookingdet && bookingdet.pilotid && bookingdet.pilotid.pilotlicense.licenseid}</p>
                <p id ='pphone'>Phone: {bookingdet && bookingdet.pilotid && bookingdet.pilotid.mobile}</p>
                <p id ='paddress'>Address: {bookingdet && bookingdet.pilotid && bookingdet.pilotid.address}</p>
            <div className='confirmbook'>
                <p>Drone Base Cost</p>
                <p id='price'>${(bookingdet && bookingdet.serviceduration) * (bookingdet && bookingdet.payment && bookingdet && bookingdet.payment.baseprice)}</p>
                <p id='line'></p>
                <p id='flight'>Fligts Per Day</p>
                <p id='time'>1* {bookingdet && bookingdet.starttime} - {bookingdet && bookingdet.endtime} PST Flight: Full Day</p>
                <p id='fprice'>${bookingdet && bookingdet.serviceduration * 10}</p>
                <p id='line1'></p>
                <p id='service'> Hourly Service Operations Per Day</p>
                <p id='type'>1* Data Collection - {bookingdet && bookingdet.plotdetails && bookingdet.plotdetails.plot_type} Health</p>
                <p id='sprice'>${bookingdet && bookingdet.serviceduration * 10}</p>
                <p id='line2'></p>
                <p id='servicedur'>Service Duration</p>
                <p id='type1'>{bookingdet && bookingdet.serviceduration} Day-On-Demand</p>
                <p id='sdprice'>*{bookingdet && bookingdet.serviceduration}</p>
                <p id='line3'></p>
                {bookingdet && bookingdet.payment && bookingdet.payment.equipment ?
                <><p id='equip'>Equipment</p><p id='type2'>{bookingdet && bookingdet.serviceduration} * {bookingdet && bookingdet.payment  && bookingdet.payment.equipment}</p><p id='eprice'>${bookingdet && bookingdet.serviceduration *10}</p></> : <><p id='equip'>Equipment</p><p id='type2'>(None)</p><p id='eprice'>$0</p></>
    }
                <p id='line4'></p>
                <p id='ship'>Shipping</p>
                <p id='type3'>Deliver drone to farm</p>
                <p id='shpprice'>$20</p>
                <p id='line5'></p>
                <p id='pilotc'>Pilot Charge</p>
                <p id='type4'>Drone setup and labor</p>
                <p id='pltprice'>${bookingdet && bookingdet.serviceduration * 80}</p>
                <p id='paym'>Payment method</p>
                <p id='carddet'>Card ending in {user.billinginfo.cardnumber.slice(15,19)}</p>
                <p id='tprice'>Total Price</p>
                <p id='tpriced'>${dbasecost + fdaycost + fservicecost+ fequip + shipping+ pcharge}</p>
                </div>
            </div><div className="dronebutton3">
    
                    <button className="btn btn-primary" style={{ backgroundColor: '#1A3447' }} onClick = {()=>onpayment()}>Make Payment</button>
                    </div></>
}
                </Fragment>
    )
}

export default Bookingdetail;