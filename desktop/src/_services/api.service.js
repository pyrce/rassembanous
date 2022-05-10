import Axios from "axios"
import { authenticationService } from './authentication.service';

export const apiService = {
  get(url, data = {}) {
    return Axios({
      method: 'get',
      url: url,
      params: data,
      headers: headers()

    })
  },
  post(url, data = {}) {
    return Axios({
      method: 'post',
      url: url,
      data: data,
      headers: headers()

    })
  },

  delete(url, data = {}) {
    return Axios({
      method: 'delete',
      url: url,
      params: data,
      headers: headers()

    })
  },
}

function headers() {
  const currentUser = authenticationService.currentUserValue || {};
  const authHeader = currentUser.token
    ? { Authorization: "Bearer " + currentUser.token }
    : {};
  return {
    ...authHeader,
    "Content-Type": "application/json",
  }


}