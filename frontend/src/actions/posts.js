import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
})

// consider this... https://github.com/RobinMalfait/prettier-eslint-code/issues/4
export const fetchPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(posts => dispatch(receivePosts(posts)))
