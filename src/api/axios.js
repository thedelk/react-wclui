import axios from 'axios'
import { getToken } from './token'

const URL_WCL = process.env.URL_WCL

const Axios = axios.create({
  baseURL: URL_WCL,
  method: `post`
})

// Make sure a token gets sent with each request
Axios.interceptors.request.use(async config => {
  let token = localStorage.getItem(`token`)
  if (!token) token = await getToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

Axios.interceptors.response.use(
  response => response, // Alternatively do other things with the response
  error => {
    if (error.response.status === 401) alert(`nice try`)
    else alert(`great job`)
  }
)

export default Axios
