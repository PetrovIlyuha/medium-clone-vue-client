import axios from '@/api/axiosSetup'

const registerUser = (userRegisterFormValues) => {
  return axios.post('/users', {user: userRegisterFormValues})
}

const loginUser = (userLoginFormValues) => {
  return axios.post('/users/login', {user: userLoginFormValues})
}

const getCurrentUser = (token) => {
  return axios.get('/user', {headers: {Authorization: 'Token ' + token}})
}

export default {
  registerUser,
  loginUser,
  getCurrentUser,
}
