import request from "@/utils/request"

const apiHome = {
  addShort: '/short/add',
  shortList: '/short/shortList'
}

/**
 * 添加链接
 * @param {*} data
 */
export function addShort (data:Object) {
  return request({
    url: apiHome.addShort,
    method: 'post',
    data
  })
}

/**
 * 链接列表
 * @param {*} data
 */
export function shortList (data:Object) {
  return request({
    url: apiHome.shortList,
    method: 'post',
    data
  })
}
