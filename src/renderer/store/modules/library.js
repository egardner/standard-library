import BooksService from '@/services/BooksService'
import _ from 'lodash'

const state = {
  books          : [],
  query          : '',
  selectedView   : 'all',
  selectedAuthor : 'all',
  selectedSubject: 'all',
  viewOptions    : [
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
    // reset selections in hidden views on view change
    if (payload.view !== 'authors') { state.selectedAuthor = 'all' }
    if (payload.view !== 'subject') { state.selectedSubject = 'all' }

    // now update the view selection
    state.selectedView = payload.view
  },

  updateQuery (state, query) {
    state.query = query
  },

  updateAuthor (state, author) {
    state.selectedAuthor = author
  },

  updateSubject (state, subject) {
    state.selectedSubject = subject
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
    function filterBySubject (book) {
      if (state.selectedSubject === 'all') {
        return book
      } else {
        return _.includes(book.categories, state.selectedSubject)
      }
    }

    function filterByAuthor (book) {
      if (state.selectedAuthor === 'all') {
        return book
      } else {
        return _.includes(_.map(book.authors, 'name'), state.selectedAuthor)
      }
    }

    function filterByQuery (book) {
      return _.includes(JSON.stringify(book).toLowerCase(), state.query.toLowerCase())
    }

    return _
      .chain(state.books)
      .filter(filterBySubject)
      .filter(filterByAuthor)
      .filter(filterByQuery)
      .value()
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
