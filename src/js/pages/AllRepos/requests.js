import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.github.com/'
})

export const getFirstRepos = orgname => http.get(`/search/repositories?q=org:${orgname}&sort=start&order=desc&page=1&per_page=10`)

export const getReposPerPage = (orgname, page) =>
  http.get(`/search/repositories?q=org:${orgname}&sort=start&order=desc&page=${page}&per_page=10`)

export const getCommitsPerPage = (orgname, repo, page) =>
  http.get(`/repos/${orgname}/${repo}/commits?page=${page}&per_page=20`)

export const getContributorsTotal = (orgname, repo) =>
  http.get(`/repos/${orgname}/${repo}/contributors?page=1&per_page=1`)

export const getCommitsTotal = (orgname, repo) =>
  http.get(`/repos/${orgname}/${repo}/commits?page=1&per_page=1`)
