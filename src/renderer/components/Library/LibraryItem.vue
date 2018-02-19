<template>
  <div>
    <img alt="" :src="book.thumbnail"/>
    <h1>{{ book.title }}</h1>
    <ul>
      <li v-for="author in book.authors">{{ author.name }}</li>
    </ul>
    <p>
      {{ book.summary }}
    </p>
    <h3>Categories</h3>
    <ul>
      <li v-for="category in book.categories">{{ category }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name : 'library-item',
  props: ['book']
}
</script>

<style>
</style>
