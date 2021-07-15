import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { ErrorMessage } from '../../shared/errorMessages'
import { IUserToken } from './authTypes'

async function fetchCurrentUser(
  username: string,
  password: string
): Promise<string> {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)

  const response = await instance.post<IUserToken>(
    wcAjax('rewooc_get_current_user'),
    params
  )
  const { success, data } = response.data
  if (!success || !data) {
    throw new Error(ErrorMessage.USER_FAIL_TO_SIGN_IN)
  }

  return data
}

async function checkEmail(email: string): Promise<number | boolean> {
  const response = await instance.get<{
    data: number | boolean
    success: boolean
  }>(wcAjax('rewooc_check_email'), {
    params: { email },
  })
  const { data } = response
  if (!data.success) {
    throw new Error(ErrorMessage.AUTH_FAIL_CHECK_EMAIL)
  }

  return data.data
}

export default {
  fetchCurrentUser,
  checkEmail,
}
