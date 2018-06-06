// import { RouteProps } from 'react-router';
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()
// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory()

export default function request (method, url, body) {
  method = method.toUpperCase();
  if (method === 'GET') {
    // fetch的GET不允许有body，参数只能放在url中
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
    console.log('body:', body);
  }
//   console.log(this.RouteProps)
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
    },
    body
  })
    .then((res) => {
      if (res.status === 401) {
        // window.location.replace('#/login'); // 使用原生的这种也行
        history.push('/login');
        return Promise.reject('Unauthorized.');
      } else {
        const token = res.headers.get('access-token');
        if (token) {
          sessionStorage.setItem('access_token', token);
        }
        return res.json();
      }
    });
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);