import React, { Component } from 'react'
import { connect } from 'react-redux'
import { populateRepos, throwError, populateDetails, getCommits } from './redux/allrepos'
import { getFirstRepos, getCommitsPerPage, getContributors } from './requests'
// import s from './allrepo-style.css'

import ListRepos from './components/ListRepos'
import RepoDetail from './components/RepoDetail'

class AllRepos extends Component {

  async getFirstCommits (org, repo) {
    const { dpGetCommits, dpthrowError } = this.props

    try {
      const { data } = await getCommitsPerPage(org, repo, '1')
      dpGetCommits(data)
    } catch ({ ...err }) {
      dpthrowError(`Erro: ${err.response.data.message}`)
    }
  }

  populateRepoDetails (repos, params) {
    const { dpPopulateDetails } = this.props

    const open_repo = repos.filter(r => (r.name === params.repo))[0]
    open_repo ? dpPopulateDetails(open_repo) : {}
  }

  async firstLoadDataFetch () {
    const { dpPopulateRepos, dpthrowError, org } = this.props
    const { params } = this.props.match

    try {
      const { data } = await getFirstRepos(org)
      dpPopulateRepos(data.items, data.total_count)

      if (params.hasOwnProperty('repo')) {
        this.populateRepoDetails(data.items, params)
        this.getFirstCommits(org, params.repo, '1')
      }
    } catch (err) {
      dpthrowError('Essa organização não existe :(')
    }
  }

  componentDidMount () {
    this.firstLoadDataFetch()
  }

  async componentWillReceiveProps (nextProps) {
    const oldparams = this.props.match.params
    const { params } = nextProps.match
    const { repos, org } = this.props

    if (params.hasOwnProperty('repo') && params.repo !== oldparams.repo) {
      const c = await getContributors(org, params.repo)
      console.log('contrib', c)
      this.populateRepoDetails(repos, params)
      this.getFirstCommits(org, params.repo, '1')
    }
  }

  render () {
    const { loading, error, repos, open_repo, commits, org } = this.props

    return (
      <section className='flex'>
        { loading ? 'Loading...' : <ListRepos open={open_repo.name} repos={repos} org={org} /> }
        { !loading && <RepoDetail error={error} commits={commits} {...open_repo}/> }
      </section>
    )
  }

}

const mapStateToProps = ({ allrepos }) => allrepos

const mapDispatchToProps = dispatch => {
  return {
    dpPopulateRepos: (res, total) => dispatch(populateRepos(res, total)),
    dpthrowError: msg => dispatch(throwError(msg)),
    dpPopulateDetails: res => dispatch(populateDetails(res)),
    dpGetCommits: res => dispatch(getCommits(res))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRepos)
