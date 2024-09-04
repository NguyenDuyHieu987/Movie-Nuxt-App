import { nextTick } from 'vue';
import type { RouteLocationNormalized, RouterScrollBehavior } from 'vue-router';
import { START_LOCATION } from 'vue-router';
import type { RouterConfig } from '@nuxt/schema';
// via 'nuxt/dist/app/components/utils'
import { isChangingPage } from '#app/components/utils';
import { appPageTransition as defaultPageTransition } from '#build/nuxt.config.mjs';

type ScrollPosition = Awaited<ReturnType<RouterScrollBehavior>>;

// export default <RouterConfig>{
//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       // window.history.scrollRestoration = 'auto';
//       return { ...savedPosition, behavior: 'instant' };
//     } else {
//       return {
//         behavior: 'instant',
//         top: 0
//       };
//     }
//   }
// };

// export default <RouterConfig>{
//   scrollBehavior(to, from, savedPosition) {
//     return {
//       left: 0,
//       top: 0,
//       behavior: 'instant'
//     };
//   }
// };

// export default <RouterConfig>{
//   scrollBehavior(to, from, savedPosition) {
//     const nuxtApp = useNuxtApp();
//     const behavior = useRouter().options?.scrollBehaviorType ?? 'auto';
//     const isFirstLoad = from === START_LOCATION;

//     // By default when the returned position is falsy or an empty object, vue-router will retain the current scroll position
//     // savedPosition is only available for popstate navigations (back button)
//     let position: ScrollPosition = savedPosition || undefined;

//     // console.log('savedPosition:', savedPosition);

//     // if (savedPosition) {
//     //   return savedPosition;
//     // }

//     // if (!isChangingPage(to, from) && !isFirstLoad) {
//     //   nuxtApp.callHook('page:loading:end');
//     // }

//     const routeAllowsScrollToTop =
//       typeof to.meta.scrollToTop === 'function'
//         ? to.meta.scrollToTop(to, from)
//         : to.meta.scrollToTop;

//     if (
//       !position &&
//       from &&
//       to &&
//       routeAllowsScrollToTop !== false &&
//       isChangingPage(to, from) &&
//       // !isFirstLoad &&
//       !to.hash
//     ) {
//       position = { left: 0, top: 0 };
//     }

//     // Hash routes on the same page or first load, no page hook is fired so resolve here
//     if (
//       to.path === from.path ||
//       // isFirstLoad
//       !isChangingPage(to, from)
//     ) {
//       if (from.hash && !to.hash) {
//         return { left: 0, top: 0 };
//       }

//       if (to.hash) {
//         return {
//           el: to.hash,
//           top: _getHashElementScrollMarginTop(to.hash),
//           behavior
//         };
//       }
//     }

//     // Wait for `page:transition:finish` or `page:finish` depending on if transitions are enabled or not
//     const hasTransition = (route: RouteLocationNormalized) => {
//       return (
//         !!(route.meta.pageTransition ?? defaultPageTransition) &&
//         // !isFirstLoad
//         isChangingPage(to, from)
//       );
//     };

//     const hookToWait =
//       // !isFirstLoad
//       isChangingPage(to, from) && hasTransition(from) && hasTransition(to)
//         ? 'page:transition:finish'
//         : 'page:finish';

//     return new Promise((resolve) => {
//       nuxtApp.hooks.hookOnce(hookToWait, async () => {
//         await nextTick();

//         if (to.hash) {
//           // console.log(`scroll to ${to.hash} after ` + hookToWait);
//           const observer = new MutationObserver(async () => {
//             const el = document.querySelector(to.hash);

//             if (el) {
//               observer.disconnect();
//               position = {
//                 el,
//                 top: _getHashElementScrollMarginTop(to.hash),
//                 behavior
//               };
//               await nextTick();
//               el.scrollIntoView();

//               resolve(position);
//             }
//           });
//           observer.observe(document.body, { childList: true, subtree: true });
//         } else {
//           resolve(position);
//         }
//       });
//     });
//   }
// };

function _getHashElementScrollMarginTop(selector: string): number {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
    // ignore any errors parsing scrollMarginTop
  }
  return 0;
}
