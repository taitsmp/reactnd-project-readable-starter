import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTrash from 'react-icons/lib/fa/trash'
import sortBy from 'sort-by'

import * as Utils from '../utils/utils'
import {
  postComment,
  putComment,
  fetchPostComments,
  upVoteComment,
  downVoteComment,
  deleteComment,
} from '../actions/comments'
import { fetchPosts, deletePost, removePost, upVotePost, downVotePost } from '../actions/posts'

//import { fetchCategories } from '../actions/categories'

class ViewPostPage extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.fetchPosts()
    if (postId) {
      this.props.fetchComments(postId)
    }
  }

  state = {
    authorInput: '',
    commentInput: '',
    commentAction: 'create',
    commentId: '',
  }

  //function to call whenever a form element changes
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleDeleteComment = commentId => {
    this.props.removeComment(commentId, this.props.post.id)
    this.setState({
      commentAction: 'create',
    })
  }

  handleEditComment = commentId => {
    const comment = this.props.comments.find(c => c.id === commentId)

    this.setState({
      authorInput: comment.author,
      commentInput: comment.body,
      commentAction: 'edit',
      commentId,
    })
    const cform = document.getElementById('edit-comments')
    const top = cform.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top)
  }

  handleDeletePost = postId => {
    this.props.deletePost(postId)
    this.props.history.push(`/`)
  }

  handleCommentVote = (direction, commentId) => {
    //check name here and decide if we're upvoting or downvoting.
    if (direction === 'up') this.props.upVoteComment(commentId)
    else this.props.downVoteComment(commentId)
  }

  handlePostVote = (direction, postId) => {
    if (direction === 'up') this.props.upVotePost(postId)
    else this.props.downVotePost(postId)
  }

  handleCancelComment = () => {
    this.setState({ commentInput: '', authorInput: '', commentAction: 'create' })
  }

  //creates new comment.
  handleSubmit = event => {
    event.preventDefault()

    const { post } = this.props
    const { commentInput, authorInput, commentAction, commentId } = this.state

    let comment = {
      id: Utils.uuid(),
      parentId: post.id,
      timestamp: Date.now(),
      body: commentInput,
      author: authorInput,
      voteScore: 1,
      deleted: false,
      parentDeleted: false,
    }

    if (commentAction === 'create') this.props.postComment(comment)
    else {
      const oldComment = this.props.comments.find(c => c.id === commentId)

      comment = {
        ...comment,
        id: oldComment.id,
        timestamp: oldComment.timestamp,
        voteScore: oldComment.voteScore,
      }
      comment.id = commentId
      this.props.putComment(comment)
    }
    this.setState({ commentInput: '', authorInput: '', commentAction: 'create' })
  }

  render() {
    const post = this.props.post || {} //if empty show an error state. Coud use "defaultProps"
    const comments = this.props.comments
    const date = Utils.dateFromTimestamp(post.timestamp)

    return (
      <div>
        {post.id ? (
          <div className="view-post-page">
            <div className="view-post">
              <div>title: "{post.title}"</div>
              <div>author: {post.author}</div>
              <div>category: {post.category}</div>
              <div>Published: {date}</div>
              <div>Votes: {post.voteScore}</div>
              <div>body: {post.body}</div>
            </div>
            <p />
            <div>
              <Link to="/">Go Home</Link> &nbsp; | &nbsp; Vote on Post:
              <button onClick={() => this.handlePostVote('up', post.id)} className="icon-btn">
                <FaThumbsUp />
              </button>
              <button onClick={() => this.handlePostVote('down', post.id)} className="icon-btn">
                <FaThumbsDown />
              </button>{' '}
              &nbsp; | &nbsp;
              <Link to={`/post/edit/${post.id}`}>Edit the post</Link> &nbsp; | &nbsp;
              <a href="#" onClick={() => this.handleDeletePost(post.id)}>
                Delete this post
              </a>
            </div>
            <div className="view-post-comments">
              <h3>Comments</h3>
              <form id="edit-comments" className="comment-form" onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="authorInput">Author:</label>
                  <input
                    type="text"
                    value={this.state.authorInput}
                    onChange={this.handleInputChange}
                    name="authorInput"
                  />
                </div>
                <div>
                  <label htmlFor="commentInput">Comment:</label>
                  <textarea
                    value={this.state.commentInput}
                    onChange={this.handleInputChange}
                    name="commentInput"
                  />
                </div>
                <div className="submit-container">
                  <input type="submit" value="Submit" />
                </div>
                <div className="submit-container">
                  <button
                    type="button"
                    onClick={() => this.handleCancelComment()}
                    className="standard">
                    Cancel
                  </button>
                </div>
              </form>
              <div className="comment-list">
                {comments.sort(sortBy('-voteScore')).map(comment => (
                  <div key={comment.id} className="comment">
                    <div>author: {comment.author}</div>
                    <div>{comment.body}</div>
                    <div>votes: {comment.voteScore}</div>
                    <button
                      onClick={() => this.handleCommentVote('up', comment.id)}
                      className="icon-btn">
                      <FaThumbsUp />
                    </button>
                    <button
                      onClick={() => this.handleCommentVote('down', comment.id)}
                      className="icon-btn">
                      <FaThumbsDown />
                    </button>
                    <button onClick={() => this.handleEditComment(comment.id)} className="icon-btn">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => this.handleDeleteComment(comment.id)}
                      className="icon-btn">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            This post does not exist. <Link to="/">Go Home</Link>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ post, comment }, ownProps) {
  const posts = post.posts || []
  const params = ownProps.match.params || {}
  const postId = params.postId || 0
  const comments = comment[postId] || []

  return {
    post: posts.find(p => p.id === postId) || {},
    comments,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: postId => dispatch(fetchPostComments(postId)),
    postComment: comment => dispatch(postComment(comment)),
    removeComment: (commentId, postId) => dispatch(deleteComment(commentId, postId)),
    putComment: comment => dispatch(putComment(comment)),
    upVoteComment: commentId => dispatch(upVoteComment(commentId)),
    downVoteComment: commentId => dispatch(downVoteComment(commentId)),
    deletePost: postId => dispatch(deletePost(postId)),
    removePost: postId => dispatch(removePost(postId)),
    upVotePost: postId => dispatch(upVotePost(postId)),
    downVotePost: postId => dispatch(downVotePost(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage)
