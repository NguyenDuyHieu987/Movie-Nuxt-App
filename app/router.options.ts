import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // window.history.scrollRestoration = 'auto';
      return { ...savedPosition, behavior: 'instant' }
    } else {
      return {
        // behavior: 'instant',
        // top: 0,
      }
    }
  }
}
