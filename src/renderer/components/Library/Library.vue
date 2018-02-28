<template>
  <div>
    <nav-bar></nav-bar>
    <div class="library__main">
      <div class="library__main__panel"
           :class="{ 'is-visible': panelVisible }">
        <div v-if="selectedView === 'authors'">
          <h1 class="title">Authors</h1>
          <ul>
            <li v-for="author in authors">
              {{ author }}
            </li>
          </ul>
        </div>
        <div v-else-if="selectedView === 'subjects'">
          <h1 class="title">Subjects</h1>
          <ul>
            <li v-for="subject in subjects">
              {{ subject }}
            </li>
          </ul>
        </div>
      </div>
      <div class="library__main__grid">
        <library-grid></library-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LibraryGrid from '@/components/Library/LibraryGrid'
import NavBar from '@/components/Nav/NavBar'
export default {
  name      : 'library',
  components: { LibraryGrid, NavBar },
  computed  : {
    ...mapState({
      selectedView: (state) => state.library.selectedView
    }),
    ...mapGetters({
      authors : 'authors',
      subjects: 'subjects'
    }),
    panelVisible () {
      if (this.selectedView === 'all') {
        return false
      } else {
        return true
      }
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
    max-width: 0;
    transition: all 0.2s ease-out;
    width: 0%;
    
    &.is-visible {
      border-right: solid 1px $grey-lighter;
      flex: 25%;
      -webkit-overflow-scroll: touch;
      overflow-y: scroll;
      padding: 1rem;
      max-width: 25%;
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
