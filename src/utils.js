import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/'; // Replace with your API base URL

export async function fetchData(url) {
  const options = {
    url: url,
  };

  return axios.get(options.url);
}

export async function postData(url, data) {
  const options = {
    url: url,
    data: data,
  };

  return axios.post(options.url, options.data);
}
