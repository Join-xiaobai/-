<template>
    <!-- 显示右上部分的登录按钮及其对应的信息的界面 -->
    <div class="container">
        <div class="userInfo">
          <!-- 如果没有登录时显示的信息 -->
          <span v-if="flag">
              登录时间: {{time | formatDate}}
              {{this.hoursTip}}
          </span>
          <span id="info">
            你还没有登录请先登录！！！
          </span>
          <a-button type="primary" class="loginBtn" id="loginBtn" @click="exitLogin">登录</a-button>
          <!-- 登录对话框 -->
          <a-modal v-model="visible" title="登录" on-ok="handleOk" class="loginDialog" width="400px">
            <template slot="footer">
              <a-button key="back" @click="handleCancel">
                取消
              </a-button>
            </template>

            <!-- 点击登录按钮显示的组件 -->
            <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
            >
              <a-button type="middle" style="margin: 10px 30px; padding:0 5px;" @click="chooseLoginWay(1)">
                  账号密码登录
              </a-button>
              <a-button type="middle" style="margin: 10px 30px; padding:0 5px; width:115px;" @click="chooseLoginWay(2)">
                手机验证码登录
              </a-button>
              
              <!-- 账号密码登录界面 -->
              <div class="loginWay1" v-if=" loginWay == 1 ">
                <a-form-item>
                  <a-input
                    v-decorator="[
                      'userName',
                      { rules: [{ required: true, message: '请输入你的账号！' }] },
                    ]"
                    placeholder=" 账号 "
                  >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input-password
                    v-decorator="[
                      'password',
                      { rules: [{ required: true, message: '请输入你的密码！' }] },
                    ]"
                    type="password"
                    placeholder="密码"
                    >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                  </a-input-password>
                </a-form-item>
              </div>

              <!-- 手机验证码登录界面 -->
              <div class="loginWay2" v-if=" loginWay == 2 ">
                <a-form-item>
                  <a-input
                    v-decorator="[
                      'userPhone',
                      { rules: [{ required: true, message: '请输入你的手机号！' }] },
                    ]"
                    placeholder=" 手机号 "
                  >
                    <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
                  </a-input>
                </a-form-item>
                <a-form-item class="code">
                  <a-input-password
                    v-decorator="[
                      'verificationCode',
                      { rules: [{ required: true, message: '请输入验证码！' }] },
                    ]"
                    placeholder="验证码"
                    style="display: inline-block; width: 55%; margin-right: 10px;"
                    >
                    <a-icon slot="prefix" type="check-circle" style="color: rgba(0,0,0,.25)"/>
                  </a-input-password>
                  <a-button type="middle" @click="attainInfo" class="sendMes">
                    点击获取验证码
                  </a-button>
                </a-form-item>
              </div>

              <a-form-item>
                <a-checkbox
                  v-decorator="[
                    'remember',
                    {
                      valuePropName: 'checked',
                      initialValue: false,
                    },
                  ]"
                >
                  记住我
                </a-checkbox>
                <a class="login-form-forgot" href="javascript:void(0)" @click="findUserPassword">
                  忘记密码
                </a>
                <a-button type="primary" html-type="submit" class="login-form-button" @click="userLogin">
                  登录
                </a-button>
                <a href="javascript:void(0)" @click="register">
                  现在注册！
                </a>
              </a-form-item>
            </a-form>
          </a-modal>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {   
                // 保存当前时间
                time: Date.parse(new Date()),
                // 判断是否显示时间，也用于判断是否进行了登录
                flag: false,
                // 登录
                visible: false,
                // 判断现在是什么时候(早中晚)
                hoursTip:' ',
                // 判断是否点击了忘记密码按钮，否则显示未进行登录信息
                findPassword: false,
                // 用于判断是什么方式登录
                loginWay: 1,
                // 倒计时计时器
                timer: '',
            };
        },
        // 过滤器过滤时间
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        methods: {
            // 选择登录方式 1为账号密码登录，2为手机验证码登录
            chooseLoginWay(way){
              this.loginWay = way
            },

            // 判断现在是什么时候
            getMycount:function(){
                let self=this;
                let date=new Date();
                if(date.getHours()>=0&&date.getHours()<12){
                self.hoursTip="上午好"
                }else if(date.getHours()>=12&&date.getHours()<18){
                self.hoursTip="下午好"
                }else{
                self.hoursTip="晚上好"
                }
            },

            // 是否登录
            exitLogin(){
                var info = document.getElementById('info')
                var loginBtn = document.getElementById('loginBtn')
                if(loginBtn.innerText == '退出登录'){
                    info.innerHTML = '你还没有登录请先登录！！！';
                    loginBtn.innerHTML = '登录';
                    this.flag= false
                    this.findPassword = false
                    this.sendParameter(this.flag, this.findPassword)
                }
                else {
                    this.visible = true;
                }
            },

            // 用户登录
            userLogin(){
                var userName =document.getElementById('normal_login_userName')
                var password =document.getElementById('normal_login_password')
                if(userName.value!='' && password.value!=''){
                    if(userName.value=='admin' && password.value=='admin'){
                        var info = document.getElementById('info')
                        var loginBtn = document.getElementById('loginBtn')
                        info.innerHTML = '<a href="javascript:void(0)" style="color: #ff0000;">admin</a>, 欢迎你！';
                        loginBtn.innerText = '退出登录'
                        this.visible = false
                        this.flag=true
                        this.sendParameter(this.flag, null)
                    }
                    else {
                        alert('账号或密码错误！！！')
                    }
                }
            },

            // 登录框
            handleCancel(e) {
                this.visible = false;
            },

            // 登录组件提交函数
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
                });
            },

            // 设置点击获取验证码后 60秒倒计时
            attainInfo(){
              var btn = document.querySelector('.sendMes')
              const self = this
              var time = 60
              this.timer =  setInterval(() =>{
                btn.disabled = true
                btn.innerHTML='请在'+time+'秒后重试'
                time--
                if(time === 0){
                  btn.disabled = false
                  btn.innerHTML= '点击获取验证码'
                  clearInterval(self.timer)
                }
              },1000)
            },
            //发送短信按钮设置
        

            

            // 找回密码方法
            findUserPassword(){
                this.findPassword = true
                this.visible = false
                this.sendParameter(null, this.findPassword)
            },

            // 定义一个用于向主页(即父组件)传值的方法
            sendParameter(flag, findPassword){
                this.$emit('passwordFunc', flag, findPassword)
            },

            // 取消找回密码按钮触发的时间
            cancel(){
                this.findPassword = false
            },

            // 注册提示
            register(){
                alert('此界面为后台界面，请通过管理员及其以上的职位在用户信息中进行添加注册！！！')
            },
        },
        created(){
            this.getMycount()
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
    }
</script>

<style lang="scss">
    .container {
        .userInfo {
          margin-right: 20px;
          float: right;
          .loginBtn {
            margin-left: 10px;
          }
        }
    }
    #components-form-demo-normal-login{
    .login-form {
      max-width: 300px;
    }
    .ant-form-item-children .login-form-forgot {
      float: right;
    }
    .login-form-button.ant-btn.ant-btn-primary {
      width: 100%;
    }
    .code {
      .ant-input-suffix{
        svg{
          display: none;
        }
      }
    }
  } 
</style>