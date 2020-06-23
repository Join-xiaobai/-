import VueRouter from 'vue-router'

// 用于配置右侧中部的界面路由，便于进行页面切换

// 导入对应的路由组件
import UserInfo from './components/UserInfo.vue'
import PublishInfo from './components/PublishInfo.vue'
import EpidemicInfo from './components/EpidemicInfo.vue'

// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    // 配置路由规则
    { path:'/', redirect:'/epidemicInfo'},
    { path:'/epidemicInfo', component: EpidemicInfo},
    { path:'/userInfo', component: UserInfo},
    { path:'/publishInfo', component: PublishInfo},
  ],
})

// 把路由对象暴露出去
export default router