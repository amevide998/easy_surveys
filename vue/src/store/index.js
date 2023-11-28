import {createStore} from "vuex"

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
      const data = {
        name: user.name,
        email: user.email,
        password: user.password
      }
      const res = await fetch("http://localhost:8000/api/register", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      const result = await res.json()
      commit("setUser", result)
      return result
    }
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
