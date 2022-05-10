import request from './request';


export function getUserName(userID) {
  return request(`/events/${userID}`).then(user => user.nom);
}