import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Utils from '../utils/utils'
import { fetchPosts, postPost, putPost, deletePost } from '../actions/posts'
import { fetchCategories } from '../actions/categories'

//how to handle default state of forms
// https://github.com/reactjs/redux/issues/699

class EditPostPage extends Component {
  componentDidMount() {
    const { postId } = this.props.match.params

    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  handleInputChange = event => {
    const { name, value } = event.target
    console.log(name)
    this.setState({
      [name]: value,
    })
  }

  handleDeletePost = postId => {
    this.props.deletePost(postId)
    this.props.history.push(`/`)
  }
  //create or update a post
  handleSubmit = event => {
    event.preventDefault()

    const { mode } = this.props
    const { bodyInput, titleInput, authorInput, categorySelect } = this.state

    let postFields = {
      title: titleInput,
      body: bodyInput,
      author: authorInput,
      category: categorySelect,
    }

    if (mode === 'update') {
      let post = {
        ...this.props.post,
        ...postFields,
      }
      this.props.putPost(post)
      //create
    } else {
      let post = {
        id: Utils.uuid(),
        timestamp: Date.now(),
        ...postFields,
      }
      this.props.postPost(post)
      this.props.history.push(`/post/edit/${post.id}`)
    }
  }

  //only want to run this one time.
  componentWillReceiveProps = nextProps => {
    let { post, mode, categories } = nextProps

    console.log(this.state)
    console.log(this.props)
    console.log(nextProps)
    if (this.state.initialized === false && mode === 'update' && post) {
      let nextState = {
        initialized: true,
        authorInput: post.author,
        titleInput: post.title,
        bodyInput: post.body,
        categorySelect: post.category,
      }
      this.setState(nextState)
    } else if (this.state.initialized === false && mode === 'create' && categories) {
      this.setState({
        initialized: true,
        categorySelect: categories[0].path,
      })
    }
  }

  state = {
    initialized: false,
    authorInput: '',
    titleInput: '',
    bodyInput: '',
    categorySelect: '',
  }

  render() {
    let { post, mode, categories } = this.props
    post = post || {}
    return (
      <div id="edit-post-page">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="authorInput">author:</label>
            <input
              type="text"
              value={this.state.authorInput}
              onChange={this.handleInputChange}
              name="authorInput"
            />
          </div>
          <div>
            <label htmlFor="titleInput">title:</label>
            <input
              type="text"
              value={this.state.titleInput}
              onChange={this.handleInputChange}
              name="titleInput"
            />
          </div>
          <div>
            <label htmlFor="categorySelect">category:</label>
            <select
              name="categorySelect"
              value={this.state.categorySelect}
              onChange={this.handleInputChange}>
              {categories.map(category => (
                <option key={category.path} value={category.path}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bodyInput">body:</label>
            <textarea
              value={this.state.bodyInput}
              onChange={this.handleInputChange}
              name="bodyInput"
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        {mode === 'update' && (
          <div>
            <Link to={`/${post.category}/${post.id}`}>View the post</Link> |
            <Link to={`/`}>View all Posts</Link> |
            <a href="#" onClick={() => this.handleDeletePost(post.id)}>
              Delete this post
            </a>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ post, category }, ownProps) {
  const posts = post.posts || []
  const categories = category.categories || []
  const { match } = ownProps

  let postId = 0
  let mode = 'create'
  if (match.params.postId) {
    postId = match.params.postId
    mode = 'update'
  }

  return {
    post: posts.find(p => p.id === postId),
    mode,
    categories,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    postPost: post => dispatch(postPost(post)),
    putPost: post => dispatch(putPost(post)),
    deletePost: postId => dispatch(deletePost(postId)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage)
