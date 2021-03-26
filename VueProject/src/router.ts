import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DefaultContainer from '@/views/DefaultContainer.vue';
import PageNotFound from '@/views/404.vue';

import Table from '@/sharedComponents/table/views/Table.vue';
import Map from '@/sharedComponents/map/views/Map.vue';
import Form from '@/sharedComponents/form/views/Form.vue';

Vue.use(Router);

export const createRouter = (kuzzle: any, store: any) => {
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        component: DefaultContainer,
        children: [
          {
            path: '/',
            name: 'home',
            component: Home
          },
          {
            path: 'table',
            name: 'table',
            component: Table
          },
          {
            path: 'map',
            name: 'map',
            component: Map
          },
          {
            path: 'form',
            name: 'form',
            component: Form
          }
        ]
      },
      {
        path: '*',
        component: PageNotFound
      }
    ]
  });

  router.beforeEach(async (to, from, next) => {
    /**
     * This route guard ensures that the app is connected to Kuzzle before
     * passing to the next route.
     */
    const offlinePageDelay = 1500;
    return new Promise(async resolve => {
      setTimeout(() => {
        if (!store.state.app.online) {
          store.commit('app/SET_WAITING_FOR_CONNECTION');
        }
      }, offlinePageDelay);
      const onceConnected = () => {
        store.commit('app/SET_ONLINE');
        setTimeout(() => {
          store.commit('app/UNSET_WAITING_FOR_CONNECTION');
        }, offlinePageDelay);

        kuzzle.removeListener('connected', onceConnected);
        kuzzle.removeListener('reconnected', onceConnected);

        next();
        return resolve(null);
      };
      if (!store.state.app.online) {
        kuzzle.addListener('connected', onceConnected);
        kuzzle.addListener('reconnected', onceConnected);
      } else {
        onceConnected();
      }
    });
  });

  return router;
};
