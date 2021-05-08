/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from 'react';
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import Logo from './Logo/Logo';
import Searchbar from './Searchbar/Searchbar';

// import { authContext } from "../../context/AuthContext";

export default function Header(props) {
  const token = localStorage.getItem('token');
  let loggedIn;
  if (token) {
    loggedIn = true;
  }
  else {
    loggedIn = false;
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    props.showLogin(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    props.showSignup(true);
  };

  Header.propTypes = {
    showLogin: PropTypes.func.isRequired,
    showSignup: PropTypes.func.isRequired,
  };

  return (
    <header>
      <Row>
        <Col>
          <AppBar position="static" color="default" width="100%">
            <Toolbar variant="dense">
              <Col md={3} alignContent>
                <Logo />
              </Col>
              <Col md={6}>
                <div>
                  <Searchbar />
                </div>
              </Col>
              <Col md={3}>
                <Row>
                  {loggedIn ? (
                    <>
                      <p>test</p>
                      <p>test2</p>
                      <p>test3</p>
                    </>
                  ) : (
                    <>
                      <Col md={1.5}>
                        <Chip label="LOG IN" onClick={handleLogIn} />
                      </Col>
                      <Col>
                        <Chip label="SIGN UP" onClick={handleSignup} />
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Toolbar>
          </AppBar>
        </Col>
      </Row>
    </header>
  );
}
