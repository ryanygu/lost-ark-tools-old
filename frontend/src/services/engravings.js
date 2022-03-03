import axios from 'axios'
const baseUrl = '/api/engravings'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const get = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const save = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const engravingService = { getAll, get, setToken, save }

export default engravingService