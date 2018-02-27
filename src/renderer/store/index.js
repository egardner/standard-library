import Vue from 'vue'
import Vuex from 'vuex'
import BooksService from '@/services/BooksService'
import _ from 'lodash'

// import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  // modules,
  strict: process.env.NODE_ENV !== 'production',

  state: {
    books: []
  },
  mutations: {
    addBooks (state, payload) {
      state.books = payload.books
    }
  },
  actions: {
    loadBooks ({ commit }) {
      BooksService.get()
        .then(data => {
          commit('addBooks', {books: data})
        })
    }
  },
  getters: {
    authors (state) {
      return _
        .chain(state.books)
        .map('authors')
        .flatten()
        .map('name')
        .flatten()
        .uniq()
        .sort()
        .value()
    },
    categories (state) {
      return _
        .chain(state.books)
        .map('categories')
        .flatten()
        .uniq()
        .sort()
        .value()
    }
  }
})
