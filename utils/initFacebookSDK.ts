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
      // wait for facebook sdk to initialize before starting the vue app
      window.fbAsyncInit = function () {
        const FB = window.FB;

        resolve(
          FB.init({
            appId: nuxtConfig.app.facebookAppID,
            cookie: true,
            xfbml: true,
            autoLogAppEvents: true,
            version: 'v17.0'
          })
        );
      };

      // load facebook sdk script
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
    }
  });
}
