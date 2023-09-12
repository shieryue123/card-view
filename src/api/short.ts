import request from "@/utils/request"

const apiHome = {
  addShort: '/short/add',
}

/**
 * 用户登录
 * @param {*} data
 */
export function addShort (data:Object) {
  return request({
    url: apiHome.addShort,
    method: 'post',
    data
  })
}