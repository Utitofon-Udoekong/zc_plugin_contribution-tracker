import { createStore } from 'vuex';
import ContributionServices from "@/services/config.js";

export default createStore({
  state: {
    users: [],
    tickets: [],
    selectedTicket: [],
    description: false,
    addUserModalActive: false,
    addTicketModal: false,
    features: []
  },
  mutations: {
    selectTicket: (state, index) => {
      state.selectedTicket = state.tickets[index];
    },
    openDescription: state => {
      state.description = true
    },
    closeDescription: state => {
      state.description = false
    },
    toggleUserModal: state => {
      state.addUserModalActive =! state.addUserModalActive
    },
    toggleTicketModal: state => {
      state.addTicketModal = !state.addTicketModal
    },
    setUsers(state, payload) { state.users = payload },
    appendUser: (state, payload) => {
      console.log(payload)
    },
    getTicket(state, payload) {
      state.tickets = payload
    },
    setFeatures(state, payload){
      state.features = payload
    }
  },
  actions: {
    async getAllUsers({commit}) {
      await ContributionServices.getAllUsers().then(response => {
        commit("setUsers", response.data)
        console.log(response.data)
      })
    },
    async getAllFeatures() {
      await ContributionServices.getAllFeatures().then(response => {
        // commit("setFeatures", response.data)
        console.log(response.data)
      })
    },
    async getUser(id) {
      await ContributionServices.getUser(id)
    },
    async addUser({ commit }, payload) {
      commit('appendUser', payload)
      await ContributionServices.addUser(payload).then(response => {
        console.log(response.data)
      })
    },
    async getTicket({commit}) {
      await ContributionServices.getTicket().then(response => {
        commit("getTicket", response.data)
      })
    },
    async addTicket({ commit }, payload) {
      commit('toggleTicketModal')
      await ContributionServices.addUser(payload).then(response => {
        console.log(response.data)
      })
    },
    selectTicket({commit}, payload){
      commit('openDescription')
      commit('selectTicket', payload)
    }
  },
  getters: {
    users(state) {
      return state.users
    },
    tickets(state) {
      return state.tickets
    },
    features(state){
      return state.features
    },
    addTicketModal(state){
      return state.addTicketModal
    }
  },
  modules: {
  }
})
