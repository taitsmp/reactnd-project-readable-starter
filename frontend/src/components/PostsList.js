import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import { upVotePost, downVotePost, deletePost } from '../actions/posts'


class PostsList extends Component {
  handleDeletePost = postId => {
    this.props.deletePost(postId)
  }

  handleVote = (direction, postId) => {
    if (direction === 'up') this.props.upVotePost(postId)
    else this.props.downVotePost(postId)
  }

  handleSortOrder = field => {
    this.setState({ sortByField: field  })
  }

  state = {
    sortByField: '-voteScore',
  }

  render() {
    let { posts, category } = this.props
    let { sortByField } = this.state
    if (category) {
      posts = posts.filter(p => p.category === category)
    }

    if (sortByField) posts = posts.sort(sortBy(sortByField))

    return (
      <div className="posts-list">
        <div>
          Sort by:{' '}
          <a href="#" onClick={() => this.handleSortOrder('-voteScore')}>
            Most Votes
          </a>{' '}
          |{' '}
          <a onClick={() => this.handleSortOrder('-timestamp')} href="#">
            Most Recent
          </a>
        </div>
        <ol>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/${post.category}/${post.id}`}>
                Title: {post.title}, Author: {post.author}, Comments: {post.commentCount}
              </Link>
              , Votes: {post.voteScore}
              <span onClick={() => this.handleVote('up', post.id)}> + </span> /
              <span onClick={() => this.handleVote('down', post.id)}> - </span> &nbsp; | &nbsp;
              <Link to={`/post/edit/${post.id}`}>Edit the post</Link> &nbsp; | &nbsp;
              <a href="#" onClick={() => this.handleDeletePost(post.id)}>
                Delete this post
              </a>
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
    deletePost: postId => dispatch(deletePost(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)
