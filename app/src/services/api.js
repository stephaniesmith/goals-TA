const URL = '/api';
const AUTH_URL = `${URL}/auth`;
const GOALS_URL = `${URL}/goals`;

let token = '';

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(body => { 
    throw body.error; 
  });
}

function getHeaders() {
  const headers = { 'Content-type': 'application/json' };
  if(token) headers['Authorization'] = token;
  return headers;
}

function storeUser(user) {
  token = user.id;
  window.localStorage.setItem('user', JSON.stringify(user));
}

export function checkForToken() {
  const json = window.localStorage.getItem('user');
  if(!json) return null;

  const user = JSON.parse(json);
  token = user.id;
  return user;
}

export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeUser(user);
      return user;
    });
}

export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler)
    .then(user => {
      storeUser(user);
      return user;
    });
}

export function signOut() {
  token = '';
  window.localStorage.removeItem('user');
}

export function getGoals() {
  return fetch(GOALS_URL, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function getMyGoals() {
  return fetch(`${GOALS_URL}/me`, {
    headers: getHeaders()
  })
    .then(responseHandler);
}

export function postGoal(goal) {
  return fetch(`${GOALS_URL}/me`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(goal)
  })
    .then(responseHandler);
}

export function putGoal(goal) {
  return fetch(`${GOALS_URL}/me`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(goal)
  })
    .then(responseHandler);
}