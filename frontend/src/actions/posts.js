import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
})

export const createComment = comment => ({
  type: CREATE_COMMENT,
  comment,
})

// consider this... https://github.com/RobinMalfait/prettier-eslint-code/issues/4
export const fetchPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(posts => dispatch(receivePosts(posts)))

export const postComment = comment => dispatch =>
  ReadableAPI.createComment().then(res => dispatch(createComment(comment)))
