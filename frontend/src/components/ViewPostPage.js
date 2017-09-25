import React, { Component } from 'react'
import { connect } from 'react-redux'

class ViewPostPage extends Component {
  render() {
    const { postID } = this.props.params
    const { post } = this.props || {} //if empty show an error state. 
    return (
    <div className="view-post-page">
        {post.title}
    </div>
    )
  }
}

function mapStateToProps({ post }, ownProps) {
  let posts = post.posts || []
  let postID = ownProps.params.postId || -1
  return {
    post: posts.find(p => p.id === postID),
  }
}

export default connect(mapStateToProps)(ViewPostPage)
