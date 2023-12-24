import { makeRequest } from './makeRequest'

export function AccountConfirm(
  params:
    | {
        oldPassword: string;
        newPassword: string;
        logOutAllDevice: boolean;
        email: string;
        newEmail: string;
      }
    | any,
  type: string
) {
  const bodyFormData = new FormData()

  switch (type) {
  case 'change-password':
    bodyFormData.append('old_password', params.oldPassword)
    bodyFormData.append('new_password', params.newPassword)
    bodyFormData.append('logout_all_device', params.logOutAllDevice)
    break
  case 'email':
    bodyFormData.append('email', params.email)
    break
  case 'change-email':
    bodyFormData.append('new_email', params.newEmail)
    break
  }

  return makeRequest(`/account/confirm/${type}`, {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  })
}

export function ChangePassword(params: { otp: string; chgPwdToken: string }) {
  const bodyFormData = new FormData()
  bodyFormData.append('otp', params.otp)

  return makeRequest('/account/change-password', {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  })
}

export function VerifyEmail(params: { otp: string; vrfEmailToken: string }) {
  const bodyFormData = new FormData()
  bodyFormData.append('otp', params.otp)

  return makeRequest('/account/verify-email', {
    method: 'POST',
    data: bodyFormData
  })
}

export function VerifyChangeEmail(chgEmailToken: string) {
  return makeRequest(`/account/change-email?token=${chgEmailToken}`)
}

export function ChangeEmail(params: { chgEmailToken: string; newEmail: string }) {
  const bodyFormData = new FormData()
  bodyFormData.append('new_email', params.newEmail)

  return makeRequest('/account/change-email', {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  })
}

export function ChangeFullname(newfullName: string) {
  const bodyFormData = new FormData()
  bodyFormData.append('new_full_name', newfullName)

  return makeRequest('/account/change-fullname', {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  })
}

export function VerifyResetPassword(rstPwdToken: string) {
  return makeRequest(`/account/reset-password?token=${rstPwdToken}`)
}

export function ResetPassword(params: { rstPwdToken: string; newPassword: string }) {
  const bodyFormData = new FormData()
  bodyFormData.append('new_password', params.newPassword)

  return makeRequest('/account/reset-password', {
    method: 'POST',
    data: bodyFormData,
    getResponseHeaders: true
  })
}
