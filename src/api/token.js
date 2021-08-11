import axios from 'axios'

const CLIENT_ID     = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const URI_WCL_TOKEN = process.env.URI_WCL_TOKEN

export const getToken = async () => {
  return await axios
    .post(URI_WCL_TOKEN, {
      client_id:     CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type:    'client_credentials'
    })
    .then(res => {
      localStorage.setItem(`token`, res.data.access_token)
      return res.data.access_token
    })
}
