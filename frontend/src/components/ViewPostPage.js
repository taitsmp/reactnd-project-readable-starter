import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Utils from '../utils/utils'

import { postComment, fetchPostComments, upVoteComment, downVoteComment } from '../actions/comments'
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
    this.props.postComment(comment)
    this.setState({ commentInput:'', authorInput:''})
  }

  render() {
    const { params } = this.props
    const post = this.props.post || {} //if empty show an error state. Coud use "defaultProps"
    const comments = this.props.comments
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
          <ol className="comment-list">
            {comments.map(comment => (
              <li key={comment.id}>
                <div>name: {comment.author}</div><br/>
                <div>comment: {comment.body}</div><br/>
                <div>votes: {comment.voteScore}</div>
                <span onClick={() => this.handleVote('up', comment.id)}> + </span> /
                <span onClick={() => this.handleVote('down', comment.id)}> - </span>
              </li>
            ))}
          </ol>
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
  console.log('postId='+postId)
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
    upVoteComment: commentId => dispatch(upVoteComment(commentId)),
    downVoteComment: commentId => dispatch(downVoteComment(commentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostPage)
