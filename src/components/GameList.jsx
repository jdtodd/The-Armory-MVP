import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: props.gameList
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({games: this.props.gameList})
    }
  }

  render() {
    return (
      <div>
        {this.state.games.map((game, index) => {
          return (
            <div key={index}>
              <Container fluid="xl">
                <Row>
                  <Col>
                    <h3 id="cover-image">{game.name}</h3>
                    <img src={game.image.medium_url} />
                  </Col>
                  <Col>
                    <p>Release Date: {new Date(game.original_release_date)}</p>
                  </Col>
                </Row>
                <Row>
                    <Col>
                      <div className="game-description" dangerouslySetInnerHTML={{__html: game.description}}></div>
                    </Col>
                </Row>
              </Container>
            </div>
          )
        })}
      </div>
    )
  }
}

export default GameList;