import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsSearch} from "react-icons/bs";
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {useHistory} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { logout } from '../../actions/auth';

export const Navbardrone=()=>{
  const {isAuthenticated,user} = useSelector(state=> (state.auth))
  const dispatch = useDispatch();

  const onsubmit1 =() => {
    dispatch(logout())
  };
    return (
      <><div >
        {isAuthenticated && isAuthenticated && user && user.role === 'farmer' ?
          <Navbar bg="dark" variant="dark" >
            <Container >

              <Navbar.Brand href="/Farmerprofile">Home</Navbar.Brand>
              <div className="nav-link">
                <Nav className="me-auto">
                  <Nav.Link href="/Dronebooking">Mybookings</Nav.Link>
                  <Nav.Link href="/Servicereport">ServiceReports</Nav.Link>
                  <Nav.Link href="/Farmselect">BookDrone</Nav.Link>
                  <Nav.Link onClick={() => onsubmit1()}>Logout</Nav.Link>
                </Nav>
              </div>
            </Container>
          </Navbar>
          : ''}
      </div><div>
          {isAuthenticated && isAuthenticated && user && user.role === 'pilot' ?
            <Navbar bg="dark" variant="dark">
              <Container>

                <Navbar.Brand href="/Pilotprofile">Home</Navbar.Brand>
                <div className="nav-link">
                  <Nav className="me-auto">
                    <Nav.Link onClick={() => onsubmit1()} >Logout</Nav.Link>

                  </Nav>
                </div>
              </Container>
            </Navbar> : ''}
        </div>
        <div>
          {isAuthenticated && isAuthenticated && user && user.role === 'admin' ?
            <Navbar bg="dark" variant="dark">
              <Container>

                <Navbar.Brand href="/Dronecatalog">Home</Navbar.Brand>
                <div className="nav-link">
                  <Nav className="me-auto">
                  <Nav.Link href="/Dronecatalog">Dronecatalog</Nav.Link>
                  <Nav.Link href="/Dronemanagement">Dronemanagement</Nav.Link>
                  <Nav.Link href="/Adminfleet">Dronetracking</Nav.Link>
                    <Nav.Link onClick={() => onsubmit1()} >Logout</Nav.Link>

                  </Nav>
                </div>
              </Container>
            </Navbar> : ''}
        </div>
        </>
          );
  };
  export default Navbardrone;