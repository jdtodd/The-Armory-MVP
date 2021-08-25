import React, { Component } from "react";
import ReactDOM from 'react-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../styles/TheArmory.jpg';
import axios from 'axios';
import GameList from './GameList.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      games: []
    };
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchbarInput = this.onSearchbarInput.bind(this);
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
  render() {
    return (
      <div>
        <div className="header">
          <img className="logo" src={logo} alt="The Armory Logo"></img>
          <Button id="login-btn" variant="outline-dark">Login</Button>
          <Button id="signup-btn" variant="outline-dark">Sign-up</Button>
        </div>
        <div>
          <Form>
            <Form.Label>Search for your favorite game!</Form.Label>
            <Form.Control id="search-bar" type="text" placeholder="Game Title" onChange={this.onSearchbarInput}/>
            <Button variant="outline-dark" onClick={this.onSearchSubmit}>Search</Button>
          </Form>
        </div>
        <div>
          <GameList gameList={this.state.games}/>
        </div>
        <div className="footer">Game data provided by <a href="https://www.giantbomb.com/">giantbomb.com</a></div>
      </div>
    );
  }
}

