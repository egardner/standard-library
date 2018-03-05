<template>
  <div class="library-item">
    <a @click="toggleActive">
      <img alt="" :src="book.thumbnail"/>
    </a>
    <div v-if="active" class="library-item__info">
      <div class="library-item__info__inner">
        <h2>{{ book.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'library-item',
  props: ['book'],
  data () {
    return {
      active: false
    }
  },
  computed: {
    authorString () {
      if (this.book.authors.length > 1) {
        let str = this.book.authors.map(a => a.name).join(', ')
        return `By ${str}`
      } else {
        return `By ${this.book.authors[0].name}`
      }
    }
  },
  methods: {
    toggleActive () {
      this.active = !this.active
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma";

.library-item {
  line-height: 0;
  
  img {
    box-shadow: 3px 3px 7px 1px rgba(0, 0, 0, 0.3);
  }
  
  &__info {
    grid-column-start: 1;
    grid-column-end: -1;
    height: 300px;
    position: relative;
    top: 1rem;
    
    &__inner {
      background-color: $light;
      height: 100%;
      left: 0;
      position: absolute;
      width: calc(100vw - 3rem);
    }
  }
}
</style>
