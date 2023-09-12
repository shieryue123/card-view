import request from "@/utils/request"

const apiHome = {
  login: '/home/login',
  register: '/home/register'
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

/**
 * 用户注册
 * @param {*} data
 */
export function register (data:Object) {
  return request({
    url: apiHome.register,
    method: 'post',
    data
  })
}
