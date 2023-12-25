// import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import Base64 from 'crypto-js/enc-base64';
// import * as jose from 'jose';

// const accountSubject = new BehaviorSubject(null);

export const accountService = {
  apiAuthenticate
};

async function authenticateFacebook(accessToken: string) {
  return await axios
    .get(
      `https://graph.facebook.com/v15.0/me?access_token=${accessToken}&fields=id,name,email,picture`
    )
    .then(async (response) => {
      const { data } = response;
      // if (data.error) return { error: 401, data: data.error.message };

      return {
        ...data
        // token: await generateJwtToken(data),
      };
    });
}

function apiAuthenticate(accessToken: string) {
  // authenticate with the api using a facebook access token,
  // on success the api returns an account object with a JWT auth token
  const account = authenticateFacebook(accessToken);
  // accountSubject.next(account);
  // startAuthenticateTimer();
  return account;
}
