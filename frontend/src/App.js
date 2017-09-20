import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  fetchPosts
} from './actions/posts'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  //TODO: left off here.  how to get fetchPosts dispatched?  connect fn?  
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts())
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default connect()(App);
