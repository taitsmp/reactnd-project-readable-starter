import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import { fetchPosts } from './actions/posts';
import { fetchCategories } from './actions/categories';
import logo from './logo.svg';
import './App.css';
import PostsPage from './components/PostsPage';
import ViewPostPage from './components/ViewPostPage';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }

  render() {
    return (

      <div className="App">
      <Route exact path='/' render={() => (
        <PostsPage />
      )} />
      <Route path="/post/view/:postId" render={() => (
        <ViewPostPage />
      )} />
      </div>
    );
  }
}

export default connect()(App);
