import Vue from 'vue'
import Router from 'vue-router'

import Login from "./views/common/Login.vue"
import Admin from "./views/common/Admin.vue"
// import Account from "./views/settings/Account.vue"
import settings from "./views/settings/Index.vue"
import Account from './views/settings/Account'
import Permission from './views/settings/Permission'




Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      meta: {
        title: "登录",
        auto: false // 是否需要权限
      },
      component: Login
    },
    
    {
      path: '/admin/',
      name:'Settings',
      meta: {
        title: "管理员",
        auth: true // 是否需要权限
      },
      // 重定向
      redirect: '/admin/account',
      children: [
        { path: 'account', component: Account },
        { path: 'permission', component: Permission }
      ],
      component: settings,
    },

  ]
})


// router.beforeEach((to, from, next) => {
//   // 判断当前的token是否存在
//   console.log(to.meta)
//   let token = window.localStorage.getItem("user-token")
//   if (to.matched.some(record => record.meta.auth) && (!token || token === null)) {
//     next({
//       path: "/login",
//       query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     })
//   } else {
//     next()
//   }
// })


router.beforeEach((to, from, next) => {
  // 设置标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


export default router