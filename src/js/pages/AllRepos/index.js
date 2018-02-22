import React, { Component } from 'react'
import { connect } from 'react-redux'
import { populateRepos, populateDetails, setLoadingDetails } from './redux/allrepos'
import { getAllRepos, getDetails } from './requests'
import s from './allrepo-style.css'

import ListRepos from './components/ListRepos'
import RepoDetail from './components/RepoDetail'

class AllRepos extends Component {

  componentDidMount () {
    const { dpPopulateRepos, dpPopulateDetails } = this.props

    getAllRepos('marvin-ai')
      .then(({ data }) => dpPopulateRepos(data.items, data.total_count))
  }

  componentWillReceiveProps(nextProps) {
    const oldparams = this.props.match.params
    const { params } = nextProps.match
    const { dpPopulateDetails, dpSetLoadingDetails } = this.props

    if (params.hasOwnProperty('repo') && params.repo !== oldparams.repo) {
      dpSetLoadingDetails()
      getDetails('marvin-ai', params.repo)
        .then(({ data }) => dpPopulateDetails(data))
    }
  }

  render() {
    const { loading, loading_details, all, details } = this.props

    return (
      <section className='flex bg-light-gray'>
        <div>
          { loading ? 'Loading...' : <ListRepos repos={all} /> }
        </div>

        <div>
          <RepoDetail loading={loading_details} {...details}/>
        </div>
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
