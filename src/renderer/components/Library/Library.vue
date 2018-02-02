<template>
<div>
  <h1>Test Test</h1>
  <h2>Books</h2>
  <ul>
    <li v-for="book in books">
      <library-item :book="book"></library-item>
    </li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
import XML from 'xml2js'
import LibraryItem from '@/components/Library/LibraryItem'

export default {
  name: 'library',
  components: { LibraryItem },
  data () {
    return {
      books: [],
      booksURL: 'https://standardebooks.org/opds/all'
    }
  },
  created () {
    this.getBooks()
  },
  methods: {
    getBooks () {
      let parser = XML.Parser({
        // charsAsChildren: true,
        // explicitChildren: true,
        // preserveChildrenOrder: true,
        // ignoreAttrs: true,
        explicitArray: false,
        trim: true
      })
      axios.get(this.booksURL).then(response => {
        parser.parseString(response.data, (err, data) => {
          if (err) { console.log(err) }
          this.books = data.feed.entry
          data.feed.entry.map(item => {
            console.log(JSON.stringify(item))
          })
        })
      })
    },

    renderNode (node) {
      let builder = new XML.Builder()
      return builder.buildObject(node)
    },

    nameToUpperCase (name) {
      return name.toUpperCase()
    }
  }
}
</script>

<style>
</style>
