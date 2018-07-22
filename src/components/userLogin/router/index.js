import login from '../pages/login.vue'
import signUp from '../pages/signUp.vue'
import changePersonalInfo from '../pages/changePersonalInfo.vue'
import changeSomethings from '../pages/changeSomethings.vue'
import myCollect from '../pages/myCollect.vue'
import myPost from '../pages/myPost.vue'
import accountSafe from '../pages/accountSafe.vue'
import followPage from '../pages/followPage.vue'

export default [
  {
    path: '/user',
    name: 'user',
    component: resolve => require(['../app'], resolve),
    children: [
      {
        path: 'login',
        name: 'login',
        component: login
      }, {
        path: 'signUp',
        name: 'signUp',
        component: signUp
      }, {
        path: 'changePersonalInfo',
        name: 'changePersonalInfo',
        component: changePersonalInfo
      }, {
        path: 'changeSomethings',
        name: 'changeSomethings',
        component: changeSomethings
      }, {
        path: 'myCollect',
        name: 'myCollect',
        component: myCollect
      }, {
        path: 'myPost',
        name: 'myPost',
        component: myPost
      }, {
        path: 'accountSafe',
        name: 'accountSafe',
        component: accountSafe
      }, {
        path: 'followPage',
        name: 'followPage',
        component: followPage
      }
    ]
  }
]
