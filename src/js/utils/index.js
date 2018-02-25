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

export const transformDate = date => {
  if (typeof date !== 'string') {
    return false
  }

  const rxDate = /(\d{1,}-\d{1,}-\d{1,})/g

  const cleanDate = date.match(rxDate) ? date.match(rxDate)[0] : []
  const dateArr = cleanDate.indexOf('-') !== -1 ? cleanDate.split('-') : []

  return dateArr.length === 3 ? `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}` : false
}
