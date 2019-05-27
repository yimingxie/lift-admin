import Vue from 'vue'
import Router from 'vue-router'



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
      component: (resolve) => require(['./views/common/Login.vue'], resolve)
    },
    {
      path: "/lift-list",
      name: "lift-list",
      meta: {
        title: "电梯列表页",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/lift/LiftList.vue'], resolve)
    },
    {
      path: "/map",
      name: "map",
      meta: {
        title: "异常处理地图",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/map/MapList.vue'], resolve)
    },
    {
      path: "/device",
      name: "device",
      meta: {
        title: "设备管理",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/Device.vue'], resolve)
    },
    {
      path: "/device-detail",
      name: "device-detail",
      meta: {
        title: "设备管理详情",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/settings/DeviceDetail.vue'], resolve)
    },
    {
      path: "/lift-device",
      name: "lift-device",
      meta: {
        title: "单部电梯设备列表",
        auto: false // 是否需要权限
      },
      component: (resolve) => require(['./views/lift/LiftDevice.vue'], resolve)
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