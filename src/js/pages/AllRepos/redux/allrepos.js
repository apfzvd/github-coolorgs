// Actions
const GET_REPOS = 'GET_REPOS'
const GET_DETAILS = 'GET_DETAILS'
const LOADING_DETAILS = 'LOADING_DETAILS'

const initialState = {
  loading: true,
  loading_details: false,
  all: [],
  total: 0,
  details: {}
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case LOADING_DETAILS:
    return {
      ...state,
      loading_details: true
    }
  case GET_REPOS:
    return {
      ...state,
      loading: false,
      all: action.res,
      total: action.total
    }
  case GET_DETAILS:
    return {
      ...state,
      details: action.res,
      loading_details: false
    }
  default:
    return state
  }
}

// Action Creators
export const setLoadingDetails = () => ({ type: LOADING_DETAILS })

export const populateRepos = (res, total) => ({
  type: GET_REPOS,
  res,
  total
})

export const populateDetails = res => ({
  type: GET_DETAILS,
  res
})
