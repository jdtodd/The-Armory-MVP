import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: props.favorites
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites !== this.props.favorites) {
      this.setState({ favorites: this.props.favorites })
    }
  }

  render() {
    return (
      <Container style={{marginTop: 30 + 'px', borderBottom: 2 + 'px solid black'}} fluid="xxl">
        {this.state.favorites.map((game, index) => {
          return (
            <div key={index}>
              <Row>
                <Col>
                  <h3 id="cover-image">{game.name}</h3>
                  <img src={game.image.medium_url} style={{width: 500 + 'px', height: 'auto'}}/>
                </Col>
                <Col md={{offset: 2}}>
                  <div>Release Date: {game.original_release_date}</div>
                  <div>{game.original_game_rating ? game.original_game_rating[0].name : null}</div>
                </Col>
                <Col>
                  <Button variant="outline-dark" onClick={() => {this.props.removeFromFavorites(game)}}>Remove from favorites</Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="game-description" dangerouslySetInnerHTML={{__html: game.description}}></div>
                </Col>
              </Row>
            </div>
          )
        })}
      </Container>
    )
  }
}

export default FavoritesList;