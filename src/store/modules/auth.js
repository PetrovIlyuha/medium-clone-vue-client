import authApiMethods from '../../api/auth'
import {setItem, getItem, removeItem} from '../../helpers/persistanceService'

const AUTH_MUTATIONS = {
  REGISTER_START: 'registerStart',
  REGISTER_SUCCESS: 'registerSuccess',
  REGISTER_FAILURE: 'registerFailure',
  LOGIN_START: 'loginStart',
  LOGIN_SUCCESS: 'loginSuccess',
  LOGIN_FAILURE: 'loginFailure',
  LOGOUT_USER: 'logoutUser',
  CLEAR_STATE: 'clearState',
  CLEAR_AUTH_MESSAGES: 'clearAuthMessages',
}

const authStoreModule = {
  namespaced: true,
  state: {
    isSubmitting: false,
    user: null,
    errors: null,
    successMessage: null,
  },
  getters: {
    authErrors: (state) => {
      return state.errors
    },
    currentUser: (state) => {
      return state.user
    },
    isSubmitting: (state) => {
      return state.isSubmitting
    },
    isSuccess: (state) => {
      return state.successMessage
    },
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true
    },
    registerSuccess(state, {userResponse, message}) {
      state.isSubmitting = false
      state.user = userResponse
      state.successMessage = message
    },
    registerFailure(state, payload) {
      state.isSubmitting = false
      state.errors = payload
    },
    loginStart(state) {
      state.isSubmitting = true
    },
    loginSuccess(state, {userResponse, message}) {
      state.isSubmitting = false
      state.user = userResponse
      if (message) {
        state.successMessage = message
      }
    },
    loginFailure(state, payload) {
      state.isSubmitting = false
      state.errors = payload
    },
    logoutUser(state) {
      state.user = null
      state.successMessage = 'You have been logged out'
    },
    clearState(state) {
      state.isSubmitting = false
      state.user = null
      state.errors = null
      state.successMessage = null
    },
    clearAuthMessages(state) {
      state.successMessage = null
    },
  },
  actions: {
    async register({commit}, registerFormValues) {
      commit(AUTH_MUTATIONS.REGISTER_START)
      try {
        const response = await authApiMethods.registerUser(registerFormValues)
        commit(AUTH_MUTATIONS.REGISTER_SUCCESS, {
          userResponse: response.data.user,
          message: "You've been successfully registered",
        })
        setItem('accessToken', response.data.user.token)
      } catch (error) {
        console.log(error.response)
        commit(AUTH_MUTATIONS.REGISTER_FAILURE, error.response.data.errors)
      }
    },
    clearState({commit}) {
      commit(AUTH_MUTATIONS.CLEAR_STATE)
    },
    async login({commit}, userLoginFormValues) {
      commit(AUTH_MUTATIONS.LOGIN_START)
      try {
        const response = await authApiMethods.loginUser(userLoginFormValues)
        commit(AUTH_MUTATIONS.LOGIN_SUCCESS, {
          userResponse: response.data.user,
          message: "You've been successfully logged in!",
        })
        setItem('accessToken', response.data.user.token)
        setTimeout(() => {
          commit(AUTH_MUTATIONS.CLEAR_AUTH_MESSAGES)
        }, 2000)
      } catch (error) {
        commit(AUTH_MUTATIONS.LOGIN_FAILURE, error.response.data.errors)
      }
    },
    async getCurrentUser({commit}) {
      try {
        const token = getItem('accessToken')
        if (token !== null) {
          const response = await authApiMethods.getCurrentUser(token)
          commit(AUTH_MUTATIONS.LOGIN_START, {
            userResponse: response.data.user,
          })
          setTimeout(() => {
            commit(AUTH_MUTATIONS.CLEAR_AUTH_MESSAGES)
          }, 1000)
        }
      } catch (error) {
        console.error(error)
        commit(AUTH_MUTATIONS.LOGIN_FAILURE, error.response.data.errors)
      }
    },
    logout({commit}) {
      removeItem('accessToken')
      commit(AUTH_MUTATIONS.LOGOUT_USER)
      setTimeout(() => {
        commit(AUTH_MUTATIONS.CLEAR_STATE)
      }, 1000)
    },
  },
}

export default authStoreModule
