import personalDetail from '../pages/personalDetail.vue';
import userDetail from '../pages/userDetail.vue';

export default [
  {
    path: "/userInfo",
    name: 'userInfo',
    component: resolve => require(['../app'], resolve),
    children: [
      {
        path: '/personalDetail',
        name: 'personalDetail',
        component: personalDetail
      },
      {
        path: '/userDetail',
        name: 'userDetail',
        component: userDetail
      }
    ]
  }
]
