import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { fetchPosts } from './actions/posts'
import { fetchCategories } from './actions/categories'
import logo from './logo.svg'
import './App.css'
import PostsPage from './components/PostsPage'
import ViewPostPage from './components/ViewPostPage'
import EditPostPage from './components/EditPostPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <PostsPage />} />
        <Route exact path="/:category/" component={PostsPage} />
        <Route exact path="/:category/:postId" component={ViewPostPage} />
        <Route path="/post/edit/:postId" component={EditPostPage}  />
        <Route path="/post/create/new/post" component={EditPostPage} />
      </div>
    )
  }
}

export default App
