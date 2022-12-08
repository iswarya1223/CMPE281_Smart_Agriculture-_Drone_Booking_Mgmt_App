import React, { Fragment,useState } from 'react';
import {MdLocationOn,MdDateRange} from "react-icons/md";
import {Form, Button,Row, Col} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import moment from 'moment';
import { SERVICE_TIME } from '../../actions/types';
import {assignPilot} from '../../actions/booking';
import './droneCard.css'

export const Scheduleservice = ({history}) =>
{
    const dispatch = useDispatch();
    
const {plotselect} = useSelector(state=>state.plotsave)
const {farmdetails}= useSelector(state=>state.farm)
const {droneselect} = useSelector(state=> state.searchdrone)
const duration = moment(droneselect && droneselect.enddate).diff(moment(droneselect && droneselect.startdate), 'days') +1
console.log(duration)
const [starttime,setStarttime] = useState('')
const [endtime,setEndtime] = useState('')
const onSubmit =() =>
    {
        dispatch({type:SERVICE_TIME,
            payload:{
                starttime: starttime,
                endtime: endtime,
                duration:duration
            }
        })
        dispatch(assignPilot(droneselect && moment(droneselect.startdate).format('YYYY-MM-DD'),droneselect && moment(droneselect.enddate).format('YYYY-MM-DD'))).then(()=>history.push('/Confirmbooking'))
        //.then(()=>history.push('/Confirmbooking'))
    }
const onSubmitback =() =>
{
    history.push('/bookdrone') 
}
    return (

        <><div className='schedhead1'>
            <p id="shead">Step 3: Schedule Service</p>
            <p id="sstart">select a start time and end time for the service</p>
        </div><div className='schedservice'>
            <div style={{"margin-left":"12px","margin-top":"10px","font-family": 'Inter',
"font-style": 'normal'}}>
            <Fragment>
                {plotselect && 
                <><p><b>Farm:</b>{farmdetails && farmdetails.farmaddress}, {farmdetails &&farmdetails.farmcity}, {farmdetails &&farmdetails.farmcountry}, {farmdetails &&farmdetails.farmzipcode}</p>
                <p><b>Farmland:</b>{plotselect.plotname}: {plotselect.plot_type}</p>
                <p><b>Service:</b>{droneselect && droneselect.servicetype}</p><p><b>duration:</b> {duration} Day</p></>
}
                </Fragment>
                <div className='schedform'>
                <Form>
                <Form.Group className="mb-3" controlId="starttime">
                        <Form.Label><b>Start Time:</b></Form.Label>
                        <Form.Control
                            type="text"
                            name='starttime'
                            value={starttime}
                      onChange={(e) => setStarttime(e.target.value)}
                            aria-describedby="starttime" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="endtime">
                        <Form.Label><b>End Time:</b></Form.Label>
                        <Form.Control
                            type="endtime"
                            name='endtime'
                            value={endtime}
                      onChange={(e) => setEndtime(e.target.value)}
                            aria-describedby="endtime" />
                    </Form.Group>
                </Form>
                </div>
                <div>
</div>
                </div>
            </div>
            <div className="dronebutton">
<Row>
    <Col xs={7}>
                <button className="btn btn-primary" style={{ backgroundColor: '#B9B9C3' }} onClick={()=>onSubmitback()} >Back</button>
                </Col>
                <Col xs={1}>
                <button className="btn btn-primary" style={{ backgroundColor: '#1A3447' }} onClick={onSubmit}> Confirm</button>
                </Col>
                </Row>
            </div>
            </>
    )};
export default Scheduleservice;
