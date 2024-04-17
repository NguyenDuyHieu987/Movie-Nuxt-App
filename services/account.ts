import { makeRequest } from './makeRequest';

const PREFIX_ROUTE = 'account';

export function AccountConfirm(
  params: {
    oldPassword?: string;
    newPassword?: string;
    logOutAllDevice?: boolean;
    email?: string;
    newEmail?: string;
  },
  type: string
) {
  const bodyFormData = new FormData();

  switch (type) {
    case 'change-password':
      bodyFormData.append('old_password', params.oldPassword!);
      bodyFormData.append('new_password', params.newPassword!);
      bodyFormData.append('logout_all_device', `${params.logOutAllDevice!}`);
      break;
    case 'email':
      bodyFormData.append('email', params.email!);
      break;
    case 'change-email':
      bodyFormData.append('new_email', params.newEmail!);
      break;
  }

  return makeRequest(`/${PREFIX_ROUTE}/confirm/${type}`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function ChangePassword(params: { otp: string; chgPwdToken: string }) {
  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  return makeRequest(`/${PREFIX_ROUTE}/change-password`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function VerifyEmail(params: { otp: string; vrfEmailToken: string }) {
  const bodyFormData = new FormData();
  bodyFormData.append('otp', params.otp);

  return makeRequest(`/${PREFIX_ROUTE}/verify-email`, null, {
    method: 'POST',
    data: bodyFormData
  });
}

export function VerifyChangeEmail(chgEmailToken: string) {
  return makeRequest(`/${PREFIX_ROUTE}/change-email`, {
    token: chgEmailToken
  });
}

export function ChangeEmail(params: {
  chgEmailToken: string;
  newEmail: string;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('new_email', params.newEmail);

  return makeRequest(`/${PREFIX_ROUTE}/change-email`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function ChangeFullname(newfullName: string) {
  const bodyFormData = new FormData();
  bodyFormData.append('new_full_name', newfullName);

  return makeRequest(`/${PREFIX_ROUTE}/change-fullname`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}

export function VerifyResetPassword(rstPwdToken: string) {
  return makeRequest(`/${PREFIX_ROUTE}/reset-password`, {
    token: rstPwdToken
  });
}

export function ResetPassword(params: {
  rstPwdToken: string;
  newPassword: string;
  logOutAllDevice: boolean;
}) {
  const bodyFormData = new FormData();
  bodyFormData.append('new_password', params.newPassword);
  bodyFormData.append('logout_all_device', `${params.logOutAllDevice}`);

  return makeRequest(`/${PREFIX_ROUTE}/reset-password`, null, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  });
}
