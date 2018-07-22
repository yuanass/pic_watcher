import mainPage from '../pages/mainPage.vue'
import reminder from '../pages/reminder.vue'
import addPic from '../pages/addPic.vue'
import message from '../pages/message.vue'
import personalInfo from '../pages/personalInfo.vue'
import search from '../pages/search.vue'

export default [
  {
    path: '/home',
    name: 'home',
    redirect: {
      name: 'mainPage'
    },
    component: resolve => require(['../app'], resolve),
    children: [
      {
        path: 'mainPage',
        name: 'mainPage',
        component: mainPage
      }, {
        path: 'reminder',
        name: 'reminder',
        component: reminder
      }, {
        path: 'addPic',
        name: 'addPic',
        component: addPic
      }, {
        path: 'message',
        name: 'message',
        component: message
      }, {
        path: 'personalInfo',
        name: 'personalInfo',
        component: personalInfo
      }, {
        path: 'search',
        name: 'search',
        component: search
      }
    ]
  }
];
