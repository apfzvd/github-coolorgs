// Constants
const CHOOSE_ORG = 'CHOOSE_ORG'

const initialState = {
  org: 'marvin-ai'
}

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case CHOOSE_ORG:
    return {
      ...state,
      org: action.org
    }
  default:
    return state
  }
}

// Action Creators
export const changeOrg = org => ({
  type: CHOOSE_ORG,
  org
})
