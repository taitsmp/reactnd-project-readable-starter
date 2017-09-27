
const api = "http://localhost:3001"

//TODO: refactor API endpoints
/*
 - this code taken from my-reads.  Refactor to call api endpoints from local server.
 - https://github.com/udacity/reactnd-project-readable-starter/tree/master/api-server
*/

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const testRequestOK = res => {
  if (!res.ok) {
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

export const getAllPosts = () =>
fetch(`${api}/posts`, { headers })
  .then(testRequestOK)  
  .then(res => res.json())
  .then(logJSON)
  //.then(data => data.books)

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(testRequestOK)  
    .then(res => res.json())
    .then(logJSON)

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(testRequestOK)  
    .then(res => res.json())
    //.then(data => data.books)

export const createComment = (comment) => 
fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(comment)
})
  .then(testRequestOK)
  .then(res => res.json())

/*
export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(testRequestOK)  
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(testRequestOK)  
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  })
    .then(testRequestOK)
    .then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then(testRequestOK)
    .then(res => res.json())
    .then(data => data.books)

*/