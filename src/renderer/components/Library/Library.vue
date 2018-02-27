<template>
  <div>
    <nav-bar></nav-bar>
    <div class="library__main">
      <div class="library__main__panel is-active">
        <h1>Foo</h1>
      </div>
      <div class="library__main__grid">
        <library-grid></library-grid>
      </div>
    </div>
  </div>
</template>

<script>
import LibraryGrid from '@/components/Library/LibraryGrid'
import NavBar from '@/components/Nav/NavBar'
export default {
  name      : 'library',
  components: { LibraryGrid, NavBar },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import "~bulma";

.library__main {
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  height: calc(100vh - 59px);
  margin-top: 59px;
  overflow-y: hidden;
  width: 100%;
  
  &__panel {
    background-color: $light;
    height: 100%;
    overflow: hidden;
    width: 0%;
    
    &.is-active {
      border-right: solid 1px $grey-lighter;
      flex: 25%;
      width: 25%;
    }
  }
  
  &__grid {
    flex: 1 1 auto;
    height: 100%;
    overflow-y: scroll;
    width: 75%;
  }
}
</style>
