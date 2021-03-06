import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: props.gameList,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameList !== prevProps.gameList) {
      this.setState({ games: this.props.gameList });
    }
  }

  render() {
    return (
      <div style={{ marginTop: 30 + 'px' }}>
        {this.state.games.map((game, index) => {
          return (
            <div className='game-info' key={index}>
              <Container
                fluid='xxl'
                style={{
                  borderBottom: 2 + 'px solid #00FFCD',
                  paddingBottom: '20px',
                }}
              >
                <Row>
                  <Col>
                    <h3 id='cover-image'>{game.name}</h3>
                    <img
                      src={game.image.medium_url}
                      style={{ width: 500 + 'px', height: 'auto' }}
                    />
                  </Col>
                  <Col md={{ offset: 2 }}>
                    <div>Release Date: {game.original_release_date}</div>
                    <div>
                      {game.original_game_rating
                        ? game.original_game_rating[0].name
                        : null}
                    </div>
                  </Col>
                  <Col>
                    <Button
                      variant='outline-dark'
                      onClick={() => {
                        this.props.addToFavorites(game);
                      }}
                    >
                      Add To Favorites
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div
                      className='game-description'
                      dangerouslySetInnerHTML={{ __html: game.description }}
                    ></div>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })}
        {this.state.games.length > 1 ? (
          <div className='footer' style={{ mariginTop: 20 + 'px' }}>
            Game data provided by{' '}
            <a href='https://www.giantbomb.com/'>giantbomb.com</a>
          </div>
        ) : null}
      </div>
    );
  }
}

export default GameList;
