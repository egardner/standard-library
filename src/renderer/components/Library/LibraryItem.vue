<template>
  <div class="library-item">
    <img alt="" :src="book.thumbnail"/>
  </div>
</template>

<script>
export default {
  name    : 'library-item',
  props   : ['book'],
  computed: {
    authorString () {
      if (this.book.authors.length > 1) {
        let str = this.book.authors.map(a => a.name).join(', ')
        return `By ${str}`
      } else {
        return `By ${this.book.authors[0].name}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.library-item {
  line-height: 0;
  
  img {
    box-shadow: 3px 3px 7px 1px rgba(0, 0, 0, 0.3);
  }    
}
</style>
