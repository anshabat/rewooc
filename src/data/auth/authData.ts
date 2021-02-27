import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { AxiosResponse } from 'axios'

function fetchCurrentUser(
  username: string,
  password: string
): Promise<AxiosResponse<ICurrentUser>> {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)

  return instance.post<ICurrentUser>(wcAjax('rewooc_get_current_user'), params)
}

export default {
  fetchCurrentUser,
}
