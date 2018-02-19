<template>
  <div>
    <h1>Test Test</h1>
    <h2>Books</h2>
    <ul>
      <li v-for="book in books">
        <h1>{{ book.title }}</h1>
        <h2>{{ book.authors }}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService'
export default {
  name: 'library',
  data () {
    return {
      books: []
    }
  },
  created () {
    this.fetchBooks()
  },
  methods: {
    fetchBooks () {
      return BooksService.get().then(response => {
        this.books = response
      })
    }
  }
}
</script>

<style>
</style>
