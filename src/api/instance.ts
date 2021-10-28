import axios from 'axios'
import { Config } from '../config'

export const instance = axios.create({
  baseURL: Config.apiUrl,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)
