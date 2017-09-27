import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Utils from '../utils/utils'

import { fetchPosts, postComment } from '../actions/posts'
//import { fetchCategories } from '../actions/categories'

class ViewPostPage extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  handleAddComment = (event) => {
    let comment = {
      id: Utils.uuid()
    }
    this.props.postComment(comment)
  }

  render() {
    const { params } = this.props
    const post = this.props.post || {} //if empty show an error state. Coud use "defaultProps"
    console.log(post)
    return (
      <div className="view-post-page">
        <div>title: "{post.title}"</div>
        <div>author: {post.author}</div>
        <div>category: {post.category}</div>
        <div>body: {post.body}</div>

        <div><Link to="/">home</Link></div>
      </div>
    )
  }
}

function mapStateToProps({ post }, ownProps) {
  let posts = post.posts || []
  let params = ownProps.match.params || {}
  let postId = params.postId || -1

  console.log(ownProps)
  return {
    post: posts.find(p => p.id === postId),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    postComment: () => dispatch(postComment()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage)
