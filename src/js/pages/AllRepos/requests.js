import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.github.com/'
})

export const load = orgname => http.get(`/orgs/${orgname}`)

export const getAllRepos = orgname => http.get(`/search/repositories?q=org:${orgname}&sort=start&order=desc`)
export const getDetails = (owner, reponame) => http.get(`/repos/${owner}/${reponame}`)
