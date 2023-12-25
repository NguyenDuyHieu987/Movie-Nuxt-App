export async function initGoogleGSIClient() {
  // load google gsi client
  if (process.client) {
    (function (d, s, id) {
      let js: any;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.async = true;
      js.src = 'https://accounts.google.com/gsi/client';
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'google-gsi-client');
  }
}
