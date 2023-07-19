import request from "@/utils/request"

const apiHome = {
  login: '/home/login'
}

/**
 * 用户登录
 * @param {*} data
 */
export function login (data:Object) {
  return request({
    url: apiHome.login,
    method: 'post',
    data
  })
}
