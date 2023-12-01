import {createStore} from "vuex"
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    }
  },
  getters: {},
  actions: {
    async register({commit}, user){
      const  {data} = await axiosClient.post('/register', user)
      commit('setUser', data)
      return data
    },
    async login({commit}, user){
      const  {data} = await axiosClient.post('/login', user)
      // const data = response.data
      commit('setUser', data)
      return data
    },

  },
  mutations:{
    logout: state => {
      state.user.data = {}
      state.user.token = null
    },
    setUser: (state, userData) => {
      state.user.token = userData.token
      state.user.data = userData.user
      sessionStorage.setItem("TOKEN", userData.token)
    }
  },
  modules: {}
})

export default store;
