import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const INCREMENT_COMMENT_VOTE = 'INCREMENT_COMMENT_VOTE'
export const DECREMENT_COMMENT_VOTE = 'DECREMENT_COMMENT_VOTE'

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

export const updateComment = comment => ({
  type: UPDATE_COMMENT,
  comment,
})

export const incrementCommentVote = comment => ({
  type: INCREMENT_COMMENT_VOTE,
  comment,
})

export const decrementCommentVote = comment => ({
  type: DECREMENT_COMMENT_VOTE,
  comment,
})

export const removeComment = (commentId, postId) => ({
  type: REMOVE_COMMENT,
  commentId,
  postId,
})

export const fetchPostComments = postId => dispatch =>
  ReadableAPI.getPostComments(postId).then(comments =>
    dispatch(receivePostComments(comments, postId))
  )

export const postComment = comment => dispatch =>
  ReadableAPI.createComment(comment).then(res => dispatch(createComment(comment)))

export const putComment = comment => dispatch =>
  ReadableAPI.updateComment(comment).then(res => dispatch(updateComment(comment)))

export const deleteComment = (commentId, postId) => dispatch =>
  ReadableAPI.deleteComment(commentId).then(res => dispatch(removeComment(commentId, postId)))

export const downVoteComment = commentId => dispatch =>
  ReadableAPI.voteOnComment(commentId, 'downVote').then(comment =>
    dispatch(decrementCommentVote(comment))
  )

export const upVoteComment = commentId => dispatch =>
  ReadableAPI.voteOnComment(commentId, 'upVote').then(comment =>
    dispatch(incrementCommentVote(comment))
  )
