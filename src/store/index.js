import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import axios from 'axios';

export default store(function () {
  const Store = createStore({
    modules: {
      // example
    },
    actions: {
        async fetchCompany ({ commit }, url='https://auto-pitesti.ro/app/api/companie/') {
          const res = await axios.get(url);
          return commit('loadCompany', res.data)
        },
        async fetchCars({commit}, url) {
          const res = await axios.get(url);
          return commit('loadCars', res.data)
        },
        async fetchCarDetails({commit }, url) {
          try {
            const res = await axios.get(url)
            return commit('loadCarDetails', res.data);
          } catch (error) {
            console.log(error.response.status, error.response.statusText)
            return null
          }
        },
        saveScrollPosition({commit}, data){
          return commit('saveScrollPosition', data)
        },
    },
    mutations: {
      loadCompany: (state, data) => state.companie = data[0],
      loadCars: (state, data) => {
        state.autovehicule = data
      },
      loadCarDetails: (state, data) => {
        state.auto = data
      },
      saveScrollPosition: (state, data) => {
        state[data.varName] = data.posY
      }
    },
    strict: process.env.DEBUGGING
  })

  return Store
})
