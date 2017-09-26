import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class PostsList extends Component {
  render() {
    let { posts } = this.props

    return (
      <div className="posts-list">
        <ol>
          {posts.map(post => (
            <li>
              <Link to={`/post/view/${post.id}`}>
                {post.title}, {post.voteScore}
              </Link>
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
