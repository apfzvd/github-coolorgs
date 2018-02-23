import React, { Component } from 'react'
import { connect } from 'react-redux'
import { populateRepos, populateDetails, setLoadingDetails } from './redux/allrepos'
import { getFirstRepos } from './requests'
// import s from './allrepo-style.css'

import ListRepos from './components/ListRepos'
import RepoDetail from './components/RepoDetail'

class AllRepos extends Component {

  componentDidMount () {
    const { dpPopulateRepos, dpPopulateDetails } = this.props
    const { params } = this.props.match

    getFirstRepos('marvin-ai')
      .then(({ data }) => {
        dpPopulateRepos(data.items, data.total_count)

        if (params.hasOwnProperty('repo')) {
          const open_repo = data.items.filter(r => (r.name === params.repo))[0]
          dpPopulateDetails(open_repo)
        }
      })
  }

  componentWillReceiveProps (nextProps) {
    const oldparams = this.props.match.params
    const { params } = nextProps.match
    const { dpPopulateDetails, repos } = this.props

    if (params.hasOwnProperty('repo') && params.repo !== oldparams.repo) {
      const open_repo = repos.filter(r => (r.name === params.repo))[0]
      dpPopulateDetails(open_repo)
    }
  }

  render () {
    const { loading, repos, open_repo } = this.props

    return (
      <section className='flex'>
        { loading ? 'Loading...' : <ListRepos repos={repos} org={'marvin-ai'} /> }

        <RepoDetail {...open_repo}/>
      </section>
    )
  }

}

const mapStateToProps = ({ allrepos }) => allrepos

const mapDispatchToProps = dispatch => {
  return {
    dpSetLoadingDetails: () => dispatch(setLoadingDetails()),
    dpPopulateRepos: (res, total) => {
      dispatch(populateRepos(res, total))
    },
    dpPopulateDetails: res => dispatch(populateDetails(res))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRepos)
