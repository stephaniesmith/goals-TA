import VueRouter from 'vue-router';
import Auth from './components/Auth';
import Home from './components/Home';
import Goals from './components/Goals';

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/auth', component: Auth },
    { path: '/goals', component: Goals }
  ]
});
