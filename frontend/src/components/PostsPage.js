import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import CategoriesList from './CategoriesList';

class PostsPage extends Component {
  render() {
    let { posts } = this.props;
    console.log(posts);
    //console.log(this.props)

    return (
      <div className="posts-page">
        <CategoriesList />
        <PostsList />
      </div>
    );
  }
}

PostsPage.PropTypes = {};

function mapStateToProps({ post }) {
  //console.log(state)
  //console.log(state.post)
  console.log(post.posts);
  return {
    posts: post.posts,
  };
}

export default connect(mapStateToProps)(PostsPage);
