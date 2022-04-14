const API_KEY = "AIzaSyCkvWyWH8LFH-Ixh4p4rZyXfA-yYQF_7pI";
const URL = `https://www.googleapis.com/books/v1/volumes`;

function client(endpoint, customConfig = {}) {
  const config = { method: "GET", ...customConfig };
  window
    .fetch(`${URL}?key=${API_KEY}&${endpoint}&langRestrict=en`, config)
    .then(async (res) => {
      const data = await res.json();
      return data.ok ? data : Promise.reject(data);
    });
}

export { client };
