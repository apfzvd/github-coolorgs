import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from './redux/allrepos'
import * as rq from './requests'
import { getLastPage } from 'utils'

import ListRepos from './components/ListRepos'
import RepoDetail from './components/RepoDetail'
import Loading from './components/Loading'

class AllRepos extends Component {

  async getAllContribs (org, repo) {
    const { dpContribCount, error } = this.props
    const { headers } = await rq.getContributorsTotal(org, repo)

    if (headers.hasOwnProperty('link')) {
      const contribsCount = getLastPage(headers.link) // gets last page on github's pagination
      dpContribCount(contribsCount)
    } else {
      !error.status && dpContribCount(1)
    }
  }

  async getAllCommits (org, repo) {
    const { dpCommitCount } = this.props
    const { headers } = await rq.getCommitsTotal(org, repo)

    if (headers.hasOwnProperty('link')) {
      const commitCount = getLastPage(headers.link) // gets last page on github's pagination
      dpCommitCount(commitCount)
    } else { // doensn't show pagination if there's only one page
      dpCommitCount(1)
    }
  }

  async paginate () {
    const { dpPaginateCommits, dpMoreCommits, dpWillGetCommits, current_page, pages, org } = this.props
    const { params } = this.props.match

    if(pages > current_page) {
      dpPaginateCommits()
      dpWillGetCommits('more')
      const { data } = await rq.getCommitsPerPage(org, params.repo, current_page + 1)
      dpMoreCommits(data)
    }
  }

  async getFirstCommits (org, repo) {
    const { dpCommitCount, dpContribCount, dpGetCommits, dpWillGetCommits, dpthrowError } = this.props

    try {
      dpWillGetCommits('first')
      const { data } = await rq.getCommitsPerPage(org, repo, '1')
      dpGetCommits(data)
    } catch ({ ...err }) {
      dpthrowError(`Erro: ${err.response.data.message}`, false)
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
    const { dpWillGetRepos, dpPopulateRepos, dpthrowError, org } = this.props
    const { params } = this.props.match

    try {
      dpWillGetRepos()
      const { data } = await rq.getFirstRepos(org)
      dpPopulateRepos(data.items, data.total_count)

      if (params.hasOwnProperty('repo')) {
        this.populateRepoDetails(data.items, params.repo)
        this.getAllContribs(org, params.repo)
        this.getAllCommits(org, params.repo)
        this.getFirstCommits(org, params.repo)
      }
    } catch ({ ...err }) {
      dpthrowError('Essa organização não existe :(', true)
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
    const {
      loading,
      error,
      repos,
      open_repo,
      commits,
      total_contribs,
      pages,
      current_page,
      loading_commits,
      dpToggleMenu,
      menu_open,
      org
    } = this.props

    return (
      <section className='flex flex-row-ns flex-column'>
        {
          loading
            ? <Loading />
            : <ListRepos
              menuOpen={menu_open}
              toggleMenu={() => dpToggleMenu()}
              open={open_repo.name}
              repos={repos}
              org={org} />
        }

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

const mapStateToProps = ({ allrepos, chooseorg }) => {
  return {
    ...allrepos,
    org: chooseorg.org
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dpWillGetRepos: () => dispatch(action.willGetRepos()),
    dpPopulateRepos: (res, total) => dispatch(action.populateRepos(res, total)),
    dpthrowError: (msg, reset) => dispatch(action.throwError(msg, reset)),
    dpPopulateDetails: res => dispatch(action.populateDetails(res)),
    dpGetCommits: res => dispatch(action.getCommits(res)),
    dpWillGetCommits: moment => dispatch(action.willGetCommits(moment)),
    dpMoreCommits: res => dispatch(action.moreCommits(res)),
    dpContribCount: total => dispatch(action.contribCount(total)),
    dpCommitCount: total => dispatch(action.commitCount(total)),
    dpPaginateCommits: () => dispatch(action.paginateCommits()),
    dpToggleMenu: () => dispatch(action.toggleMenu())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRepos)
