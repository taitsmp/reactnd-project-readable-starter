import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
})

export const receivePostComments = (comments, postId) => ({
  type: RECEIVE_POST_COMMENTS,
  comments,
  postId
})

export const createComment = comment => ({
  type: CREATE_COMMENT,
  comment,
})

// consider this... https://github.com/RobinMalfait/prettier-eslint-code/issues/4
export const fetchPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(posts => dispatch(receivePosts(posts)))

export const fetchPostComments = (postId) => dispatch =>
  ReadableAPI.getPostComments(postId).then((comments, postId) => dispatch(receivePostComments(comments, postId)))

export const postComment = comment => dispatch =>
  ReadableAPI.createComment(comment).then(res => dispatch(createComment(comment)))
