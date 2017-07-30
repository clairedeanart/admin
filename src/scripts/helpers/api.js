import request from 'superagent';

export let get = function get(route, query) {
  return makeRequest('get', route)
}

export let post = function post(route, data) {
  return makeRequest('post', route, data)
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
  let url = 'http://api.clairedeanart.com';
  if (path[0] !== '/')
    path = '/' + path
  return url + path;
}

let makeRequest = function(method, route, data) {
  return new Promise(function(resolve, reject) {
    let token = Cache.get('token')
    let r = request[method](getRootUrl(route));

    let files = data && data.files ? data.files : false;
    if (files) r.field('photos', files)

    if ((method === 'post' && !files) || method === 'put') r.send(data)

    if (token) r.set('Authorization', 'Bearer ' + token)
    r.then((response) => {
      resolve(response.body)
    })
    .catch((e) => {
      if (e && e.response && e.response.body && e.response.body.error) {
        reject(e.response.body.error)
      } else reject(e.response)
    })
  });
}

export default {
  get,
  post,
  authenticate,
  upload,
}
