import {createStore} from "vuex"
import axiosClient from "../axios.js";


const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    dashboard: {
      loading: false,
      data: {}
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      links: [],
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
    async getDashboardData({commit}){
      try {
        commit('setDashboardLoading', true)
        const response = await axiosClient.get('/dashboard')
        commit('setDashboardLoading', false)
        commit('setDashboardData', response.data)
      }catch (err){
        commit('setDashboardLoading', false)
        throw err
      }
    },
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
    async getSurveys({commit}, {url} = {url: null}){
      url = url || '/survey'
      try {
        commit('setSurveyLoading', true)
        const response = await axiosClient.get(
          url
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
        commit('setCurrentSurvey', response.data)
        // return response
      }
      return response
    },

    async getSurveyBySlug({commit}, slug){
      try {
        commit('setCurrentSurveyLoading', true)
        const response = await axiosClient.get(
          `/survey-by-slug/${slug}`
        )
        commit('setCurrentSurvey', response.data)
        commit('setCurrentSurveyLoading', false)
        return response
      }catch (err){
        commit('setCurrentSurveyLoading', false)
        throw err
      }

    },

    async saveSurveyAnswer({commit}, {surveyId, answers}){
      return await axiosClient.post(`/survey/${surveyId}/answer`, {answers})
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
        throw err
      }
    }

  },
  mutations:{
    setDashboardLoading(state, loading){
      state.dashboard.loading = loading
    },
    setDashboardData(state, data){
      state.dashboard.data = data
    },
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
      state.surveys.links = survey.meta.links
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
    },
    notify : (state, {type, message}) => {
      state.notification = {
        show: true,
        type,
        message
      }
      setTimeout(() => {
        state.notification.show = false
      }, 3000)
    }
  },
  modules: {}
})

export default store;
