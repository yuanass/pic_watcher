import searchResult from '../page/searchMain.vue';

export default [
  {
    path: '/search',
    name: 'search',
    redirect: {
      name: 'searchResult'
    },
    component: resolve => require(['../app'], resolve),
    children: [
      {
        path: '/searchResult',
        name: 'searchResult',
        component: searchResult
      }
    ]
  }
]
