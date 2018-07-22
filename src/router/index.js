import indexRouter from '../components/mainPage/router'
import loginPage from '../components/userLogin/router'
import picDetail from '../components/picDetail/router'
import personalDetail from '../components/personalDetail/router'
import searchMain from '../components/searchMain/router'

export default {
  routes: [
    ...indexRouter,
    ...loginPage,
    ...picDetail,
    ...personalDetail,
    ...searchMain,
    {
      path: "*",
      redirect: "/home/mainPage"
    }
  ],
  linkActiveClass: 'active'
};
