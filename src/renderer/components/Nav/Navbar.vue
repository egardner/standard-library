<template>
  <nav class="level top-nav">
    <div class="level-item">
      <div class="tabs is-centered is-toggle">
        <ul>
          <li class="is-active">
            <a href="">All Books</a>
          </li>
          <li>
            <a href="">Authors</a>
          </li>
          <li>
            <a href="">Subjects</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss" scoped>
@import "~bulma";

.top-nav {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  background-color: $light;
  border-bottom: solid 1px $grey-lighter;
  line-height: 1;
  padding: 12px 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.navbar-brand {
}
</style>
