import { TEXT } from './actions'

const initialState = {
  text: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
  case TEXT:
    return {
      ...state,
      text: action.value
    }
  default:
    return state
  }
}
