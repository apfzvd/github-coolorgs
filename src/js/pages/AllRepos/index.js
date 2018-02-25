import React, { Component } from 'react'
import { connect } from 'react-redux'
import { populateRepos, throwError, populateDetails, getCommits, contribCount, commitCount, paginateCommits, moreCommits, willGetCommits } from './redux/allrepos'
import { getFirstRepos, getCommitsPerPage, getContributorsTotal, getCommitsTotal } from './requests'
import { getLastPage } from 'utils'
// import s from './allrepo-style.css'

import ListRepos from './components/ListRepos'
import RepoDetail from './components/RepoDetail'

class AllRepos extends Component {

  async getAllContribs (org, repo) {
    const { dpContribCount, error } = this.props
    const { headers } = await getContributorsTotal(org, repo)

    if (headers.hasOwnProperty('link')) {
      const contribsCount = getLastPage(headers.link) // gets last page on github's pagination
      dpContribCount(contribsCount)
    } else { // doensn't show pagination if there's only one page
      !error.status && dpContribCount(1)
    }
  }

  async getAllCommits (org, repo) {
    const { dpCommitCount } = this.props
    const { headers } = await getCommitsTotal(org, repo)

    if (headers.hasOwnProperty('link')) {
      const commitCount = getLastPage(headers.link) // gets last page on github's pagination
      dpCommitCount(commitCount)
    } else {
      dpCommitCount(1)
    }
  }

  async paginate () {
    const { dpPaginateCommits, dpMoreCommits, dpWillGetCommits, current_page, pages, org } = this.props
    const { params } = this.props.match

    if(pages > current_page) {
      dpPaginateCommits()
      dpWillGetCommits('more')
      const { data } = await getCommitsPerPage(org, params.repo, current_page + 1)
      dpMoreCommits(data)
    }
  }

  async getFirstCommits (org, repo) {
    const { dpCommitCount, dpContribCount, dpGetCommits, dpWillGetCommits, dpthrowError } = this.props

    try {
      dpWillGetCommits('first')
      const { data } = await getCommitsPerPage(org, repo, '1')
      dpGetCommits(data)
    } catch ({ ...err }) {
      dpthrowError(`Erro: ${err.response.data.message}`)
      dpCommitCount(0)
      dpContribCount(0)
    }
  }

  populateRepoDetails (repos, repo) {
    const { dpPopulateDetails } = this.props

    const open_repo = repos.filter(r => (r.name === repo))[0]
    open_repo ? dpPopulateDetails(open_repo) : {}
  }

  async firstLoadDataFetch () {
    const { dpPopulateRepos, dpthrowError, org } = this.props
    const { params } = this.props.match

    try {
      const { data } = await getFirstRepos(org)
      dpPopulateRepos(data.items, data.total_count)

      if (params.hasOwnProperty('repo')) {
        this.populateRepoDetails(data.items, params.repo)
        this.getAllContribs(org, params.repo)
        this.getAllCommits(org, params.repo)
        this.getFirstCommits(org, params.repo)
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
      this.getAllContribs(org, params.repo)
      this.getAllCommits(org, params.repo)
      this.populateRepoDetails(repos, params.repo)
      this.getFirstCommits(org, params.repo)
    }
  }

  render () {
    const { loading, error, repos, open_repo, commits, org, total_contribs, pages, current_page, loading_commits } = this.props

    return (
      <section className='flex'>
        { loading ? 'Loading...' : <ListRepos open={open_repo.name} repos={repos} org={org} /> }
        {
          !loading && <RepoDetail
            error={error}
            showLoadMore={(pages > current_page)}
            loadCommits={loading_commits}
            more={() => this.paginate()}
            commits={commits}
            contributors={total_contribs}
            {...open_repo}
          />
        }
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
    dpGetCommits: res => dispatch(getCommits(res)),
    dpWillGetCommits: moment => dispatch(willGetCommits(moment)),
    dpMoreCommits: res => dispatch(moreCommits(res)),
    dpContribCount: total => dispatch(contribCount(total)),
    dpCommitCount: total => dispatch(commitCount(total)),
    dpPaginateCommits: () => dispatch(paginateCommits())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRepos)
