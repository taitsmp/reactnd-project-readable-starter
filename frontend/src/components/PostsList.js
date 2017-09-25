import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

//LEFT OFF HERE: add links to ViewPost
class PostsList extends Component {
  render() {
    let { posts } = this.props

    return (
      <div className="posts-list">
        <ol>
          {posts.map(post => (
            <li>
              {post.title}, {post.voteScore}
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps({ post }) {
  console.log(post.posts)
  return {
    posts: post.posts || [],
  }
}

export default connect(mapStateToProps)(PostsList)
