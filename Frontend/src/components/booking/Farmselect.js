import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import './farmCard.css';
import { useSelector,useDispatch } from "react-redux";
import { getplots } from '../../actions/farm';
import {PLOT_SELECT} from '../../actions/types'

export const Farmselect = ({history}) => {
    const {plotdetails} = useSelector(state=>state.farm)
    const {user} = useSelector(state=>state.auth)
const dispatch =useDispatch();
  const userid= user&& user._id
  useEffect(() => {
   dispatch(getplots(userid))
  }, [history, userid]);

  const onNext = () =>{
    history.push('/bookdrone')
  }

  const onSaveplot = (_id,plotname,plot_type,plotimage,boundaries,userid,farmid) =>
  {
dispatch({type:PLOT_SELECT,
    payload:{
        _id:_id,
        plotname:plotname,
        plot_type:plot_type,
        plotimage:plotimage,
        boundaries:boundaries,
        userid:userid,
        farmid:farmid
    }
})
  }
    return (
        <><div className='titlefarm'>
            <h4>Step 1: Farmland selection</h4>
            <p>Please select the farmland you would like your drone service on.</p>
        </div><div className="farmCard" >
                <Row xs={1} md={2} className="g-4">
                {plotdetails && plotdetails.map((plot)=>(
                        <Col>
                            <Card className="farmCard1" style={{ width: '18rem' }} onClick={()=> onSaveplot(plot._id,plot.plotname,plot.plot_type,plot.plotimage,plot.boundaries,plot.userid,plot.farmid)}>
                                <Card.Img src={plot.plotimage} alt="Card image" width="150" height="180" />
                                <Card.ImgOverlay>
                                    <Card.Text>
                                        <p><b>{plot.plotname}</b></p>
                                    </Card.Text>
                                    <Card.Text><p><b>{plot.plot_type}</b></p></Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="farmbutton1">
        <button className="btn btn-primary" onClick={() => onNext()}>Next</button>
            </div>
            </div></>
      );
    }
export default Farmselect;