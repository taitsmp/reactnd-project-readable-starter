const api = 'http://localhost:3001'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token) {
  localStorage.token = Math.random()
    .toString(36)
    .substr(-8)
  token = localStorage.token
}

const headers = {
  Accept: 'application/json',
  Authorization: token,
}

const testRequestOK = res => {
  if (!res.ok) {
    console.log(res)
    let err = new Error(res.statusText)
    err.status = res.status
    throw err
  }
  return res
}

const logJSON = json => {
  console.log(json)
  return json
}

export const addCommentCountsToPosts = posts => {
  let postsWithCC = posts.map(p =>
    getPostComments(p.id).then(comments => {
      p.commentCount = comments.filter(c => c.deleted === false).length
      return p
    })
  )
  return Promise.all(postsWithCC)
}

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(testRequestOK)
    .then(res => res.json())
    .then(logJSON)
    .then(posts => addCommentCountsToPosts(posts))
//.then(data => data.books)

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(testRequestOK)
    .then(res => res.json())
    .then(logJSON)

export const getPostsByCategory = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(testRequestOK)
    .then(res => res.json())
    .then(posts => addCommentCountsToPosts(posts))

export const createComment = comment => {
  console.log(JSON.stringify(comment))
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then(testRequestOK)
    .then(res => res.json())
}

export const updateComment = comment => {
  //console.log(JSON.stringify(comment))
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then(testRequestOK)
    .then(res => res.json())
}

export const createPost = post => {
  console.log(post)
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then(testRequestOK)
    .then(res => res.json())
}

//this will successfully set a category.
//curl -H 'Authorization: 9ssgac8o'  -H "Content-Type: application/json" -X PUT -d '{"category":"dorks", "title":"new title"}' localhost:3001/posts/y5n8ipw1g2
export const updatePost = post => {
  //console.log(JSON.stringify(comment))
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })
    .then(testRequestOK)
    .then(res => res.json())
}

//voteStr either 'upVote' or 'downVote'
//curl -H 'Authorization: tait' -H "Content-Type: application/json" -X POST -d '{"option":"upVote"}' localhost:3001/posts/8xf0y6ziyjabvozdd253nd
export const voteOnPost = (postId, voteStr) => {
  //console.log(JSON.stringify(comment))
  const payload = { option: voteStr }
  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(testRequestOK)
    .then(res => res.json())
}

//voteStr either 'upVote' or 'downVote'
//curl -H 'Authorization: tait' -H "Content-Type: application/json" -X POST -d '{"option":"upVote"}' localhost:3001/comments/894tuq4ut84ut8v4t8wun89g | jq '.'
export const voteOnComment = (commentId, voteStr) => {
  //console.log(JSON.stringify(comment))
  const payload = { option: voteStr }
  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(testRequestOK)
    .then(res => res.json())
}

export const deletePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  })
    .then(testRequestOK)
    .then(res => res.json())

export const deleteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers,
  })
    .then(testRequestOK)
    .then(res => res.json())

export const getPostComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(testRequestOK)
    .then(res => res.json())
