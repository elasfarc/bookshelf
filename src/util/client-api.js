const API_KEY = "AIzaSyCkvWyWH8LFH-Ixh4p4rZyXfA-yYQF_7pI";
const URL = `https://www.googleapis.com/books/v1/volumes`;

function client(endpoint, customConfig = {}) {
  const config = { method: "GET", ...customConfig };
  return window
    .fetch(`${URL}?key=${API_KEY}&${endpoint}&langRestrict=en`, config)
    .then((res) => res.json());
}

export { client };
