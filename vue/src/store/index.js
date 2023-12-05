import {createStore} from "vuex"
import axiosClient from "../axios.js";


const tmpSurveys = [
  {
    id: 99,
    title: 'what javascript framework you like',
    slug: 'what-javascript-framework-you-like',
    status: 'draft',
    image: '../assets/img_example.jpeg',
    description: 'i want to find out, what javascript framework is most love by developer',
    created_at: '2023-12-01 20:00:00',
    updated_at: '2023-12-01 20:00:00',
    expire_date: '2023-12-31 20:00:00',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'from which country are you ?',
        description: null,
        data: {
          options : [
            {uuid: '38379e70-509b-4339-8052-e0ced588566e', text: 'MOLDOVA'},
            {uuid: 'f4bcc731-938e-49e5-84a5-717df326e993', text: 'FIJI'},
            {uuid: '1b727d18-e131-4a44-9d3a-818c6805e7a3', text: 'LUXEMBURG'},
            {uuid: '8d7068e5-7610-4cd0-b6a9-fa96174ba040', text: 'BOSTWANA'}
          ]
        }
      },
      {
        id: 2,
        type: 'checkbox',
        question: 'what is your role ?',
        description: null,
        data: {
          options : [
            {uuid: '38379e70-509b-938e-8052-e0ced588566e', text: 'Front End Developer'},
            {uuid: 'f4bcc731-938e-938e-84a5-717df326e993', text: 'Back End Developer'},
            {uuid: '1b727d18-e131-938e-9d3a-818c6805e7a3', text: 'UI/UX Designer'},
            {uuid: '8d7068e5-7610-938e-b6a9-fa96174ba040', text: 'Business Analyst'}
          ]
        }
      },
      {
        id: 3,
        type: 'checkbox',
        question: 'what javascript framework do you use ?',
        description: null,
        data: {
          options : [
            {uuid: '38379e70-509b-e131-8052-e0ced588566e', text: 'Svelte'},
            {uuid: 'f4bcc731-938e-e131-84a5-717df326e993', text: 'React'},
            {uuid: '1b727d18-e131-e131-9d3a-818c6805e7a3', text: 'Vue'},
            {uuid: '8d7068e5-7610-e131-b6a9-fa96174ba040', text: 'Angular'}
          ]
        }
      },
      {
        id: 4,
        type: 'text',
        question: 'what javascript framework you most love and why ?',
        description: 'write your honest opinion, everything is anonymous',
        data: {}
      },
    ]
  },
  {
    id: 199,
    title: 'javascript backend framework',
    slug: 'javascript-backend-framework',
    status: 'draft',
    image: '../assets/img_example.jpeg',
    description: 'i want to find out, what javascript backend framework is most love by developer',
    created_at: '2023-12-01 20:00:00',
    updated_at: '2023-12-01 20:00:00',
    expire_date: '2023-12-31 20:00:00',
    questions: [

    ]
  }
]

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
    surveys: [...tmpSurveys],
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],

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
