<template>
  <div>
    <nav-bar></nav-bar>
    <div class="library__main">
      <div class="library__main__panel"
           :class="{ 'is-visible': panelVisible }">
        
        <div v-if="selectedView === 'authors'" class="panel">
          <ul>
            <li class="">
              <a href="" class="panel-block">
                All Authors
              </a>
            </li>

            <li v-for="author in authors" class="">
              <a href="" class="panel-block">
                {{ author }}
              </a>
            </li>
          </ul>
        </div>
        
        <div v-else-if="selectedView === 'subjects'" class="panel">
          <ul>
            <li>
              <a href="#" class="panel-block">
                All Subjects
              </a>
            </li>

            <li v-for="subject in subjects">
              <a href="#" class="panel-block">
                {{ subject }}
              </a>
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

    .panel-heading {
      border-radius: 0;
      border-top: 0;
    }

    .panel-block {
      border-bottom: 0;
      font-size: 0.875em;

      &:hover {
        background-color: $link;
        color: $link-invert;
      }
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
