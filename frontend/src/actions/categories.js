import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receiveCategories = categories => {
  
  console.log('categories are:')
  console.log(categories)
  return {
  type: RECEIVE_CATEGORIES,
  categories: categories.categories,
  }
}

export const fetchCategories = () => dispatch =>
  ReadableAPI.getAllCategories().then(categories => dispatch(receiveCategories(categories)))
