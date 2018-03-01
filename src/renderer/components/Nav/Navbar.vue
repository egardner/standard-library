<template>
  <nav class="level top-nav">
    <h1 class="app-title">Standard Library</h1>

    <div class="level-left"></div>
    
    <div class="level-center">
      <div class="level-item">
        <div class="tabs is-centered is-toggle is-small is-fullwidth">
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
    </div>

    
    <div class="level-right">
      <div class="level-item">
        <div class="field">
          <div class="control">
            <input class="input is-small search-input" type="text" placeholder="Rounded input">
          </div>
        </div>
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

<style lang="scss">
$tabs-link-padding: 0.5em 2em;
$tab-background-color: rgb(246, 246, 246);
@import "~bulma";

.app-title {
  display: block;
  font-size: 10pt;
  position: absolute;
  text-align: center;
  top: 8px;
  width: 100%;
}

.level-center {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

.input.search-input {
  width: 200px;
}

.top-nav {
  -webkit-app-region: drag;
  -webkit-user-select: none;
  background: -webkit-linear-gradient(top, #ebebeb, #d5d5d5);
  border-bottom: solid 1px $grey-lighter;
  line-height: 1;
  padding: 28px 8px 12px 8px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.tabs.is-toggle a {
  background-color: $tab-background-color;
  padding: $tabs-link-padding;
}
</style>
