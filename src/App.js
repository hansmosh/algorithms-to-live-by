import React, { Component } from 'react';
import './App.css';
import Secretary from './components/Secretary';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Algorithms to Live By - Secretary Problem</h1>
        </header>
        <p className="App-intro">
          You want to hire a secretary and have 15 candidates. Upon seeing each candidate, you are
          able to unambiguously rank him against the previously seen candidates. At that point, you
          can offer the job or pass on the current candidate forever.
          <br/><br/>
          Try to choose the single best candidate.
        </p>
        <Secretary />
      </div>
    );
  }
}

export default App;
