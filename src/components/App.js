import React, { Component } from "react";
import ReactDOM from 'react-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import logo from '../styles/TheArmory.jpg';
import axios from 'axios';
import GameList from './GameList.jsx';
import FavoritesList from './FavoritesList.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      games: [],
      loggedIn: false,
      favoritesClicked: false,
      favorites: [],
      showSignUp: false,
      showLogin: false,
      userEmail: '',
      username: '',
      userPassword: '',
      userId: '',
    };
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchbarInput = this.onSearchbarInput.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.goHome = this.goHome.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.onCreateUser = this.onCreateUser.bind(this);
    this.onPasswordInput = this.onPasswordInput.bind(this);
    this.onUsernameInput = this.onUsernameInput.bind(this);
    this.onEmailInput = this.onEmailInput.bind(this);
  }

  onSearchbarInput(event) {
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit() {
    let searchTerm = '';
    for (var i = 0; i < this.state.searchTerm.length; i++) {
      if (this.state.searchTerm[i] === ' ') {
        searchTerm += '%20';
      } else {
        searchTerm += this.state.searchTerm[i];
      }
    }
    axios.get(`http://127.0.0.1:3000/game?searchTerm=${searchTerm}`)
      .then((response) => {
        this.setState({games: response.data});
      })
      .catch((err) => {
        console.error(err);
      })
  }

  addToFavorites(game) {
    this.setState({favorites: [...this.state.favorites, game]})
    axios.post(`http://127.0.0.1:3000/addToFavs`, {userId: this.state.userId, game: game})
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
        alert('There was a problem adding the game to your favorites list. Please try again.')
      })
  }

  removeFromFavorites(game) {
    var gameList = [];
    for (var i = 0; i < this.state.favorites.length; i++) {
      if (this.state.favorites[i] !== game) {
        gameList.push(this.state.favorites[i]);
      }
    }
    this.setState({favorites: gameList})
  }

  showFavorites() {
    this.setState({favoritesClicked: true})
  }

  goHome() {
    this.setState({
      games: [],
      searchTerm: '',
      favoritesClicked: false
    })
  }

  showSignUp() {
    this.setState({showSignUp: true})
  }

  showLogin() {
    this.setState({showLogin: true})
  }

  onPasswordInput(event) {
    this.setState({userPassword: event.target.value})
  }

  onUsernameInput(event) {
    this.setState({username: event.target.value})
  }

  onEmailInput(event) {
    this.setState({userEmail: event.target.value})
  }

  onCreateUser() {
    this.setState({showSignUp: false})
    axios.post(`http://127.0.0.1:3000/create?username=${this.state.username}&password=${this.state.userPassword}`)
      .then((res) => {
        this.setState({loggedIn: true, userId: res.data[0].id})
      })
      .catch((err) => {
        alert('We were unable to create your account. Please check the account details and try again.')
      })
  }

  render() {
    return (
      <div>
        <div className="header" style={{height: 75 + 'px'}}>
          <Container fluid>
            <Row>
              <Col md={{offset: .5}}>
                <img className="logo" onClick={this.goHome} src={logo} alt="The Armory Logo"></img>
              </Col>
              <Col md={{offset: 6}}>
                <Button className="button" id="login-btn" variant="outline-dark" onClick={this.showLogin}>Login</Button>
                <Button className="button" id="signup-btn" variant="outline-dark" onClick={this.showSignUp}>Sign-up</Button>
                <Button className="button" id="favorite-btn" variant="outline-dark" onClick={this.showFavorites}>Favorites</Button>
              </Col>
            </Row>
          </Container>
        </div>

          {!this.state.favoritesClicked ?
          <div id="main">
            <div>
              <Form>
                <Form.Label>Search for your favorite game!</Form.Label>
                <Form.Control size="sm" id="search-bar" type="text" placeholder="Game Title" onChange={this.onSearchbarInput} style={{display: 'inline-block', marginLeft: 20 + 'px', marginRight: 20 + 'px'}}/>
                <Button variant="outline-dark" onClick={this.onSearchSubmit}>Search</Button>
              </Form>
            </div>
            <Modal id="signup-modal" show={this.state.showSignUp}>
              <ModalHeader closeButton onHide={() => {this.setState({showSignUp: false})}}/>
              <ModalBody>
                <Form>
                  <Form.Group>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control size="sm" id="username" type="text" placeholder="Username" onChange={this.onUsernameInput}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control size="sm" id="password" type="password" placeholder="Password" onChange={this.onPasswordInput}/>
                  </Form.Group>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button id="create-user" variant="outline-dark" style={{marginTop: 20 + 'px'}} onClick={this.onCreateUser}>Create a new User</Button>
              </ModalFooter>
            </Modal>
            <Modal id="login-modal" show={this.state.showLogin}>
              <ModalHeader closeButton onHide={() => {this.setState({showLogin: false})}} />
              <ModalBody>
                <Form>
                  <Form.Group>
                    <Form.Control size="sm" id="username" type="text" placeholder="Username" onChange={this.onUsernameInput}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control size="sm" id="password" type="password" placeholder="Password" onChange={this.onPasswordInput}/>
                  </Form.Group>
                </Form>
              </ModalBody>
              <ModalFooter>
                  <Button id="login" variant="outline-dark" style={{marginTop: 20 + 'px'}}>Login</Button>
              </ModalFooter>
            </Modal>
            <div>
              <GameList gameList={this.state.games} addToFavorites={this.addToFavorites}/>
            </div>
        </div>
        :
        <FavoritesList favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites}/>
        }
      </div>
    );
  }
}

