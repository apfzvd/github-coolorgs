// Constants
const GET_REPOS = 'GET_REPOS'
const GET_DETAILS = 'GET_DETAILS'
const GET_COMMITS = 'GET_COMMITS'
const MORE_COMMITS = 'MORE_COMMITS'

const initialState = {
  loading: true,
  repos: [],
  total: 0,
  open_repo: {
    name: ''
  },
  commits: []
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
  case GET_COMMITS:
    return {
      ...state,
      commits: action.res
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

export const getCommits = res => ({
  type: GET_COMMITS,
  res
})
