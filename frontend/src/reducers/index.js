import { combineReducers } from 'redux'
import {
  RECEIVE_POSTS,
} from '../actions/posts'
import {
    RECEIVE_CATEGORIES,
  } from '../actions/categories'

function post (state = {}, action) {
    switch (action.type) {
    
        case RECEIVE_POSTS :
            const { posts } = action

            return {
            ...state,
            posts,
            }

        default :
            return state
    }
}

function category (state = {}, action) {
    switch (action.type) {
        
        case RECEIVE_CATEGORIES :
        const { categories } = action

        return {
            ...state,
            categories,
        }
        
        default :
        return state
    }
}


export default combineReducers({
    post,
    category,
})