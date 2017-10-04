import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { upVotePost, downVotePost } from '../actions/posts'

class PostsList extends Component {

  handleVote = (direction, postId) => {
    if (direction === 'up') this.props.upVotePost(postId)
    else this.props.downVotePost(postId)
  }

  render() {
    let { posts, category } = this.props
    if (category) {
      posts = posts.filter(p => p.category === category)
    }

    return (
      <div className="posts-list">
        <ol>
          {posts.map(post => (
            <li>
              <Link to={`/post/view/${post.id}`}>
                Title: {post.title} 
              </Link>
              , Votes: {post.voteScore}
              <span onClick={() => this.handleVote('up', post.id)}> + </span> /
              <span onClick={() => this.handleVote('down', post.id)}> - </span>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps({ post }, ownProps) {
  console.log(post.posts)

  let category = ownProps.category

  return {
    posts: post.posts || [],
    category,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    upVotePost: postId => dispatch(upVotePost(postId)),
    downVotePost: postId => dispatch(downVotePost(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
