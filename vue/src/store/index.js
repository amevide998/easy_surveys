import {createStore} from "vuex"
import axiosClient from "../axios.js";


const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      data: []
    },
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    notification: {
      show: false,
      type: null,
      message: null
    }

  },
  getters: {},
  actions: {
    async getSurvey({commit}, id){
      try {
        commit('setCurrentSurveyLoading', true)
        const response = await axiosClient.get(
          `/survey/${id}`
        )
        commit('setCurrentSurvey', response.data)
        commit('setCurrentSurveyLoading', false)
        return response
      }catch (err){
        commit('setCurrentSurveyLoading', false)
        throw err
      }
    },
    async getSurveys({commit}){
      try {
        commit('setSurveyLoading', true)
        const response = await axiosClient.get(
          `/survey`
        )

        commit('setSurvey', response.data)
        commit('setSurveyLoading', false)
        return response
      }catch (err){
        commit('setSurveyLoading', false)
        throw err
      }
    }
    ,async deleteSurvey({commit}, id){
      await axiosClient.delete(`/survey/${id}`)
    }
    ,async saveSurvey({commit}, survey){
      delete survey.image_url
      let response;
      if(survey.id){
        response = await axiosClient.put(`/survey/${survey.id}`, survey)
        commit('setCurrentSurvey', response.data)
        // return response
      }else {
        response = await axiosClient.post('/survey', survey)
        console.log('store/index/actions/saveSurvey, response : ', response)
        commit('setCurrentSurvey', response.data)
        // return response
      }
      return response
    },
    async register({commit}, user){
      try {
        const  {data} = await axiosClient.post('/register', user)
        commit('setUser', data)
        return data
      }catch (err){
        throw err
      }

    },
    async login({commit}, user){
      try {
        const  {data} = await axiosClient.post('/login', user)
        // const data = response.data
        commit('setUser', data)
        return data
      }catch (err){
        throw err
      }

    },

    async logout({commit}){
      try {
        const response = await axiosClient.post('logout')
        commit('logout')
        return response
      }catch (err){
        console.log('err - store/index/actions/logout, errmsg : ', err)
        throw err
      }
    }

  },
  mutations:{
    setCurrentSurveyLoading(state, loading){
      state.currentSurvey.loading = loading
    },
    setCurrentSurvey(state, survey){
      state.currentSurvey.data = survey.data
    },
    setSurveyLoading(state, loading){
      state.surveys.loading = loading
    },
    setSurvey(state, survey){
      state.surveys.data = survey.data
    },
    saveSurvey: (state, survey) =>{
      state.surveys = [...state.surveys, survey.data]
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map(s => {
        if(s.id === survey.data.id){
          return survey
        }
        return s
      })
    },
    logout: state => {
      state.user.data = {}
      state.user.token = null
      sessionStorage.clear()
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
