<template>
  <div>
    <nav-bar></nav-bar>
    <div class="library__main">
      <library-panel class="library__main__panel"
                     :class="{ 'is-visible': panelVisible }">
      </library-panel>
      <div class="library__main__grid">
        <library-grid></library-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LibraryGrid from '@/components/Library/LibraryGrid'
import LibraryPanel from '@/components/Library/LibraryPanel'
import NavBar from '@/components/Nav/NavBar'
export default {
  name      : 'library',
  components: { LibraryGrid, LibraryPanel, NavBar },
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
  margin-top: 67px;
  overflow-y: hidden;
  width: 100%;
  
  &__panel {
    background-color: $light;
    font-size: 0.75em;
    height: 100%;
    overflow: hidden;
    max-width: 0;
    transition: all 0.2s ease-out;
    width: 0%;
    
    &.is-visible {
      flex: 25%;
      -webkit-overflow-scroll: touch;
      overflow-y: scroll;
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
