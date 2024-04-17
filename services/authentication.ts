import type { AxiosRequestHeaders } from 'axios';
import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'auth';

export function emailValidation(email: string) {
  return makeRequest(
    `https://emailvalidation.abstractapi.com/v1/?api_key=e23c5b9c07dc432796eea058c9d99e82&email=${email}`
  );
}

export function LogIn(params: any) {
  const bodyFormData = new FormData();
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);

  return makeRequest(`/${PREFIX_ROUTE}/login`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function loginFacebook(params: any) {
  const headers = { Authorization: `Bearer ${params.accessToken}` };

  return makeRequest(`/${PREFIX_ROUTE}/login-facebook`, null, {
    method: 'POST',
    headers,
    getResponseHeaders: true
  });
}

export function loginGoogle(params: {
  accessToken?: string;
  authorizationCode?: string;
  redirectUri?: string | 'postmessage';
}) {
  const headers: AxiosRequestHeaders | any = {};
  const bodyFormData = new FormData();

  if (params?.accessToken) {
    headers.Authorization = `Bearer ${params?.accessToken}`;
  }

  if (params?.authorizationCode) {
    bodyFormData.append('authorization_code', params.authorizationCode);
    if (params?.redirectUri) {
      bodyFormData.append('redirect_uri', params.redirectUri);
    }
  }

  return makeRequest(`/${PREFIX_ROUTE}/login-google`, null, {
    method: 'POST',
    headers,
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function getUserByToken(params: { userToken: string }) {
  const headers = { Authorization: `Bearer ${params.userToken}` };

  return makeRequest(`/${PREFIX_ROUTE}/getuser`, null, {
    headers,
    getResponseHeaders: true
  });
}

export function verifySignUp(params: any, type: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('username', params.username);
  bodyFormData.append('email', params.email);
  bodyFormData.append('password', params.password);
  bodyFormData.append('full_name', params.full_name);
  // bodyFormData.append('avatar', params.avatar);

  return makeRequest(`/${PREFIX_ROUTE}/verify-signup/${type}`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function signUp(params: { otp: string; vrfSignupToken: string }) {
  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  const headers = { Authorization: `Bearer ${params.vrfSignupToken}` };

  return makeRequest(`/${PREFIX_ROUTE}/signup`, null, {
    method: 'POST',
    // headers: headers,
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function forgotPassword(email: string, type: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('email', email);

  return makeRequest(`/${PREFIX_ROUTE}/forgot-password/${type}`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function LogOut() {
  return makeRequest(`/${PREFIX_ROUTE}/logout`, null, {
    method: 'POST'
  });
}
