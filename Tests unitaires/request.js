

const config = {
  apiUrl: {
    myFleetAPI: 'http://localhost:3500',
  },
};
export async function getUserTest() {
  return fetch(config.apiUrl.myFleetAPI+"/users", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {

      return response.json();
    })
    .catch((reject) => console.log(reject));
}

export async function logUser() {
  return fetch(config.apiUrl.myFleetAPI, {
    method: 'POST',
    data:{"login":"ladmin",password:"admin" },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response.json())
      return response.json();
    })
    .catch((reject) => console.log(reject));
}