import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export const receivePostComments = (comments, postId) => {
  return {
    type: RECEIVE_POST_COMMENTS,
    comments,
    postId,
  }
}

export const createComment = comment => ({
  type: CREATE_COMMENT,
  comment,
})

export const fetchPostComments = postId => dispatch =>
  ReadableAPI.getPostComments(postId).then(comments =>
    dispatch(receivePostComments(comments, postId))
  )

export const postComment = comment => dispatch =>
  ReadableAPI.createComment(comment).then(res => dispatch(createComment(comment)))
