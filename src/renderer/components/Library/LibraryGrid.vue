<template>
  <div class="section">
    <ul class="library-grid">
      <li v-for="book in books" class="library-grid__item">
        <library-item :book="book">
        </library-item>
      </li>
    </ul>
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
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 2rem 3rem;
  justify-content: center;
}
</style>
