import { combineReducers } from 'redux'
import {
  RECEIVE_POSTS,
  INCREMENT_POST_VOTE,
  DECREMENT_POST_VOTE,
  CREATE_POST,
  UPDATE_POST,
  REMOVE_POST,
} from '../actions/posts'
import {
  RECEIVE_POST_COMMENTS,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  INCREMENT_COMMENT_VOTE,
  DECREMENT_COMMENT_VOTE,
} from '../actions/comments'
import { RECEIVE_CATEGORIES } from '../actions/categories'

function comment(state = {}, action) {
  console.log('comment reducer: ' + action.type)

  switch (action.type) {
    case RECEIVE_POST_COMMENTS: {
      const { comments, postId } = action
      return {
        ...state,
        [postId]: comments,
      }
    }

    case CREATE_COMMENT: {
      const { comment } = action
      let postComments = state[comment.parentId] || []
      return {
        ...state,
        [comment.parentId]: [...postComments, comment],
      }
    }

    case REMOVE_COMMENT: {
      const { postId, commentId } = action
      let postComments = state[postId] || []
      return {
        ...state,
        [postId]: postComments.filter(comment => commentId !== comment.id),
      }
    }

    case DECREMENT_COMMENT_VOTE:
    case INCREMENT_COMMENT_VOTE: {
      const { comment } = action
      let postComments = state[comment.parentId].map(c => {
        if (c.id === comment.id) return comment
        else return c
      })

      return {
        ...state,
        [comment.parentId]: postComments,
      }
    }

    default:
      return state
  }
}
function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      const { posts } = action

      return {
        ...state,
        posts,
      }
    }

    case DECREMENT_POST_VOTE:
    case INCREMENT_POST_VOTE: {
      const { post } = action
      const postArray = state.posts.reduce((posts, p) => {
        if (post.id === p.id) {
          p = post
        }
        return [...posts, p]
      }, [])
      return {
        ...state,
        posts: postArray,
      }
    }

    case CREATE_POST: {
      const { post } = action
      const postArray = [...state.posts, post ]
      return {
        ...state, 
        posts: postArray,
      }
    }

    case UPDATE_POST: {
      const { post } = action
      console.log(state)
      const postArray = state.posts.reduce((posts, p) => {
        if (post.id === p.id) p = post
        return [...posts, p]
      }, [])
      return {
        ...state,
        posts: postArray,
      }
    }

    case REMOVE_POST: {
      const { postId } = action
      const postArray = state.posts.reduce((posts, p) => {
        if (postId === p.id) return posts
        else return [...posts, p]
      }, [])
      return {
        ...state,
        posts: postArray,
      }
    }

    default:
      return state
  }
}

function category(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES: {
      const { categories } = action
      console.log('receive categories')
      console.log(categories)
      console.log(state)
      return {
        ...state,
        categories,
      }
    }
    default:
      return state
  }
}

export default combineReducers({
  post,
  category,
  comment,
})
