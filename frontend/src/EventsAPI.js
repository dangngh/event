const api = 'https://glacial-falls-05265.herokuapp.com';

const headers = {
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

export const getEvents = () =>
  fetch(`${api}`, { headers })
    .then(res => res.json())
    .then(events => events)

export const getLocalEvents = (city) =>
  fetch(`${api}/local`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({location: city})
  }).then(res => res.json())
    .then(events => events)