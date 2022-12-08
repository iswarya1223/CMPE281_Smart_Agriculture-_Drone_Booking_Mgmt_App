/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React from 'react';
//import Reactdom from 'reactdom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbardrone from './components/layout/Navbardrone'
import  Register  from './components/auth/Register';
import  Login  from './components/auth/Login';
import Farmerprofile from './components/dashboard/Farmerprofile';
import Farmprofile from './components/dashboard/Farmprofile';
import { Fragment, useEffect } from 'react';
// import { Landing } from './components/layout/Landing';
import {Provider} from 'react-redux';
import store from './store';
import ProtectedRoute from './components/routing/PrivateRoute';
import { loadUser} from './actions/auth';
import {getfarmdetails} from './actions/farm';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {useSelector} from "react-redux";
import Searchbook from "./components/booking/Searchbook";
import Farmplotmap from "./components/dashboard/Farmplotmap";
import Farmplotinfo from "./components/dashboard/Farmplotinfo";
import Farmcertificate from "./components/dashboard/Farmcertificate";
import Farmerdrivinglic from "./components/dashboard/Farmerdrivinglic";
import Farmutilitybill from './components/dashboard/Farmutilitybill';
import Farmerbilling from './components/dashboard/Farmerbilling';
import Farmlandprofile from './components/dashboard/Farmlandprofile';
import Pilotbooking from './components/dashboard/Pilotbooking';
import Pilotprofile from './components/dashboard/Pilotprofile';
import Pilotinfo from './components/dashboard/Pilotinfo';
import Pilotcertificate from './components/dashboard/Pilotcertificate';
import ServiceRequestSelectFarmlandRootRoot1 from './components/booking/ServiceRequestSelectFarmlandRootRoot1'
import Farmselect from './components/booking/Farmselect';
import Dronecatalog from './components/admin/Dronecatalog';
import Adddrone from './components/admin/Adddrone';
import Dronemanagement from './components/admin/Dronemanagement';
import { Registerdrone } from './components/admin/Registerdrone';
import {Confirmbooking} from './components/booking/Confirmbooking';
import {Dronebooking} from './components/booking/Dronebooking';
import {Scheduleservice}  from './components/booking/Scheduleservice';
import {Bookingdetail} from './components/booking/Bookingdetail';
import {Servicereport} from './components/booking/Servicereport';
import Adminfleet from './components/admin/Adminfleet';
import Adminfleetdetail from './components/admin/Adminfleetdetail';
// import Footer from "./components/layout/Footer";
// if(localStorage.token){
//   setAuthToken(localStorage.token);
// }

const App = () => {
  const {isAuthenticated,user} = useSelector((state)=>state.auth);
  const userid =user && user._id
  useEffect(() => {

    store.dispatch(loadUser()).then(()=> store.dispatch(getfarmdetails(userid)))
  },[userid]);
  
  // return (
  //   <div className="App">
  //     <Navbar />
  //   <p>Hello</p>
  // </div>
  // );
  return (
 
  <Router>
      <Fragment>
      <Route exact path="/" component={Login} />
        <Navbardrone /> 
   
 
          {/* <ProtectedRoute exact path="/EditUser" component={EditUser} /> */} 
          <section className='container'>
          {/* <Alert /> */}
          <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/bookdrone" component={Searchbook} />
              <ProtectedRoute exact path="/Farmerprofile" component={Farmerprofile}/>
              <ProtectedRoute exact path="/Farmprofile" component={Farmprofile}/>
              <ProtectedRoute exact path="/Farmplotmap" component={Farmplotmap}/>
              <ProtectedRoute exact path="/Farmplotinfo" component={Farmplotinfo}/>
              <ProtectedRoute exact path="/Farmcertificate" component={Farmcertificate}/>
              <ProtectedRoute exact path="/Farmerdrivinglic" component={Farmerdrivinglic}/>
              <ProtectedRoute exact path="/Farmutilitybill" component={Farmutilitybill}/>
              <ProtectedRoute exact path="/Farmerbilling" component={Farmerbilling}/>
              <ProtectedRoute exact path="/Farmlandprofile" component={Farmlandprofile}/>
              <ProtectedRoute exact path="/Pilotbooking" component={Pilotbooking}/>
              <ProtectedRoute exact path="/Pilotprofile" component={Pilotprofile}/>
              <ProtectedRoute exact path="/Pilotinfo" component={Pilotinfo}/>
              <ProtectedRoute exact path="/Pilotcertificate" component={Pilotcertificate}/>
              <ProtectedRoute exact path="/Pilotdrivinglic" component={Farmerdrivinglic}/>
              <ProtectedRoute exact path="/Pilotbilling" component={Farmerbilling}/>
              <ProtectedRoute exact path="/Farmselect" component={Farmselect}/>
              <ProtectedRoute exact path="/Dronecatalog" component={Dronecatalog}/>
              <ProtectedRoute exact path="/Adddrone" component={Adddrone}/>
              <ProtectedRoute exact path="/Dronemanagement" component={Dronemanagement}/>
              <ProtectedRoute exact path='/Registerdrone' component={Registerdrone}/>
              <ProtectedRoute exact path='/Confirmbooking' component={Confirmbooking}/>
              <ProtectedRoute exact path='/Dronebooking' component={Dronebooking}/>
              <ProtectedRoute exact path='/Scheduleservice' component={Scheduleservice}/>
              <ProtectedRoute exact path='/Bookingdetail/:bookingid' component={Bookingdetail}/>
              <ProtectedRoute exact path='/Servicereport' component={Servicereport}/>
              <ProtectedRoute exact path='/Adminfleet' component={Adminfleet}/>
              <ProtectedRoute exact path='/Adminfleetdetail/:droneid' component={Adminfleetdetail}/>
            </Switch>
          </section>
      </Fragment>
 
  </Router>
  );
}
export default App;
