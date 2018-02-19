<template>
<div>
  <a :href="epubLink">
    <img v-if="thumbnailLink" :src="thumbnailLink"/>
    <h3>{{ book.title }}</h3>
    <h4>{{ authors }}</h4>
    <p>{{ book.summary._ }}</p>
  </a>
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
    },
    thumbnailLink () {
      if (this.book.link.length > 0) {
        let link = this.book.link.find(l => {
          return l.$.rel === 'http://opds-spec.org/image/thumbnail'
        })
        return `https://standardebooks.org/${link.$.href}`
      } else {
        return false
      }
    },
    epubLink () {
      if (this.book.link.length > 0) {
        let link = this.book.link.find(l => {
          return l.$.type === 'application/epub+zip' &&
            l.$.href.match(/(\.epub$)/)
        })
        return `https://standardebooks.org/${link.$.href}`
      } else {
        return false
      }
    }
  }
}
</script>

<style>
</style>
