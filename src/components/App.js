import React, { Component } from 'react';
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
import Alert from 'react-bootstrap/Alert';
import logo from '../styles/TheArmory.jpg';
import axios from 'axios';
import Header from './Header.jsx';
import GameList from './GameList.jsx';
import FavoritesList from './FavoritesList.jsx';
import SignUpModal from './SignUpModal.jsx';
import SignInModal from './SignInModal.jsx';

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
      signInFail: false,
      signInSuccess: false,
      signUpFail: false,
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
    this.onLogin = this.onLogin.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  onSearchbarInput(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(e) {
    e.preventDefault();
    let searchTerm = '';
    for (var i = 0; i < this.state.searchTerm.length; i++) {
      if (this.state.searchTerm[i] === ' ') {
        searchTerm += '%20';
      } else {
        searchTerm += this.state.searchTerm[i];
      }
    }
    axios
      .get(`http://127.0.0.1:3000/game?searchTerm=${searchTerm}`)
      .then((response) => {
        this.setState({ games: response.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addToFavorites(game) {
    this.setState({ favorites: [...this.state.favorites, game] });
    if (this.state.loggedIn) {
      axios
        .post(`http://127.0.0.1:3000/addToFavs`, {
          userId: this.state.userId,
          game: game,
        })
        .then((res) => {})
        .catch((err) => {
          console.error(err);
          alert(
            'There was a problem adding the game to your favorites list. Please try again.'
          );
        });
    }
  }

  removeFromFavorites(game) {
    var gameList = [];
    for (var i = 0; i < this.state.favorites.length; i++) {
      if (this.state.favorites[i] !== game) {
        gameList.push(this.state.favorites[i]);
      }
    }
    this.setState({ favorites: gameList });
  }

  showFavorites() {
    this.setState({ favoritesClicked: true });
  }

  goHome() {
    this.setState({
      games: [],
      searchTerm: '',
      favoritesClicked: false,
    });
  }

  showSignUp() {
    this.setState({ showSignUp: true });
  }

  showLogin() {
    this.setState({ showLogin: true });
  }

  onPasswordInput(event) {
    this.setState({ userPassword: event.target.value });
  }

  onUsernameInput(event) {
    this.setState({ username: event.target.value });
  }

  onEmailInput(event) {
    this.setState({ userEmail: event.target.value });
  }

  onCreateUser() {
    this.setState({ showSignUp: false });
    axios
      .post(
        `http://127.0.0.1:3000/create?username=${this.state.username}&password=${this.state.userPassword}`
      )
      .then((res) => {
        this.setState({ loggedIn: true, userId: res.data[0].id });
        if (this.state.favorites.length > 0) {
          for (let i = 0; i < this.state.favorites.length; i++) {
            axios.post('/addToFavs', {
              userId: res.data[0].id,
              game: this.state.favorites[i],
            });
          }
        }
      })
      .catch((err) => {
        this.setState({ signUpFail: true });
      });
  }

  onLogin() {
    this.setState({ showLogin: false });
    axios
      .post('http://127.0.0.1:3000/login', {
        username: this.state.username,
        password: this.state.userPassword,
      })
      .then((res) => {
        let returnedFavs = res.data.favoritesList.map((game, idx) => {
          return JSON.parse(game.game);
        });
        this.setState({
          userId: res.data.userInfo[0].id,
          signInSuccess: true,
          favorites: [...returnedFavs],
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ signInFail: true });
      });
  }

  onSignout() {
    this.setState({
      loggedIn: false,
      favoritesClicked: false,
      favorites: [],
      showSignUp: false,
      showLogin: false,
      userEmail: '',
      username: '',
      userPassword: '',
      userId: '',
      signInFail: false,
      signInSuccess: false,
    });
  }

  render() {
    return (
      <div>
        <Header
          goHome={this.goHome}
          onSearchbarInput={this.onSearchbarInput}
          onSearchSubmit={this.onSearchSubmit}
          username={this.state.username}
          showLogin={this.showLogin}
          onSignout={this.onSignout}
          showSignUp={this.showSignUp}
          showFavorites={this.showFavorites}
          loggedIn={this.state.loggedIn}
        />
        <div>
          {this.state.signInFail ? (
            <Alert
              variant='danger'
              dismissible
              closeLabel=''
              onClose={() => {
                this.setState({ signInFail: false });
              }}
            >
              There was a problem signing into your account. Please check your
              account details and try again.
            </Alert>
          ) : this.state.signInSuccess ? (
            <Alert
              variant='success'
              dismissible
              closeLabel=''
              onClose={() => {
                this.setState({ signInSuccess: false });
              }}
            >
              Signed in successfully
            </Alert>
          ) : this.state.signUpFail ? (
            <Alert
              variant='danger'
              closeLabel=''
              dismissible
              onClose={() => {
                this.setState({ signUpFail: false });
              }}
            >
              We were unable to create your account. There is already another
              user with that username.
            </Alert>
          ) : null}
        </div>

        {!this.state.favoritesClicked ? (
          <div id='main'>
            <Form>
              <Form.Control
                size='sm'
                id='search-bar'
                type='text'
                placeholder='Search for your favorite game!'
                onChange={this.onSearchbarInput}
                onKeyPress={(e) => {
                  e.key === 'Enter' && props.onSearchSubmit(e);
                }}
                style={{
                  display: 'inline-block',
                  marginRight: 20 + 'px',
                }}
              />
              <Button
                id='search-button'
                variant='outline-dark'
                onClick={this.onSearchSubmit}
                size='sm'
                style={{ display: 'inline-block' }}
              >
                Search
              </Button>
            </Form>
            <div>
              <GameList
                gameList={this.state.games}
                addToFavorites={this.addToFavorites}
              />
            </div>
          </div>
        ) : (
          <FavoritesList
            favorites={this.state.favorites}
            removeFromFavorites={this.removeFromFavorites}
          />
        )}
        <SignUpModal
          showSignUp={this.state.showSignUp}
          onUsernameInput={this.onUsernameInput}
          onPasswordInput={this.onPasswordInput}
          onCreateUser={this.onCreateUser}
        />
        <SignInModal
          showSignIn={this.state.showLogin}
          onUsernameInput={this.onUsernameInput}
          onPasswordInput={this.onPasswordInput}
          onLogin={this.onLogin}
        />
      </div>
    );
  }
}
