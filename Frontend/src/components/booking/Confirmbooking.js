import React from 'react';
import {MdLocationOn,MdDateRange} from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'; 
import {saveBooking} from '../../actions/booking'
import {Row,Col}  from 'react-bootstrap';
export const Confirmbooking = ({history}) =>
{

    const dispatch = useDispatch();
    const {pilotselect} = useSelector(state=>state.searchdrone)
    const {droneselect} = useSelector(state=>state.searchdrone)
    const {dronetimeselect} = useSelector(state=>state.searchdrone)
    const {plotselect} = useSelector(state=>state.plotsave)
    const {farmdetails}= useSelector(state=>state.farm)
    const {user} = useSelector(state=>state.auth)
    const  dbasecost =dronetimeselect && parseInt(dronetimeselect.duration) * (droneselect && droneselect.baseprice)
    const  fdaycost = dronetimeselect && parseInt(dronetimeselect.duration) * 10
    const  fservicecost =dronetimeselect && parseInt(dronetimeselect.duration) * 10;
    const  fequip = droneselect && droneselect.equipment && dronetimeselect && parseInt(dronetimeselect.duration) *10
    const shipping= 20
    const pcharge= dronetimeselect && parseInt(dronetimeselect.duration) * 80;
    const onSubmitnext = () =>
    {
        history.push('/Scheduleservice')
    }

    const onSubmit = () =>
    {
        dispatch(saveBooking(new Date(),moment(droneselect.startdate).format('YYYY-MM-DD'),moment(droneselect.enddate).format('YYYY-MM-DD'),droneselect.droneid,
        droneselect.dronename,droneselect.image,
        pilotselect._id,user._id,dronetimeselect.starttime,dronetimeselect.endtime,
        {plot_type:plotselect.plot_type,
    plotname:plotselect.plotname,
plotimage:plotselect.image,
plotboundaries:plotselect.boundaries,
farmid:plotselect.farmid,
farmaddress:farmdetails.farmaddress,
farmcity:farmdetails.farmcity,
farmcountry:farmdetails.farmcountry,
farmzipcode:farmdetails.farmzipcode}, 
{baseprice:droneselect.baseprice,equipment:droneselect.equipment,shipping:20,pilotcharge:pcharge,paystatus:false},
droneselect.servicetype, dronetimeselect.duration,'booked')).then(()=>history.push('/Dronebooking'))
    }
    return (
        <>
        <div className='booktitle'> 
            <p id='bookhead'>Step 4: Confirm Booking</p>
            <p id='det1'>Please confirm your selected service details your estimated cost is below</p>
        </div>
        <div className='contbook'>
            <p id='sum'>Summary</p>
            <img src={droneselect && droneselect.image} alt='no imgfound'/>
            <p id='dronname'>{droneselect && droneselect.dronename}</p>
            <p id='sertype'>{droneselect && droneselect.servicetype}</p>
            <p id='location'><MdLocationOn size={16} /></p>
            <p id='add'>{farmdetails && farmdetails.farmaddress}, {farmdetails &&farmdetails.farmcity}, {farmdetails &&farmdetails.farmcountry}, {farmdetails &&farmdetails.farmzipcode},{plotselect && plotselect.plotname}: {plotselect && plotselect.plot_type}</p>
            <p id='daterange'><MdDateRange size={16}/></p>
           
            <p id='daybok'>{moment(droneselect && droneselect.startdate).format("L")} - {dronetimeselect && dronetimeselect.duration} day</p>
            <img id ='pimg' src={pilotselect && pilotselect.picture} alt='no imgfound'/>
            <p id ='dronepilot'>Drone Pilot</p>
            <p id ='pilotname'>{pilotselect && pilotselect.uname}</p>
            <p id ='plicense'>License#: {pilotselect && pilotselect.pilotlicense.licenseid}</p>
            <p id ='pphone'>Phone: {pilotselect && pilotselect.mobile}</p>
            <p id ='paddress'>Address: {pilotselect && pilotselect.address}</p>
        <div className='confirmbook'>
            <p>Drone Base Cost</p>
            <p id='price'>${(dronetimeselect && dronetimeselect.duration) * (droneselect && droneselect.baseprice)}</p>
            <p id='line'></p>
            <p id='flight'>Fligts Per Day</p>
            <p id='time'>1* {dronetimeselect && dronetimeselect.starttime} - {dronetimeselect && dronetimeselect.endtime} PST Flight: Full Day</p>
            <p id='fprice'>${dronetimeselect && dronetimeselect.duration * 10}</p>
            <p id='line1'></p>
            <p id='service'> Hourly Service Operations Per Day</p>
            <p id='type'>1* Data Collection - {plotselect && plotselect.plot_type} Health</p>
            <p id='sprice'>${dronetimeselect && dronetimeselect.duration * 10}</p>
            <p id='line2'></p>
            <p id='servicedur'>Service Duration</p>
            <p id='type1'>{dronetimeselect && dronetimeselect.duration} Day-On-Demand</p>
            <p id='sdprice'>*{dronetimeselect && dronetimeselect.duration}</p>
            <p id='line3'></p>
            {droneselect && droneselect.equipment ?
            <><p id='equip'>Equipment</p><p id='type2'>{dronetimeselect && dronetimeselect.duration} * {droneselect && droneselect.equipment}</p><p id='eprice'>${dronetimeselect && dronetimeselect.duration*10}</p></> : <><p id='equip'>Equipment</p><p id='type2'>(None)</p><p id='eprice'>$0</p></>
}
            <p id='line4'></p>
            <p id='ship'>Shipping</p>
            <p id='type3'>Deliver drone to farm</p>
            <p id='shpprice'>$20</p>
            <p id='line5'></p>
            <p id='pilotc'>Pilot Charge</p>
            <p id='type4'>Drone setup and labor</p>
            <p id='pltprice'>${dronetimeselect && dronetimeselect.duration * 80}</p>
            <p id='paym'>Payment method</p>
            <p id='carddet'>Card ending in {user.billinginfo.cardnumber.slice(15,19)}</p>
            <p id='tprice'>Total Price</p>
            <p id='tpriced'>${dbasecost + fdaycost + fservicecost+ fequip + shipping+ pcharge}</p>
            </div>
        </div>
        <div className="dronebutton1">
        <Row>
    <Col xs={6}>
                <button className="btn btn-primary" style={{ backgroundColor: '#B9B9C3' }} onClick = {()=>onSubmitnext()}>Back</button>
    </Col>
       <Col xs={2}>
                <button className="btn btn-primary" style={{ backgroundColor: '#1A3447' }} onClick = {()=>onSubmit()}> Confirm</button>
                </Col>
                </Row>
                </div>
            </>
    )
}

export default Confirmbooking;