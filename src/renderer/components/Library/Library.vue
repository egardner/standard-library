<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-1">Standard Library</h1>
      <h2 class="subtitle is-3">Books</h2>
      
      <div class="field">
        <div class="columns">

          <div class="column">
            <div class="control is-expanded">
              <label class="label" for="">Filter by Author</label>
              <span class="select is-fullwidth">
                <select v-model="authorSelection" id="" name="">
                  <option value="ALL">All</option>
                  <option v-for="author in authors"
                          :value="author">{{ author }}</option>
                </select>
              </span>
            </div>
          </div>

          <div class="column">
            <div class="control is-expanded">
              <label class="label" for="">Filter by Category</label>
              <span class="select is-fullwidth">
                <select v-model="categorySelection" id="" name="">
                  <option value="ALL">All</option>
                  <option v-for="category in categories"
                          :value="category">{{ category }}</option>
                </select>
              </span>
            </div>
          </div>

        </div>
      </div>
        
      <ul v-if="ready" class="columns is-multiline is-mobile">
        <li v-for="book in filteredBooks" class="column is-one-quarter">
          <library-item :book="book"></library-item>
        </li>
      </ul>

      <div v-else>Loading...</div>

      </div>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService'
import LibraryItem from '@/components/Library/LibraryItem'
import _ from 'lodash'
export default {
  name      : 'library',
  components: { LibraryItem },
  data () {
    return {
      books: [],
      ready: false,
      categorySelection: 'ALL',
      authorSelection: 'ALL'
    }
  },
  computed: {
    authors () {
      return _
        .chain(this.books)
        .map('authors')
        .flatten()
        .map('name')
        .flatten()
        .uniq()
        .sort()
        .value()
    },
    categories () {
      return _
        .chain(this.books)
        .map('categories')
        .flatten()
        .uniq()
        .sort()
        .value()
    },
    filteredBooks () {
      return _
        .chain(this.books)
        .filter(this.filterByCategory)
        .filter(this.filterByAuthor)
        .value()
    }
  },
  created () {
    this.fetchBooks()
  },
  methods: {
    fetchBooks () {
      return BooksService.get().then(response => {
        this.books = response
        this.ready = true
      })
    },
    filterByCategory (book) {
      if (this.categorySelection === 'ALL') {
        return book
      } else {
        return _.includes(book.categories, this.categorySelection)
      }
    },
    filterByAuthor (book) {
      if (this.authorSelection === 'ALL') {
        return book
      } else {
        return _.includes(_.map(book.authors, 'name'), this.authorSelection)
      }
    }
  }
}
</script>

<style>
</style>
