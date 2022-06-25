import axios from 'axios';
import qs from 'qs';

import { store } from '../../entry_point'

const makeRequest = (method: string, url: string, query: any, body: any, headers: any) => {
  const {accessToken, accessClient, accessUID} = store.getState().auth;

  return new Promise((resolve) => {
    resolve(axios({
      method,
      url: `${url}?${qs.stringify(query)}`,
      data: body,
      headers: {
        'access-token': accessToken,
        client: accessClient,
        uid: accessUID,
        ...headers,
      },
  })
  .catch(error => {return error.response})
  )});
};

const api = {
  get: (url: string, {query = {}, headers = {}} = {}) =>
    makeRequest('GET', url, query, null, headers),
  post: (url: string, {query = {}, body = {}, headers = {}} = {}) =>
    makeRequest('POST', url, query, body, headers),
  put: (url: string, {query = {}, body = {}, headers = {}} = {}) =>
    makeRequest('PUT', url, query, body, headers),
  delete: (url: string, {query = {}, body = {}, headers = {}} = {}) =>
    makeRequest('DELETE', url, query, body, headers),
};

export default api;
