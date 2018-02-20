<template>
  <div class="card">
    <div
      class="card__image"
      :style="`background-image: url(${book.thumbnail})`">
    </div>
    <div class="card__info">
      <h1 class="card__title">{{ book.title }}</h1>
      <h2 class="card__subtitle">{{ authorString }}</h2>
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

<style scoped>
</style>
