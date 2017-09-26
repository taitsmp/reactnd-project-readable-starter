import React, { Component } from 'react'
import { connect } from 'react-redux'

//LEFT OFF HERE: BrowserRouter doesn't work in App.js if you "connect" it with redux.  Two options
//1. higher level component that fetches things
//2. just duplicate calls to fetch post and categories here (bad idea)
//Review...
//http://redux.js.org/docs/basics/UsageWithReact.html (container components)
//https://github.com/brookslyrette/reactit

class ViewPostPage extends Component {
  render() {
    const { params } = this.props
    const post = this.props.post || {} //if empty show an error state. 
    console.log(post)
    return (
    <div className="view-post-page">
        title: "{post.title}"
    </div>
    )
  }
}


function mapStateToProps({ post }, ownProps) {
  let posts  = post.posts || []
  let params = ownProps.match.params || {}
  let postId = params.postId || -1

  console.log(ownProps)
  return {
    post: posts.find(p => p.id === postId),
  }
}

export default connect(mapStateToProps)(ViewPostPage)
