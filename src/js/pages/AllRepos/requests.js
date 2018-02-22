import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.github.com/'
})

export const getAllRepos = orgname => http.get(`/search/repositories?q=org:${orgname}&sort=start&order=desc`)
