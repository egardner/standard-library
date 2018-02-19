<template>
  <div>
    <h1>Standard Library</h1>
    <h2>Books</h2>
    <ul v-if="ready">
      <li v-for="book in books">
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
export default {
  name      : 'library',
  components: { LibraryItem },
  data () {
    return {
      books: [],
      ready: false
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
    }
  }
}
</script>

<style scoped>
  li {
  border: solid 1px #333;
  margin-bottom: 1rem;
  }
</style>
