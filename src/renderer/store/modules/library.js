import BooksService from '@/services/BooksService'
import _ from 'lodash'

const state = {
  books       : [],
  query       : '',
  selectedView: 'all',
  viewOptions : [
    { name: 'All Books', value: 'all' },
    { name: 'Authors', value: 'authors' },
    { name: 'Subjects', value: 'subjects' }
  ]
}

const mutations = {
  addBooks (state, payload) {
    state.books = payload.books
  },

  changeView (state, payload) {
    state.selectedView = payload.view
  },

  updateQuery (state, query) {
    state.query = query
  }
}

const actions = {
  loadBooks ({ commit }) {
    BooksService.get()
      .then(data => {
        commit('addBooks', { books: data })
      })
  },

  updateSelectedView ({ commit }, newSelection) {
    commit('changeView', newSelection)
  }
}

const getters = {
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
  subjects (state) {
    return _
      .chain(state.books)
      .map('categories')
      .flatten()
      .uniq()
      .sort()
      .value()
  },
  filteredBooks (state) {
    return state.books.filter(book => {
      return _.includes(JSON.stringify(book), state.query)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
