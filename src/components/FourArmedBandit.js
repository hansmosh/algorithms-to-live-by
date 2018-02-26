import React, { Component } from 'react';
import './FourArmedBandit.css';

const turns = 20;
const max = 90;
const min = 10;

class Machine extends Component {
  render() {
    const { chance, done, index, onPlay, playCount, winCount } = this.props;
    return (
      <div className="machine">
        <p>{winCount} / {playCount}</p>
        {done ?
          <p>{chance}%</p> :
          <button onClick={() => onPlay(index)}>Pull</button>
        }
      </div>
    );
  }
}

class FourArmedBandit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: [],
      playCounts: [0, 0, 0, 0],
      winCounts: [0, 0, 0, 0],
    }
    this.onPlay = this.onPlay.bind(this);
  }

  componentDidMount() {
    let machines = [];
    do {
      machines = [];
      for (let i = 0; i < 3; i++) {
        machines.push(Math.floor(Math.random() * (max - min) + min));
      }
      machines.push(200 - machines.reduce((sum, number) => sum + number));
    } while (machines[3] < min || machines[3] > max);
    this.setState({ machines });
  }

  onPlay(index) {
    const { machines, playCounts, winCounts } = this.state;
    let win = false;
    if (Math.random() * 100 <= machines[index]) {
      win = true;
    }
    this.setState({
      playCounts: playCounts.map((count, i) => i === index ? count + 1 : count),
      winCounts: winCounts.map((count, i) => i === index && win ? count + 1 : count),
    });
  }

  render() {
    const { machines, playCounts, winCounts } = this.state;
    const done = playCounts.reduce((sum, count) => sum + count) >= turns;
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Algorithms to Live By - Four-armed Bandit Problem</h1>
          <button onClick={() => this.props.chooseGame(1)}>Switch Game</button>
        </header>
        <p className="App-intro">
          Each slot machine has a set percent chance of winning between {min}% and {max}%, with the average machine being 50%. Try to win the most games with {turns} pulls.
        </p>
        {done ?
          <p>
            Result: {(
              winCounts.reduce((sum, count) => sum + count) /
              playCounts.reduce((sum, count) => sum + count) * 100).toFixed(1)}%,
            Expected Result: {(playCounts.reduce((result, count, i) => {
              return result + (count / turns * machines[i] / 100)
            }, 0.0) * 100).toFixed(1)}%
          </p> :
          <p>Pulls left: {turns - playCounts.reduce((sum, count) => sum + count)}</p>
        }
        <div className="machines">
          {machines.map((chance, index) => (
            <Machine
              key={index}
              chance={chance}
              done={done}
              index={index}
              onPlay={this.onPlay}
              playCount={playCounts[index]}
              winCount={winCounts[index]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default FourArmedBandit;
