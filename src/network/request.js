import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 请联系老师的微信 coderwhy001 获取
    timeout: 5000
  })

  return instance(config)
}
