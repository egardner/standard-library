<template>
  <div class="library">
    <header class="container">
      <div class="column--12">
        <h1>Standard Library</h1>
        <h2>Books</h2>
        
        <h3>Select by Category</h3>
        <select v-model="categorySelection" id="" name="">
          <option value="ALL">All Books</option>
          <option v-for="category in categories" :value="category">{{ category }}</option>
        </select>

        <h3>Select by Author</h3>
        <select v-model="authorSelection" id="" name="">
          <option value="ALL">All Books</option>
          <option v-for="author in authors" :value="author">{{ author }}</option>
        </select>

      </div>
    </header>

    <ul v-if="ready" class="container">
      <li v-for="book in filteredBooks" class="">
        <library-item :book="book"></library-item>
      </li>
    </ul>

    <div v-else>
      Loading...
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
