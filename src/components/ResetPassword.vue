<template>
    <!-- 用来显示在登录按钮处选择忘记密码选项时显示的界面 -->
    <div class="container">
        <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 6 }" @submit="handleSubmit">
            <a-form-item label="请输入你的账号">
                <a-input
                v-decorator="['yourName', { rules: [{ required: true, message: '请输入你的账号!' }] }]"
                />
            </a-form-item>

            <a-form-item label="请输入你绑定的手机号">
                <a-input
                v-decorator="['phone', { rules: [{ required: true, message: '请输入你的手机号!' }] }]"
                />
            </a-form-item>

            <a-form-item label="新密码">
                <a-input
                v-decorator="['yourPassword', { rules: [{ required: true, message: '请输入你的密码!' }] }]"
                />
            </a-form-item>

            <a-form-item label="确认新密码">
                <a-input
                v-decorator="['confirmPassword', { rules: [{ required: true, message: '请再次输入你的密码!' }] }]"
                />
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                <a-button type="primary" style="margin: 20px 50px;" @click="cancel">
                取消
                </a-button>
                <a-button type="primary" html-type="submit" style="margin-top: 20px;">
                重置密码
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    export default {
        methods: {
            // 登录组件提交函数
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
                });
            },
            // 取消找回密码按钮触发的事件
            cancel(){
                this.findPassword = false
                this.sendParameter(null, this.findPassword)
            },
            // 定义一个用于向主页(即父组件)传值的方法
            sendParameter(flag, findPassword){
                this.$emit('passwordFunc', flag, findPassword)
            },

        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'normal_login' });
        },
    }
</script>

<style lang="scss">
    .container{
        .loginDialogInfo{
            .findPassword{
                margin: 10px auto;
            }
        }
    }
</style>