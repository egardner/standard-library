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
import { mapState, mapActions } from 'vuex'
import LibraryItem from '@/components/Library/LibraryItem'
export default {
  name      : 'library-grid',
  components: { LibraryItem },
  computed  : {
    ...mapState(['books'])
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -($grid-gap) 0 $grid-gap -($grid-gap);
  
  &__item {
    flex: 0 1 33%;
    padding: $grid-gap 0 0 $grid-gap;
    
    @media screen and (min-width: 900px) {
      flex: 0 1 25%;
    }
    
    @media screen and (min-width: 1200px) {
      flex: 0 1 20%;
    }
  }
}
</style>
