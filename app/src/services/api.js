const URL = '/api';
const AUTH_URL = `${URL}/auth`;

let token = '';

export function checkForToken() {
  const json = window.localStorage.getItem('user');
  if(!json) return null;

  const user = JSON.parse(json);
  token = user.id;
  return user;
}