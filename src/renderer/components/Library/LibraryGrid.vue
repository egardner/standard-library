<template>
  <div class="section">
    <div class="library-grid">
      <library-item v-for="book in books" :book="book">
      </library-item>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LibraryItem from '@/components/Library/LibraryItem'
export default {
  name      : 'library-grid',
  components: { LibraryItem },
  computed  : {
    ...mapGetters({
      books: 'filteredBooks'
    })
  },
  methods: {
    ...mapActions(['loadBooks'])
  },
  created () {
    this.loadBooks()
  }
}
</script>

<style lang="scss">
@import "~bulma";

$grid-gap: 2.5em;

.library-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-gap: 2rem 3rem;
  justify-content: space-between;
}
</style>
