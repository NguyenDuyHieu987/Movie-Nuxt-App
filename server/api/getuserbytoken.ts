import { getUserToken } from '~/services/authentication'

export default defineEventHandler(async (event) => {
  const utils = useUtils()

  // The getCookie method is available to all
  // Nuxt routes by default. No need to import.
  const token = getCookie('session_token')

  console.log(token)

  // getUserFromDBbyCookie is a placeholder
  // made up for this example. You can fetch
  // data from wherever you want here
  const { result: user } = await getUserToken({
    user_token: utils.localStorage.getWithExpiry('user_token')
  })

  if (user) {
    event.context.user = user
    event.context.session_token = token
  }
})
