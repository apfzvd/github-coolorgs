import React, { Component } from 'react'
import { connect } from 'react-redux'
import { populateRepos, populateDetails, getCommits } from './redux/allrepos'
import { getFirstRepos, getCommitsPerPage } from './requests'
// import s from './allrepo-style.css'

import ListRepos from './components/ListRepos'
import RepoDetail from './components/RepoDetail'

class AllRepos extends Component {

  componentDidMount () {
    const { dpPopulateRepos, dpPopulateDetails, dpGetCommits } = this.props
    const { params } = this.props.match

    getFirstRepos('marvin-ai')
      .then(({ data }) => {
        dpPopulateRepos(data.items, data.total_count)

        if (params.hasOwnProperty('repo')) {
          const open_repo = data.items.filter(r => (r.name === params.repo))[0]
          dpPopulateDetails(open_repo)

          getCommitsPerPage('marvin-ai', open_repo.name, '1')
            .then(({ data }) => dpGetCommits(data))
            .catch(() => dpGetCommits([]))
        }
      })
  }

  componentWillReceiveProps (nextProps) {
    const oldparams = this.props.match.params
    const { params } = nextProps.match
    const { dpGetCommits, dpPopulateDetails, repos } = this.props

    if (params.hasOwnProperty('repo') && params.repo !== oldparams.repo) {
      const open_repo = repos.filter(r => (r.name === params.repo))[0]
      dpPopulateDetails(open_repo)

      getCommitsPerPage('marvin-ai', open_repo.name, '1')
        .then(({ data }) => dpGetCommits(data))
        .catch(() => dpGetCommits([]))
    }
  }

  render () {
    const { loading, repos, open_repo, commits } = this.props

    return (
      <section className='flex'>
        { loading ? 'Loading...' : <ListRepos open={open_repo.name} repos={repos} org={'marvin-ai'} /> }
        { !loading && <RepoDetail commits={commits} {...open_repo}/> }
      </section>
    )
  }

}

const mapStateToProps = ({ allrepos }) => allrepos

const mapDispatchToProps = dispatch => {
  return {
    dpPopulateRepos: (res, total) => dispatch(populateRepos(res, total)),
    dpPopulateDetails: res => dispatch(populateDetails(res)),
    dpGetCommits: res => dispatch(getCommits(res))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRepos)
