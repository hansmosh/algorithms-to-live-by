import React, { Component } from 'react';
import './App.css';
import Secretary from './components/Secretary';
import FourArmedBandit from './components/FourArmedBandit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: 2,
    }
    this.chooseGame = this.chooseGame.bind(this);
  }

  chooseGame(game) {
    this.setState({ game });
  }

  render() {
    const { game } = this.state;
    return (
      <div className="App">
        {game === 1 ?
          <Secretary chooseGame={this.chooseGame} /> :
          <FourArmedBandit chooseGame={this.chooseGame} />
        }
      </div>
    );
  }
}

export default App;
