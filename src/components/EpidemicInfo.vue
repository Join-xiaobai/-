<template>
    <!-- 疫情分布页面 -->
    <!-- 默认显示的主页 -->
    <div class="container">
       <a-layout-content style="margin: 0 16px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>用户信息</a-breadcrumb-item>
            <a-breadcrumb-item>后台管理</a-breadcrumb-item>
          </a-breadcrumb>
          <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
            <div>
              <h2>全国实时疫情</h2>
              <span class="time">数据统计截止06-21 16:46</span>

              <div style="background: #ECECEC; padding: 30px">
                <a-row :gutter="16" style="margin-bottom: 10px;">
                  <a-col :span="8">
                    <a-card style="text-align:center;">
                      <a-statistic
                        title="累计确诊"
                        :value="85002"
                        :value-style="{ color: '#cf1322' }"
                        style="margin-right: 50px"
                      >
                      <!-- 3f8600 -->
                      </a-statistic>
                      <span style="margin-right: 50px; background-color: #FCF5EF; padding: 0 10px;"> 20号+27 </span>
                    </a-card>
                  </a-col>

                  <a-col :span="8">
                    <a-card style="text-align:center;">
                      <a-statistic
                        title="现存确诊"
                        :value="387"
                        :value-style="{ color: '#cf1322' }"
                        style="margin-right: 50px"
                      >
                      <!-- 3f8600 -->
                      </a-statistic>
                      <span style="margin-right: 50px; background-color: #FCF5EF; padding: 0 10px;"> 20号+20 </span>
                    </a-card>
                  </a-col>

                  <a-col :span="8">
                    <a-card style="text-align:center;">
                      <a-statistic
                        title="输入确诊"
                        :value="1869"
                        :value-style="{ color: '#cf1322' }"
                        style="margin-right: 50px"
                      >
                      <!-- 3f8600 -->
                      </a-statistic>
                      <span style="margin-right: 50px; background-color: #FCF5EF; padding: 0 10px;"> 20号+1 </span>
                    </a-card>
                  </a-col>
                </a-row>

                <a-row :gutter="16" style="margin-bottom: 10px;">
                  <a-col :span="8">
                    <a-card style="text-align:center;">
                      <a-statistic
                        title="无症状感染 "
                        :value="111"
                        :value-style="{ color: '#cf1322' }"
                        style="margin-right: 50px"
                      >
                      <!-- 3f8600 -->
                      </a-statistic>
                      <span style="margin-right: 50px; background-color: #FCF5EF; padding: 0 10px;"> 20号+6 </span>
                    </a-card>
                  </a-col>

                  <a-col :span="8">
                    <a-card style="text-align:center;">
                      <a-statistic
                        title="治愈"
                        :value="779969"
                        :value-style="{ color: '#cf1322' }"
                        style="margin-right: 50px"
                      >
                      <!-- 3f8600 -->
                      </a-statistic>
                      <span style="margin-right: 50px; background-color: #FCF5EF; padding: 0 10px;"> 20号+6 </span>
                    </a-card>
                  </a-col>

                  <a-col :span="8">
                    <a-card style="text-align:center;">
                      <a-statistic
                        title="死亡"
                        :value="4646"
                        :value-style="{ color: '#cf1322' }"
                        style="margin-right: 50px"
                      >
                      <!-- 3f8600 -->
                      </a-statistic>
                      <span style="margin-right: 50px; background-color: #FCF5EF; padding: 0 10px;"> 20号+1 </span>
                    </a-card>
                  </a-col>
                </a-row>
              </div>

              <hr>
              
              <div class="situation">
                <a-table :columns="columns" :data-source="data">
                  <a slot="name" slot-scope="text">{{ text }}</a>
                </a-table>
              </div>
            </div>
          </div>
      </a-layout-content>
    </div>
</template>

<script>
const columns = [
  {
    title: '本地疫情',
    dataIndex: 'local',
    key: 'local',
    scopedSlots: { customRender: 'local' },
  },
  {
    title: '现存确诊',
    dataIndex: 'confirm',
    key: 'confirm',
  },
  {
    title: '累计确诊',
    dataIndex: 'addConfirm',
    key: 'addConfirm',
    ellipsis: true,
  },
  {
    title: '治愈',
    dataIndex: 'treat',
    key: 'treat',
    ellipsis: true,
  },
  {
    title: '死亡',
    dataIndex: 'dead',
    key: 'dead',
    ellipsis: true,
  },
];

const data = [
  {
    key: '1',
    local: '湖南省',
    confirm: '--',
    addConfirm: '1019 +0',
    treat: '1015',
    dead: '4',
  },
  {
    key: '2',
    local: '长沙',
    confirm: '--',
    addConfirm: '242 +0',
    treat: '240',
    dead: '2',
  },
];
  export default {
    data() {
      return {
        data,
        columns,
      };
    },
  }
</script>

<style lang="scss">
  .container{
    h2{
      font-weight: bold;
      font-size: 32px;
      display: inline-block;
      margin-right: 5px;
    }
    .time{
      font-size: 16px;
    }

    .situation {
      .ant-spin-nested-loading {
        .ant-spin-container {
          .ant-pagination.ant-table-pagination{
            display: none;
          }
        }
      }
    }
  }
  .ant-table-body {
    text-align: center;
  }
  .ant-table-row.ant-table-row-level-0 {
    td {
      font-size: 16px;
    }
  }
</style>