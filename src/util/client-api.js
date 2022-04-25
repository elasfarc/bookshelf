const API_KEY = "AIzaSyCkvWyWH8LFH-Ixh4p4rZyXfA-yYQF_7pI";
const URL = `https://www.googleapis.com/books/v1/volumes`;

const formatUrl = (endpoint, { multiple = true } = {}) =>
  multiple
    ? `${URL}?${endpoint}&key=${API_KEY}&langRestrict=en`
    : `${URL}/${endpoint}`;

function client(endpoint, { multiple, ...rest } = {}) {
  const config = { method: "GET", ...rest };
  const url = formatUrl(endpoint, { multiple });

  return window.fetch(url, config).then(async (res) => {
    const data = await res.json();
    return res.ok ? data : Promise.reject(data);
  });
}

export { client };
