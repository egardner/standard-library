<template>
  <nav class="level top-nav">
    <div class="level-item">
      <div class="tabs is-centered is-toggle">
        <ul>
          <li v-for="(view, index) in views"
              :class="{ 'is-active': isViewActive(view.value) }"
              :key="`view-${index}`" >
            <a @click="updateView(view.value)">
              <span>{{ view.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name    : 'navbar',
  computed: {
    ...mapState({
      views       : (state) => state.library.viewOptions,
      selectedView: (state) => state.library.selectedView
    })
  },
  methods: {
    isViewActive (view) {
      return view === this.selectedView
    },
    updateView (newView) {
      this.$store.dispatch('updateSelectedView', { view: newView })
    }
  }
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
