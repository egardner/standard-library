<template>
<div>
  <h3>{{ book.title }}</h3>
  <h4>{{ authors }}</h4>
  <p>{{ book.summary._ }}</p>

</div>
</template>

<script>
export default {
  name: 'library-item',
  props: ['book'],
  computed: {
    authors () {
      if (Array.isArray(this.book.author)) {
        return this.book.author.map(i => { return i.name })
      } else {
        return this.book.author.name
      }
    }
  }
}
</script>

<style>
</style>
