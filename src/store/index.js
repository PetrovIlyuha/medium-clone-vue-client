import {createStore} from 'vuex'
import authStoreModule from '@/store/modules/auth'

export default createStore({
  modules: {
    auth: authStoreModule,
  },
})
