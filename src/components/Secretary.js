import React, { Component } from 'react';
import './Secretary.css';

class Candidate extends Component {
  render() {
    const { candidates, current, done, index, number } = this.props;
    const status = index === current ? 'current' : done || index < current ? 'seen' : 'remain';
    const relativeNumber = done ? number
      : candidates.slice(0, current + 1).sort((a, b) => a - b).indexOf(number) + 1;
    return (
      <div className={"candidate " + status}>
        {relativeNumber}
      </div>
    );
  }
}

class Secretary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      current: 0,
      done: false,
    }
    this.onNext = this.onNext.bind(this);
    this.onChoose = this.onChoose.bind(this);
  }

  componentDidMount() {
    const ordered = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const candidates = [];
    while (ordered.length > 0) {
      const i = Math.floor(Math.random() * ordered.length);
      candidates.push(ordered[i]);
      ordered.splice(i, 1);
    }
    this.setState({ candidates });

  }

  onNext() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  onChoose() {
    this.setState({ done: true });
  }

  render() {
    const { candidates, current, done } = this.state;
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Algorithms to Live By - Secretary Problem</h1>
          <button onClick={() => this.props.chooseGame(2)}>Switch Game</button>
        </header>
        <p className="App-intro">
          You want to hire a secretary and have 15 candidates. Upon seeing each candidate, you are able to unambiguously rank him against the previously seen candidates. At that point, you can offer the job or pass on the current candidate forever. Try to choose the single best candidate.
        </p>
        <button onClick={this.onNext}>Next</button>
        <button onClick={this.onChoose}>Choose</button>
        <div className="candidates">
          {candidates.map((number, index) => (
            <Candidate
              key={number}
              candidates={candidates}
              current={current}
              done={done}
              number={number}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Secretary;
