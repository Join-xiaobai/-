// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由模块
Vue.use(VueRouter)

// 全局导入ant组件库中的组件
import Antd from 'ant-design-vue';

// 引入ant样式
import 'ant-design-vue/dist/antd.css';

// 使用ant组件
Vue.use(Antd);

// 导入自己的路由模块
import router from './router.js'

// 导入APP组件
import app from './App.vue'

new Vue({
    el: '#app',
    render: c=> c(app),
    // 挂载路由对象到VM(虚拟机)实例上
    router,
});
