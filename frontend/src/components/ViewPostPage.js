import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaEdit from 'react-icons/lib/fa/edit'

import * as Utils from '../utils/utils'
import {
  postComment,
  putComment,
  fetchPostComments,
  upVoteComment,
  downVoteComment,
} from '../actions/comments'
import { fetchPosts } from '../actions/posts'
//import { fetchCategories } from '../actions/categories'

class ViewPostPage extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.fetchPosts()
    if (postId) {
      //console.log('fetch comments')
      this.props.fetchComments(postId)
    }
  }

  state = {
    authorInput: '',
    commentInput: '',
    commentAction: 'create',
  }

  //function to call whenever a form element changes
  handleInputChange = event => {
    const { name, value } = event.target
    console.log(name)
    this.setState({
      [name]: value,
    })
  }

  handleEditComment = commentId => {
    const comment = this.props.comments.find(c => c.id === commentId)

    this.setState({
      authorInput: comment.author,
      commentInput: comment.body,
      commentAction: 'edit',
    })
    const cform = document.getElementById('edit-comments')
    const top = cform.getBoundingClientRect().top + window.scrollY
    console.log('top is ' + top)
    window.scrollTo(0, top)
  }

  /*LEFT OFF HERE:
* remove HashLink and react-router-hash-link
* https://medium.com/@aghh1504/4-four-ways-to-style-react-components-ac6f323da822 (styling)
* https://www.sitepoint.com/style-react-components-styled-components/

*/

  handleVote = (direction, commentId) => {
    //check name here and decide if we're upvoting or downvoting.
    if (direction === 'up') this.props.upVoteComment(commentId)
    else this.props.downVoteComment(commentId)
  }

  handleCancelComment = () => {
    this.setState({ commentInput: '', authorInput: '', commentAction: 'create' })
  }

  //creates new comment.
  handleSubmit = event => {
    event.preventDefault()

    const { post } = this.props
    const { commentInput, authorInput, commentAction } = this.state

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

    if (commentAction === 'create') this.props.postComment(comment)
    else this.props.putComment(comment)
    this.setState({ commentInput: '', authorInput: '', commentAction: 'create' })
  }

  render() {
    const { params } = this.props
    const post = this.props.post || {} //if empty show an error state. Coud use "defaultProps"
    const comments = this.props.comments
    const bsize = 12
    console.log('comments=' + comments)

    console.log(post)
    return (
      <div className="view-post-page">
        <div className="view-post">
          <div>title: "{post.title}"</div>
          <div>author: {post.author}</div>
          <div>category: {post.category}</div>
          <div>body: {post.body}</div>
        </div>
        <div>
          <Link to="/">home</Link>
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
              <button onClick={() => this.handleCancelComment() } className="standard" >Cancel</button>
            </div>
            <input
              ref={input => {
                this.submittedValue = input
              }}
              type="hidden"
              name="submitted"
              value="Submit"
            />
          </form>
          <div className="comment-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <div>author: {comment.author}</div>
                <div>{comment.body}</div>
                <div>votes: {comment.voteScore}</div>
                <button onClick={() => this.handleVote('up', comment.id)} className="icon-btn">
                  <FaThumbsUp />
                </button>
                <button onClick={() => this.handleVote('down', comment.id)} className="icon-btn">
                  <FaThumbsDown />
                </button>
                <button onClick={() => this.handleEditComment(comment.id)} className="icon-btn">
                  <FaEdit />
                </button>
              </div>
            ))}
          </div>
        </div>
        <Link to={`/post/edit/${post.id}`}>Edit the post</Link>
      </div>
    )
  }
}

function mapStateToProps({ post, comment }, ownProps) {
  const posts = post.posts || []
  const params = ownProps.match.params || {}
  const postId = params.postId || 0
  const comments = comment[postId] || []
  console.log('postId=' + postId)
  console.log(comments)
  console.log(ownProps)
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
    putComment: comment => dispatch(putComment(comment)),
    upVoteComment: commentId => dispatch(upVoteComment(commentId)),
    downVoteComment: commentId => dispatch(downVoteComment(commentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage)
