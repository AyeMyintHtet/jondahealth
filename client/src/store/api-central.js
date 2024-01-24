export async function sendAPI(endpoint, entry, data, connectString) {

  let api = `http://localhost:8080/api/${endpoint}`
  if (connectString) {
    api = `${api}/${connectString}`
  }
  let headers = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": '*',
    "Access-Control-Allow-Headers": "X-Requested-With",
    "Access-Control-Allow-Methods": "DELETE,PUT,GET,POST"
  }
  return await fetch(`${api}`, {
    method: entry,

    credentials: 'same-origin',
    headers,

    body: data ? JSON.stringify(data) : null
  }).then(async (response) => {
    const data = await response.json();
    return data
  }).catch(async (err) => {
    return err
  })
}