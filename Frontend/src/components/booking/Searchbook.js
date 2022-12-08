import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Spinner,Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from "react-datepicker";
//import PropertyCard from "./PropertyCard";
import { useNavigate } from 'react-router-dom';
//import {getDrones} from '../../actions/bookingAction';
import { Typeahead } from 'react-bootstrap-typeahead';
import "react-datepicker/dist/react-datepicker.css";
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import Slider from "@material-ui/core/Slider";
import { CardActions } from '@material-ui/core';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './droneCard.css'
import {searchDrone} from '../../actions/booking';
import { DRONE_SELECTION } from '../../actions/types';
export const Searchbook = ({history}) => {

    const dispatch = useDispatch();
    const [baseprice, setBasePrice] = useState([0,10000]);
    const [searchForm, setSearchForm] = useState({
        servicetype: '',
        brand:'',
        startDate: new Date(),
        endDate: new Date(),
        equipment:''
    });
    const {searchdronedet} = useSelector(state=>state.searchdrone)
    const {servicetype,brand,startDate,endDate,equipment} = searchForm;
    const onChange = e => setSearchForm({ ...searchForm, [e.target.name] : e.target.value});
    const onSavebooking = (startDate,endDate,equipment,_id,droneid,servicetype,dronename,droneimage,baseprice) =>
    {
      dispatch({type:DRONE_SELECTION,
        payload:{
            _id:_id,
            startdate:startDate,
            enddate:endDate,
            equipment:equipment,
            droneid:droneid,
            servicetype:servicetype,
            dronename:dronename,
            image:droneimage,
            baseprice:baseprice
        }
    })
    }
    const submit = () => {
        console.log(searchForm);
        dispatch(searchDrone(servicetype,brand,startDate,endDate,baseprice))
        //const temp = {
          //  ...searchForm,
        //};
        // place lowercase joining must be removed later
        //getDrones(dispatch, temp);
    }
    useEffect(() => {
      dispatch(searchDrone(servicetype,brand,moment(startDate).format('YYYY-MM-DD'),
      moment(endDate).format('YYYY-MM-DD'),baseprice))

    }, [servicetype, brand, startDate, endDate, baseprice]);
   
    const priceHandler = (event, newPrice,one) => {
        setBasePrice(newPrice);
      };
      const onBack =() =>{
history.push('/Farmselect')
      }
      const onNext = () =>
      {
history.push('/Scheduleservice')
      }
    return (
        <>
        <div className='schedhead'>
            <p id="shead">Step 2: Drone Catalog</p>
            <p id="sstart">select a service and choose a drone</p>
        </div>
        <div className="home container">
        <Row className="top_filter">
          <Col xs={2}>
            <select className="form-control" onChange={e => onChange(e)} name="servicetype" value={servicetype}>
              <option value=''>ServiceType</option>
              <option value="data collection">data collection</option>
              <option value="surveillance">surveillance</option>
              <option value="payload">payload</option>
            </select>
          </Col>
          <Col xs={2}>
            <Slider
              value={baseprice}

              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10000} />
          </Col>
          <Col xs={2}>
            <select className="form-control" onChange={e => onChange(e)} name="equipment" value={equipment}>
              <option value=''> Select Equipment</option>
              <option value="Camera">Camera</option>
              <option value="Thermal Camera">Thermal Camera</option>
              <option value="Super Camera">Super Camera</option>
            </select>
          </Col>
          <Col xs={2}>
            <DatePicker className="form-control" selected={searchForm.startDate} onChange={(date: Date) => setSearchForm({ ...searchForm, startDate: date })} minDate={moment().toDate()} />
          </Col>
          <Col xs={2}>
            <DatePicker className="form-control" selected={searchForm.endDate} onChange={(date: Date) => setSearchForm({ ...searchForm, endDate: date })} minDate={moment().toDate()} />
          </Col>
          <Col xs={2}>
            <select className="form-control" onChange={e => onChange(e)} name="brand" value={brand}>
              <option value=''> Select Brand</option>
              <option value="dji">dji</option>
              <option value="Agra">Agra</option>
              <option value="Phantom">Phantom</option>
            </select>
          </Col>
          {/* <Col xs={2}>
            <Button variant="outline-primary" style={{ width: '100%' }} onClick={() => submit()}>Submit</Button>
          </Col> */}
        </Row>
      </div>
      <div>
      <Row xs={1} md={4} className="g-4">
      {searchdronedet && searchdronedet.map((dronedt) => (
      <Col>
      <div className='dronecard'>
      <Card style={{ width: '15rem', height: '14rem', borderRadius:'30px'}} onClick={()=> onSavebooking(startDate, endDate,equipment,dronedt._id,dronedt.droneid,dronedt.servicetype,dronedt.dronename,dronedt.image,dronedt.baseprice)}>
     <Card.Body>
        <img variant="top" src={dronedt.image} alt='noimage found' width="60" height="60" />
          <Card.Text>
            <p><b>{dronedt.dronename}</b></p>
            </Card.Text>
            <Card.Text>
            <p><b>{dronedt.servicetype}</b></p>
            </Card.Text>
            <Card.Text>
            <p>ID# {dronedt.droneid}</p>
            </Card.Text>
           
            <Card.Text>
            <p>{dronedt.camera} Camera</p>
            </Card.Text>
            <Card.Text>
            <p>{dronedt.flightspeed} Flight Speed</p>
            </Card.Text>
            <Card.Text>
            <p>{dronedt.weight}</p>
          </Card.Text>
          <Card.Text>
            <p><b>{dronedt.baseprice} $ </b> / hour</p>
            </Card.Text>
            <Card.Text>
            </Card.Text>
          </Card.Body>
      </Card>
      </div>
      </Col>
        ))}
      </Row>
 
      <div className="dronebutton">
      <Row>
      <Col xs={6}>
      <button className="btn btn-primary" style={{backgroundColor:'#B9B9C3'}} onClick={() => onBack()}>Back</button>
      </Col>
      <Col xs={1}>
        <button className="btn btn-primary" style={{backgroundColor:'#1A3447'}} onClick={() => onNext()}>Next</button>
        </Col>
        </Row>
            </div>
          
        </div>
        </>
      );
      }

      export default Searchbook;