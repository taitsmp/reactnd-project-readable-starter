import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FaPencil from 'react-icons/lib/fa/pencil'
import PostsList from './PostsList'
import CategoriesList from './CategoriesList'
import { fetchPosts } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

class PostsPage extends Component {
  componentDidMount() {
    const { dispatch, posts } = this.props

    dispatch(fetchCategories())
    if (!posts) dispatch(fetchPosts())
  }

  render() {
    let { category } = this.props

    return (
      <div className="posts-page">
        <Link to="/post/create/new/post">
          <button className="icon-btn">
            <FaPencil /> Create a new Post
          </button>
        </Link>
        <CategoriesList />
        <PostsList category={category} />
        {category && (
          <div>
            <Link to="/">Go Home</Link>
          </div>
        )}
      </div>
    )
  }
}

PostsPage.PropTypes = {}

function mapStateToProps({ post }, ownProps) {
  let category = undefined
  if (ownProps.match && ownProps.match.params) category = ownProps.match.params.category
  return {
    posts: post.posts,
    category,
  }
}

export default connect(mapStateToProps)(PostsPage)
