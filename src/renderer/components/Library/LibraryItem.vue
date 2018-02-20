<template>
  <div class="card">
    <div class="card-image">
      <img alt="" :src="book.thumbnail"/>
    </div>
    <div class="card-info">
      <h1 class="title">{{ book.title }}</h1>
      <h2 class="subtitle">{{ authorString }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name : 'library-item',
  props: ['book'],
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
.card {
  position: relative;
}

.card-image {
  line-height: 0;
}

.card-info {
  background-color: #ff0000;
  color: #fff;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  transition: 500ms ease opacity;
  top: 0;
  width: 100%;

  &:hover {
    opacity: 1;
  }
}
</style>
