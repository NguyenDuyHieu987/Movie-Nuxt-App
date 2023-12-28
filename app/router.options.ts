import { nextTick } from 'vue';
import type { RouteLocationNormalized, RouterScrollBehavior } from 'vue-router';
import type { RouterConfig } from '@nuxt/schema';

type ScrollPosition = Awaited<ReturnType<RouterScrollBehavior>>;

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // window.history.scrollRestoration = 'auto';
      return { ...savedPosition, behavior: 'instant' };
    } else {
      return {
        // behavior: 'instant',
        // top: 0,
      };
    }
  }
};
