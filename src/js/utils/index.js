export const getLastPage = string => {
  if (typeof string !== 'string') {
    return false
  }

  const rxGetPage = /(\?page=\d{1,})/g
  const rxGetNum = /(\d{1,})/g

  const pages = string.match(rxGetPage) ? string.match(rxGetPage)[1] : ''
  const num = pages.match(rxGetNum) ? pages.match(rxGetNum)[0] : false

  return num
}
