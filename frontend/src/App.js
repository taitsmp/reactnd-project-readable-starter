import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from './actions/posts';
import { fetchCategories } from './actions/categories';
import logo from './logo.svg';
import './App.css';
import PostsPage from './components/PostsPage';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }

  render() {
    return (
      <div className="App">
        <PostsPage />
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
