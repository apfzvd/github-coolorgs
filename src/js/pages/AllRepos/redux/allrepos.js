// Constants
const GET_REPOS = 'GET_REPOS'
const GET_DETAILS = 'GET_DETAILS'

const initialState = {
  loading: true,
  repos: [],
  total: 0,
  open_repo: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_REPOS:
    return {
      ...state,
      loading: false,
      repos: action.res,
      total: action.total
    }
  case GET_DETAILS:
    return {
      ...state,
      open_repo: action.res
    }
  default:
    return state
  }
}

// Action Creators
export const populateRepos = (res, total) => ({
  type: GET_REPOS,
  res,
  total
})

export const populateDetails = res => ({
  type: GET_DETAILS,
  res
})
