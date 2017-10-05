import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Utils from '../utils/utils'

import { postComment, fetchPostComments, upVoteComment, downVoteComment } from '../actions/comments'

class EditComment extends Component {
  componentDidMount() {}

  state = {
    authorInput: '',
    commentInput: '',
  }

  //function to call whenever a form element changes
  handleInputChange = event => {
    const { name, value } = event.target
    console.log(name)
    this.setState({
      [name]: value,
    })
  }

  //this is wrong.  Need two functions. one for each vote type.  Need bound functions with commentid passed in.
  handleVote = (direction, commentId) => {
    //check name here and decide if we're upvoting or downvoting.
    if (direction === 'up') this.props.upVoteComment(commentId)
    else this.props.downVoteComment(commentId)
  }

  //creates new comment.
  handleSubmit = event => {
    event.preventDefault()

    const { post } = this.props
    const { commentInput, authorInput } = this.state

    let comment = {
      id: Utils.uuid(),
      parentId: post.id,
      timestamp: Date.now(),
      body: commentInput,
      author: authorInput,
      voteScore: 0,
      deleted: false,
      parentDeleted: false,
    }
    this.props.handleUpdateComment(comment)
    this.setState({ commentInput: '', authorInput: '' })
  }

  render() {
      return (
        <form onSubmit={this.handleSubmit}>
        Author:{' '}
        <input
          type="text"
          value={this.state.authorInput}
          onChange={this.handleInputChange}
          name="authorInput"
        />
        <div style={{ marginBottom: 20 }} />
        Comment: <br />
        <textarea
          value={this.state.commentInput}
          onChange={this.handleInputChange}
          name="commentInput"
        />
        <input type="submit" value="Submit" />
      </form>
      )
  }
}
