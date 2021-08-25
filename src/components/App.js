import React, { Component } from "react";
import ReactDOM from 'react-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      favorites: []
    };
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchbarInput = this.onSearchbarInput.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
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
    console.log(game)
    this.setState({favorites: [...this.state.favorites, game]})
  }

  removeFromFavorites(game) {
    console.log(game);
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

  render() {
    return (
      <div>
        <div className="header">
          <Container>
            <Row>
              <img className="logo" src={logo} alt="The Armory Logo"></img>
              <Col md={{offset: 5}}>
                <Button id="login-btn" variant="outline-dark" style={{marginRight: 20 + 'px'}}>Login</Button>
                <Button id="signup-btn" variant="outline-dark">Sign-up</Button>
              </Col>
              <Col>
                <Button id="favorites" variant="outline-dark" onClick={this.showFavorites}>Favorites</Button>
              </Col>
            </Row>
          </Container>
        </div>

          {!this.state.favoritesClicked ?
          <div>
            <div>
              <Form>
                <Form.Label>Search for your favorite game!</Form.Label>
                <Form.Control id="search-bar" type="text" placeholder="Game Title" onChange={this.onSearchbarInput}/>
                <Button variant="outline-dark" onClick={this.onSearchSubmit}>Search</Button>
              </Form>
            </div>
            <div>
              <GameList gameList={this.state.games} addToFavorites={this.addToFavorites}/>
            </div>
        </div>
        :
        <FavoritesList favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites}/>
        }

        <div className="footer" style={{mariginTop: 20 + 'px'}}>Game data provided by <a href="https://www.giantbomb.com/">giantbomb.com</a></div>
      </div>
    );
  }
}

