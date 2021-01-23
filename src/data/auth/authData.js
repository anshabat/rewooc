import {instance} from "../instance";
import {wcAjax} from "../endpoints";

export default {
  fetchCurrentUser: (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return instance.post(wcAjax('rewooc_get_current_user'), params)
  }
}