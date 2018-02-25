// Constants
const GET_REPOS = 'GET_REPOS'
const REPO_FAIL = 'REPO_FAIL'
const GET_DETAILS = 'GET_DETAILS'
const GET_COMMITS = 'GET_COMMITS'
const MORE_COMMITS = 'MORE_COMMITS'
const COMMIT_COUNT = 'COMMIT_COUNT'
const CONTRIB_COUNT = 'CONTRIB_COUNT'
const PAGINATE = 'PAGINATE'

const initialState = {
  org: 'marvin-ai',
  loading: true,
  error: {
    status: false,
    msg: ''
  },
  repos: [],
  total: 0,
  open_repo: {},
  commits: [],
  total_commits: false,
  pages: 1,
  current_page: 1,
  total_contribs: false
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_REPOS:
    return {
      ...state,
      loading: false,
      repos: action.res,
      total: action.total,
      error: initialState.error
    }
  case REPO_FAIL:
    return {
      ...state,
      loading: false,
      error: {
        status: true,
        msg: action.msg
      }
    }
  case GET_DETAILS:
    return {
      ...state,
      error: initialState.error,
      pages: initialState.pages,
      current_page: initialState.current_page,
      open_repo: action.res
    }
  case GET_COMMITS:
    return {
      ...state,
      error: initialState.error,
      commits: action.res
    }
  case MORE_COMMITS:
    return {
      ...state,
      error: initialState.error,
      commits: state.commits.concat(action.res)
    }
  case COMMIT_COUNT:
    return {
      ...state,
      total_commits: action.total,
      pages: Math.ceil((parseFloat(action.total)) / 20)
    }
  case CONTRIB_COUNT:
    return {
      ...state,
      total_contribs: action.total
    }
  case PAGINATE:
    return {
      ...state,
      current_page: state.current_page + 1
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

export const throwError = msg => ({
  type: REPO_FAIL,
  msg
})

export const populateDetails = res => ({
  type: GET_DETAILS,
  res
})

export const getCommits = res => ({
  type: GET_COMMITS,
  res
})

export const moreCommits = res => ({
  type: MORE_COMMITS,
  res
})

export const contribCount = total => ({
  type: CONTRIB_COUNT,
  total
})

export const commitCount = total => ({
  type: COMMIT_COUNT,
  total
})

export const paginateCommits = () => ({
  type: PAGINATE
})
