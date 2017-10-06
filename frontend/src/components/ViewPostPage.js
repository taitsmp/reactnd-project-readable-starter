import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Utils from '../utils/utils'
//import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import FaThumbsDown  from 'react-icons/lib/fa/thumbs-down'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'


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

/*LEFT OFF HERE: working on styling comments a bit (especially forms).  Also need to scroll to the comment form when editing

* https://github.com/rafrex/react-router-hash-link (scrolling)
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form
* https://medium.com/@aghh1504/4-four-ways-to-style-react-components-ac6f323da822 (styling)
* https://www.sitepoint.com/style-react-components-styled-components/

*/

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
    const bsize=12
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
          <div className="comment-list">
            {comments.map(comment => (
              <div className='comment'>
                <div>author: {comment.author}</div>
                <div>{comment.body}</div>
                <div>votes: {comment.voteScore}</div>
                <button onClick={() => this.handleVote('up', comment.id)} className='icon-btn'>
                  <FaThumbsUp />
                </button>
                <button onClick={() => this.handleVote('down', comment.id)} className='icon-btn'>
                  <FaThumbsDown />2
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
