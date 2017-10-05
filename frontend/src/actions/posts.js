import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const INCREMENT_POST_VOTE = 'INCREMENT_POST_VOTE'
export const DECREMENT_POST_VOTE = 'DECREMENT_POST_VOTE'


export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
})

export const createPost = post => ({
  type: CREATE_POST,
  post,
})

export const updatePost = post => ({
  type: UPDATE_POST,
  post,
})

export const incrementPostVote = post => ({
  type: INCREMENT_POST_VOTE,
  post,
})

export const decrementPostVote = post => ({
  type: DECREMENT_POST_VOTE,
  post,
})

export const removePost = postId => ({
  type: REMOVE_POST,
  postId,
})

// consider this... https://github.com/RobinMalfait/prettier-eslint-code/issues/4
export const fetchPosts = () => dispatch =>
  ReadableAPI.getAllPosts().then(posts => dispatch(receivePosts(posts)))


export const postPost = post => dispatch =>
  ReadableAPI.createPost(post).then(res => dispatch(createPost(post)))

export const putPost = post => dispatch =>
  ReadableAPI.updatePost(post).then(res => dispatch(updatePost(post)))

export const deletePost = postId => dispatch =>
  ReadableAPI.deletePost(postId).then(res => dispatch(removePost(postId)))

export const downVotePost = postId => dispatch =>
  ReadableAPI.voteOnPost(postId, 'downVote').then(post => dispatch(decrementPostVote(post)))

export const upVotePost = postId => dispatch =>
  ReadableAPI.voteOnPost(postId, 'upVote').then(post => dispatch(incrementPostVote(post)))