import Vue from 'vue'
import Router from 'vue-router'

import Library from '@/components/Library/Library'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'library',
      component: Library
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
