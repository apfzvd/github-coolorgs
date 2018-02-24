import React, { Component } from 'react'
import { connect } from 'react-redux'
import { populateRepos, populateDetails, getCommits } from './redux/allrepos'
import { getFirstRepos, getCommitsPerPage } from './requests'
// import s from './allrepo-style.css'

import ListRepos from './components/ListRepos'
import RepoDetail from './components/RepoDetail'

class AllRepos extends Component {

  async getFirstCommits (org, repo) {
    const { dpGetCommits } = this.props

    try {
      const { data } = await getCommitsPerPage(org, repo, '1')
      dpGetCommits(data)
    } catch (err) {
      dpGetCommits([])
    }
  }

  populateRepoDetails (repos, params) {
    const { dpPopulateDetails } = this.props

    const open_repo = repos.filter(r => (r.name === params.repo))[0]
    dpPopulateDetails(open_repo)
  }

  async firstLoadDataFetch () {
    const { dpPopulateRepos } = this.props
    const { params } = this.props.match

    try {
      const { data } = await getFirstRepos('marvin-ai')
      dpPopulateRepos(data.items, data.total_count)

      if (params.hasOwnProperty('repo')) {
        this.populateRepoDetails(data.items, params)
        this.getFirstCommits('marvin-ai', params.repo, '1')
      }
    } catch (err) {
      throw(err)
    }
  }

  componentDidMount () {
    this.firstLoadDataFetch()
  }

  componentWillReceiveProps (nextProps) {
    const oldparams = this.props.match.params
    const { params } = nextProps.match
    const { repos } = this.props

    if (params.hasOwnProperty('repo') && params.repo !== oldparams.repo) {
      this.populateRepoDetails(repos, params)
      this.getFirstCommits('marvin-ai', params.repo, '1')
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
