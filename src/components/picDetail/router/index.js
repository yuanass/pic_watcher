import picDetail from '../page/picDetail.vue'

export default [
  {
    path: '/pic',
    name: 'pic',
    redirect: {
      name: 'picDetail'
    },
    component: resolve => require(['../app'], resolve),
    children: [
      {
        path: '/picDetail',
        name: 'picDetail',
        component: picDetail
      }
    ]
  }
]
