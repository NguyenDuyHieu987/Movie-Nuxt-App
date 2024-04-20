declare global {
  interface Window {
    FB: any;
    google: any;
    fbAsyncInit: any;
  }
}

export async function initFacebookSdk() {
  const nuxtConfig = useRuntimeConfig();

  return await new Promise((resolve: any) => {
    if (process.client) {
      // Add the Facebook SDK for Javascript
      (function (d, s, id) {
        let js: any;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk.js';
        fjs?.parentNode?.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');

      // Wait for facebook sdk to initialize before starting the vue app
      window.fbAsyncInit = function () {
        const FB = window.FB;

        FB.init({
          appId: nuxtConfig.app.facebookAppID,
          cookie: true,
          xfbml: true,
          autoLogAppEvents: true,
          version: 'v18.0'
        });

        // FB.login(function () {});

        if (nuxtConfig.app?.production_mode) {
          window.FB.getLoginStatus((response: any) => {
            // if (response.status === 'connected') {
            //   console.log('getLoginStatus:', response);
            // }
          });
        }

        resolve({ success: true });
      };
    }
  });
}
