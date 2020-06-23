<template>
    <!-- 用户信息页面 -->
    <div class="container">
      <!-- 中间部分：用户信息界面 -->
      <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>用户信息</a-breadcrumb-item>
            <a-breadcrumb-item>后台管理</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <!-- 按钮部分 -->
            
            <a-button type="primary" class="addBtn" @click="showModal(false)">添加</a-button>
            <a-button class="updateBtn" @click="showModal(true)">修改</a-button>
            <a-button class="deleteBtn" @click="deleteInfo">删除</a-button>


            <!-- 添加用户信息 -->
            <!-- 用于填写增加用户信息的表单 -->
            <div class="addConatainer">
              <a-modal v-model="visible" :title=" isUpdate == false? '添加新的用户信息' : '修改用户信息' " on-ok="handleOk">
                <template slot="footer">
                  <a-button key="back" @click="handleCancel">
                    取消
                  </a-button>
                  <a-button key="submit" type="primary" :loading="confirmLoading" @click="handleOk" v-if=" !isUpdate ">
                    确认添加
                  </a-button>
                  <a-button key="submit" type="primary" :loading="confirmLoading" @click="updateUserInfo" v-if="isUpdate">
                    确认修改
                  </a-button>
                </template>
                <form action="" method="get">
                  <!-- 用户填写信息部分 -->

                  <a-form :layout="formLayout">
                    <a-form-item
                      label="用户基本信息："
                      :label-col="formItemLayout.labelCol"
                      :wrapper-col="formItemLayout.wrapperCol"
                      style="width: 600px;"
                    >
                    </a-form-item>
                    <!-- 注意: v-for 与 v-if 尽量不要一起使用 可用 v-show代替，可能会影响性能等其他因素，且系统默认标红虽然可使用 -->
                    <a-form-item
                      :label= "item.title"
                      :label-col="formItemLayout.labelCol"
                      :wrapper-col="formItemLayout.wrapperCol"
                      v-for="(item, index) in columns"
                      v-show=" item.dataIndex != 'id' "
                      :key="index"
                    >
                      <a-input :placeholder="'请输入你的'+item.title" :id="'userInfo'+item.dataIndex" v-if=" item.dataIndex != 'id' "
                      :value=" isUpdate==true? selectedUsers[0][item.dataIndex]:'' " />
                    </a-form-item>

                  </a-form>

                </form>

              </a-modal>
            </div>

            <a-input-search placeholder="请输入要搜索的用户信息的序号或者用户名内容" enter-button="搜索" @search="onSearch" 
            style="width: 400px; float: right;" @change="searchUserInfo" id="searchUserInfo"/>

            <!-- 表格部分 -->
            <div class="tabler">
              <div style="margin-bottom: 16px">
                <a-button type="primary" :disabled="!hasSelected" :loading="clearLoading" @click="start" class="clearBtn">
                  清空所选的项
                </a-button>
                <span style="margin-left: 8px">
                  <template v-if="hasSelected">
                    {{ `共选择了 ${selectedRowKeys.length} 项` }}
                  </template>
                </span>
              </div>
              <a-table
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                :columns="columns"
                :data-source="newUserInfoData"
              />
            </div>
          </div>
      </a-layout-content>
    </div>
</template>

<script>

  // 用户信息的基本数据
  // 列名
  const columns = [
    {
      title: '用户编号',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '身份',
      dataIndex: 'status',
    },
    {
      title: '账号',
      dataIndex: 'userName',
    },
    {
      title: '密码',
      dataIndex: 'passowrd',
    },
  ];

  // 用户数据
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      id: `${i}`,
      name: `用户${i}`,
      age: `${i+15}`,
      address: `伦敦, 巴黎 Lane no. ${i}`,
      status: `${i%2==0? '管理员':'普通用户'}`,
      userName: `useName${i}`,
      passowrd: `password${i}`,
    });
  }

  export default {
    data() {
      return {
        // 存放表格的数据
        data,
        // 存放表头的标题数据
        columns,
        // 存放被选择的元素的key信息,用来设置被选择的样式
        selectedRowKeys: [],
        // 存放被选择的元素,用来对数据进行修改
        selectedUsers: [],

        // 判断是否加载
        clearLoading: false,
        // 用户提交表单信息的加载
        confirmLoading: false,
        visible: false,

        // 判断用户填表信息表格是呈现什么排列
        formLayout: 'horizontal',

        // 判断是否是更新用户信息操作，否则为添加操作
        isUpdate: false,

        // 额外保存用户的数据信息，用于用户搜索用户信息使用，通过备份防止当想要原数据时丢失，无法回滚数据
        newUserInfoData: [],
      };
    },
    computed: {
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },

      // 添加用户信息的相关函数
      formItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal'
          ? {
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            }
          : {};
      },
      buttonItemLayout() {
        const { formLayout } = this;
        return formLayout === 'horizontal'
          ? {
              wrapperCol: { span: 14, offset: 4 },
            }
          : {};
      },
    },
    created(){
      this.newUserInfoData = data
    },
    methods: {
      // 清空所选择的元素
      start() {
        this.clearLoading = true;
        // ajax request after empty completing
        setTimeout(() => {
          this.clearLoading = false;
          this.selectedRowKeys = [];
        }, 1000);
      },

      // 获取表格中被选择的元素的信息
      // 第一个参数为存储key值索引，会因为元素的删除而重新赋予key值
      // 第二参数为一个对象存储你所选择的对象的所有信息
      onSelectChange(selectedRowKeys, user) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedUsers=[]
        for(var i=0; i< user.length; i++){
          this.selectedUsers.push(user[i])
        }
      },

      // 删除信息
      deleteInfo(){
        if(this.selectedRowKeys!=''){
          // 通过data.indexOf(element)来获取数组的下标从而来得到准确的元素并删除，这样就不会出现表示序号
          // 重新排列的情况，因为删除一个元素后重新排列也可以根据这个方法获取到剩下元素排列后的新下标从而删除
          for(var i=0; i<this.selectedUsers.length; i++){
            data.splice(data.indexOf(this.selectedUsers[i]),1)
          }
        }
        else {
          alert('请选择你要删除的一个或者多个用户！！！')
        }
      },

      // 填写用户信息的相关函数
      // 添加信息开启表单提示框
      showModal(isUpdate) {
        this.isUpdate = isUpdate
        // isupdate 判断是否是更新操作如果是则需要获取用户原来的信息，否则为添加用户信息操作
        if(isUpdate == true){
          if(this.selectedRowKeys!=''){
            if(this.selectedRowKeys.length==1){
              this.visible = true;
            }
            else{
              alert('最多只能一个用户进行信息修改！！！')
              return
            }
          }
          else {
            alert('请选择你要更改信息的一个用户！！！')
            return
          }
        }
        else{
          this.visible = true;
        }
      },
      
      // 更新用户信息的确认按钮函数
      updateUserInfo() {
        setTimeout(() => {
          this.confirmLoading = true;
          var i
          for(i=0; i< this.columns.length; i++){
            if(this.columns[i].dataIndex!='id'){
              var useInfos = document.getElementById('userInfo'+this.columns[i].dataIndex)
              if(useInfos.value==''){
                alert(this.columns[i].title+'信息还未填写！！！')
                break
              }
              else{
                this.$set(data[data.indexOf(this.selectedUsers[0])], this.columns[i].dataIndex, useInfos.value)
              }
            }
          }
          if(i== this.columns.length){
            this.visible = false;
            alert('跟新成功！')
          }
          this.confirmLoading = false;
        }, 1000)
      },

      // 添加用户信息的确认按钮函数
      handleOk(e){
        this.confirmLoading = true;
        setTimeout(() => {
          var i
          var user={}
          for(i=0; i< this.columns.length; i++){
            if(this.columns[i].dataIndex!='id'){
              var useInfos = document.getElementById('userInfo'+this.columns[i].dataIndex)
              if(useInfos.value==''){
                useInfos.value
                break
              }
              else{
                this.$set(user, this.columns[i].dataIndex, useInfos.value)
              }
            }
          }
          if(i== this.columns.length){
            this.visible = false;
            user.key = user.id = this.data.length
            this.data.push(user)
            alert('添加成功！')
          }
          this.confirmLoading = false;
        }, 1000);
      },
      // 取消按钮
      handleCancel(e) {
        this.visible = false;
      },

      // 搜索框的搜素功能函数
      // 当用户按下搜索按钮时搜素用户信息, value为搜索框的内容
      onSearch(value) {
        this.searchUserInfo()
        // 判断数组中是否为空，为空说明没有查询到数据进行提示
        if(this.newUserInfoData == ''){
          alert('没有查询到相关的用户ID号或者用户名！！！')
        }
      },
      // 当用户在输入框输入内容时自动搜索用户信息
      searchUserInfo(){
        this.newUserInfoData= []
        var searContent = document.getElementById('searchUserInfo')
        if(searContent.value != ''){
          for(var i=0; i< data.length; i++){
            var existStrID = data[i].id
            var existStrName = data[i].name
            var searchStr =searContent.value
            if( existStrID.indexOf(searchStr) != -1 ){
              this.newUserInfoData.push( data[i] )
            }
            else if( existStrName.indexOf(searchStr) != -1 ){
              this.newUserInfoData.push( data[i] )
            }
          }
        }
        else {
          this.newUserInfoData= data
        }
      },

    },
  }
</script>

<style lang="scss" scoped>
  .container {
    .tabler {
      margin-top: 20px;

      .clearBtn {
        width: 120px;
      }
    }
  }
</style>