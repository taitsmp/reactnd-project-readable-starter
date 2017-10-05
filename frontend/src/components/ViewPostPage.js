import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

import { EditComment } from './EditComment'

class ViewPostPage extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.fetchPosts()
    if (postId) {
      //console.log('fetch comments')
      this.props.fetchComments(postId)
    }
  }

  //handes create and update ops
  //LEFT OFF HERE.  I think this is a deadend.  Let's swap it out with a modal instead.  
  //consider React bootstrap. 
  //modal example given below. 
  //https://react-bootstrap.github.io/components.html#utilities
  handleUpdateComment = (op, comment) => {
    if (op === 'new') this.props.postComment(comment)
    else this.props.putComment(comment)
  }

  showCommentEdit = commentId => {
    const comment = this.props.comments.find(c => (commentId = c.id))
    this.setState({
      commentForm: 'show',
      editComment: comment,
    })
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
          {this.state.commentForm !== 'hide' && (
            <EditComment
              postId={post.id}
              comment={this.state.editComment}
              handleUpdateComment={this.handleUpdateComment}
            />
          )}
          <ol className="comment-list">
            {comments.map(comment => (
              <li key={comment.id}>
                <div>name: {comment.author}</div>
                <br />
                <div>comment: {comment.body}</div>
                <br />
                <div>votes: {comment.voteScore}</div>
                <span onClick={() => this.handleVote('up', comment.id)}> + </span> /
                <span onClick={() => this.handleVote('down', comment.id)}> - </span>
                <span onClick={() => this.showCommentEdit(comment.id)}> Edit Comment</span>
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
