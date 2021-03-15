import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:3031/api/'


var axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get(endpoint, data,extraParams=false) {
    return ajax(endpoint, 'GET', data,extraParams)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  }
}

async function ajax(endpoint, method = 'get', data = null,extraParams) {
  try {
        let request = {
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
        }

        if(extraParams)
            request.params = data;

        const res = await axios(request);
        return res.data
  } catch (err) {
    console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data} `)
    console.dir(err)
    if (err.response && err.response.status === 401) {
      window.location.assign('/#/login')
    }
    throw err
  }
}
