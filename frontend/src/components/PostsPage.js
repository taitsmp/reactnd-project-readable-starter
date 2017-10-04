import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostsList from './PostsList'
import CategoriesList from './CategoriesList'
import { fetchPosts } from '../actions/posts';
import { fetchCategories } from '../actions/categories';

class PostsPage extends Component {

    componentDidMount() {
        
        const { dispatch } = this.props;
        dispatch(fetchPosts());
        dispatch(fetchCategories());
      }

  render() {
    let { posts, category } = this.props
    console.log(posts)
    //console.log(this.props)

    return (
      <div className="posts-page">
        <CategoriesList />
        <PostsList category={category} />
      </div>
    )
  }
}

PostsPage.PropTypes = {}

function mapStateToProps({ post }, ownProps) {
  console.log(post.posts)
  let category = undefined
  if (ownProps.match && ownProps.match.params) category = ownProps.match.params.category
  console.log('category prop='+category)
  return {
    posts: post.posts,
    category,
  }
}

export default connect(mapStateToProps)(PostsPage)
