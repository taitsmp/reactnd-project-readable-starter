import { combineReducers } from 'redux'

/*
import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR,
} from '../actions'
*/

function post (state = {}, action) {
  switch (action.type) {
      /*
    case ADD_RECIPE :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
      */
    default :
      return state
  }
}

export default combineReducers({
    post,
})