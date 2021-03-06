import request from 'superagent';
const API_URL = process.env.API_URL

export let get = function get(route, query) {
  return makeRequest('get', route)
}

export let post = function post(route, data) {
  return makeRequest('post', route, data)
}

export let put = function post(route, data) {
  return makeRequest('put', route, data)
}

export let authenticate = function authenticate() {
  return makeRequest('get', '/auth')
}

export let upload = function upload(files) {
  return makeRequest('post', '/upload', { files });
}

// Private methods
let getRootUrl = function getRootUrl(path) {
  // FIXME: change to env url
  let url = API_URL;
  if (path[0] !== '/')
    path = '/' + path
  return url + path;
}

let makeRequest = function(method, route, data) {
  return new Promise(function(resolve, reject) {
    let token = Cache.get('token');
    let r = request[method](getRootUrl(route));
    let files = data && data.files ? data.files : false;

    if (files)
      r.field('photos', files)

    if ((method === 'post' && !files) || method === 'put')
      r.send(data)

    if (token)
      r.set('Authorization', 'Bearer ' + token)

    return r.then((response) => {
      return resolve(response.body)
    }).catch((e) => {
      if (e && e.response && e.response.body && e.response.body.error) {
        return reject(e.response.body.error)
      } else return reject(e.response)
    })
  });
}

export default {
  get,
  post,
  put,
  authenticate,
  upload,
}
