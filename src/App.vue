<template>
  <div class="app-container">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">

    <!-- 左侧黑色部分 -->
    <a-layout-sider v-model="collapsed" collapsible class="left">
      <div class="logo">管理功能菜单</div>
        <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
          
          <a-menu-item key="1">
            <router-link to='/epidemicInfo'>
              <a-icon type="edit" />
              <span>疫情分布</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="2">
            <router-link to='/userInfo'>
              <a-icon type="user" />
              <span>用户信息</span>
            </router-link>
          </a-menu-item>
         
          <a-menu-item key="3">
            <router-link to='/publishInfo'>
              <a-icon type="mail" />
              <span>发表信息</span>
            </router-link>
          </a-menu-item>
        </a-menu>
    </a-layout-sider>

    <!-- 右侧白色部分 -->
    <a-layout class="right">
      <!-- 上部: 显示用户登录信息与登录按钮 -->
      <a-layout-header style="background: #fff; padding: 0">
        <LoginBtn @passwordFunc="passwordFunc"></LoginBtn>
      </a-layout-header>
      
      <!-- 中部 -->
      <!-- 用路由实现页面切换 -->
      <div class="CentralContainer">
        <!-- 如果没有登录则显示未登录的界面 -->
        <div class="needLoginInfo">
          <a-layout-content style="margin: 0 16px" v-if=" !flag ">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>用户信息</a-breadcrumb-item>
            <a-breadcrumb-item>后台管理</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            
            <!-- 没有登录显示的提示登录信息 -->
            <div class="loginDialogInfo" v-if=" !findPassword ">
              <h1>你还没有登录，无法查看信息，请先进行登录！！！</h1>
            </div>

            <!-- 当用户选择找回密码时所在中部显示的组件 -->
            <div class="findPassword" v-if=" findPassword ">
              <ResetPassword @passwordFunc="passwordFunc"></ResetPassword>
            </div>

          </div>
          </a-layout-content>
        </div>

        <!-- 如果登录则未登录的界面 -->
        <router-view v-if=" flag "></router-view>
      </div>
      

      <!-- 尾部: 信息说明 -->
      <a-layout-footer style="text-align: center; margin-top: 10px;">
          本项目由专属团队提供
      </a-layout-footer>
      </a-layout>
    </a-layout>

  </div>
</template>

<script>
  // 导入对应的子组件
  import LoginBtn from './components/Login.vue'
  import ResetPassword from './components/ResetPassword.vue'
  export default {
    components: {
      LoginBtn,
      ResetPassword
    },
    data() {
      return {
        // 设置左侧功能组件是否设置功能选项收起状态
        collapsed: false,
        
        // 判断是否显示时间，也用于判断是否进行了登录
        flag: false,

        // 判断是否点击了忘记密码按钮，否则显示未进行登录信息
        findPassword: false,
      };
    },
    
    methods: {
      // 获取登录组件 Login.vue传来的值判断是否进行找回密码
      passwordFunc(flag, findPassword){
        if(flag !=null){
          this.flag = flag
        }
        if(findPassword !=null){
          this.findPassword = findPassword
        }
      },
    },
  }
</script>


<style lang="scss" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .ant-btn{
    width: 100px;
  }
  
  .app-container {
    #components-layout-demo-side .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
      color: #cccccc;
      text-align: center;
      line-height: 32px;
    }

    button {
      width: 65px;
      height: 30px;
    }

    .left.ant-layout-sider.ant-layout-sider-dark.ant-layout-sider-has-trigger {
      .logo {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .right {
      .CentralContainer{
        .needLoginInfo{
          .loginDialogInfo{
            h1{
              text-align: center;
              margin: 180px 0;
            }
          }
        }
      }
    }
  }
</style>
