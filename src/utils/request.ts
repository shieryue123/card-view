import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
/**
 * 初始化axios
 */
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

let messageInstance:any = null;
const overrideMessage = (options:object) => {
  if (messageInstance) {
  messageInstance.close();
  }
  messageInstance = ElMessage(options);
  };
  
let loading: any = null
const loadingConfig = {
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)'
}
const loadingWhiteList:any = []

request.interceptors.request.use(function (config) {
  if (!loadingWhiteList.includes(config?.url ?? '')) {
    loading = ElLoading.service(loadingConfig)
  }
  const token = localStorage.getItem('token')
  config.headers["Access_Token"] = token
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  loading.close()
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if(response.status === 200){
    overrideMessage({
      message: response.data.message,
      type: 'success'
    })
    return response.data
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  ElMessage({
    message: error.response.data.message,
    type: 'error'
  })
  loading.close()
  return Promise.reject(error)
})
export default request