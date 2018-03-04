<template>
  <div class="library-panel">
    <div v-if="selectedView === 'authors'" class="panel">
      <ul>
        <li class="">
          <a @click="updateSelectedAuthor('all')"
             :class="{ 'is-active': isAuthorSelected('all') }"
             class="panel-block">
            All Authors
          </a>
        </li>

        <li v-for="author in authors" class="">
          <a @click="updateSelectedAuthor(author)"
             :class="{ 'is-active': isAuthorSelected(author) }"
             class="panel-block">
            {{ author }}
          </a>
        </li>
      </ul>
    </div>
        
    <div v-else-if="selectedView === 'subjects'" class="panel">
      <ul>
        <li>
          <a @click="updateSelectedSubject('all')"
             :class="{ 'is-active': isSubjectSelected('all') }"
             class="panel-block">
            All Subjects
          </a>
        </li>

        <li v-for="subject in subjects">
          <a @click="updateSelectedSubject(subject)"
             :class="{ 'is-active': isSubjectSelected(subject) }"
             class="panel-block">
            {{ subject }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name    : 'libraryPanel',
  computed: {
    ...mapState({
      selectedAuthor : (state) => state.library.selectedAuthor,
      selectedSubject: (state) => state.library.selectedSubject,
      selectedView   : (state) => state.library.selectedView
    }),
    ...mapGetters({
      authors : 'authors',
      subjects: 'subjects'
    })
  },
  methods: {
    isAuthorSelected (author) {
      return author === this.selectedAuthor
    },
    
    isSubjectSelected (subject) {
      return subject === this.selectedSubject
    },
    
    updateSelectedAuthor (newAuthor) {
      console.log(newAuthor)
      this.$store.commit('updateAuthor', newAuthor)
    },
    
    updateSelectedSubject (newSubject) {
      console.log(newSubject)
      this.$store.commit('updateSubject', newSubject)
    }
  }
}
</script>

<style lang="scss">
@import "~bulma";
.panel-heading {
  border-radius: 0;
  border-top: 0;
}

.library-panel .panel-block {
  border-bottom: 0;
  font-size: 0.875em;
  
  &:hover {
    background-color: $info;
    color: $link-invert;
  }
  
  &.is-active {
    background-color: $link;
    color: $link-invert;
    
    &:hover {
      background-color: $link;
      color: $link-invert;
    }
  }
}
</style>
