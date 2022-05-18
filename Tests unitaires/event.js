

const config = {
  apiUrl: {
    myFleetAPI: 'http://localhost:3500/user',
  },
};
export async function getUserTest() {
  return fetch(config.apiUrl.myFleetAPI, {
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