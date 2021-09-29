import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../styles/TheArmory.jpg';

const Header = (props) => {
  useEffect(() => {}, [props]);

  return (
    <div className='header' style={{ height: 'auto' }}>
      <Container fluid>
        <Row>
          <Col xs={8}>
            <img
              className='logo'
              onClick={props.goHome}
              src={logo}
              alt='The Armory Logo'
            ></img>
          </Col>
          <Col xs={4}>
            {props.loggedIn ? (
              <h6 id='user-greeting'>Hi, {props.username}!</h6>
            ) : (
              <Button
                id='login-btn'
                variant='outline-dark'
                size='sm'
                onClick={props.showLogin}
              >
                Login
              </Button>
            )}
            {props.loggedIn ? (
              <Button
                id='sign-out-btn'
                size='sm'
                variant='outline-dark'
                onClick={props.onSignout}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                id='signup-btn'
                size='sm'
                variant='outline-dark'
                onClick={props.showSignUp}
              >
                Sign-up
              </Button>
            )}
            <Button
              id='favorite-btn'
              size='sm'
              variant='outline-dark'
              onClick={props.showFavorites}
            >
              Favorites
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
