<template>
  <div class="customerDetail">
    <!-- 返回按钮 -->
    <el-button type="primary" icon="el-icon-arrow-left" size="mini" plain @click="toBackCustomer">返回</el-button>
    <!-- 可切换的区域 -->
    <el-tabs stretch v-model="activeName" @tab-click="handleClick">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息" name="first">
        <!-- 头像 -->
        <div class="avator">
          <img :src="customerInfo.imgPhoto" alt />
        </div>
        <!-- 姓名 -->
        <div class="realname">{{customerInfo.realname}}</div>
        <!-- 说说 -->
        <div class="shuoshuo">海纳百川，有容乃大</div>
        <!-- 联系方式 -->
        <div class="tel">联系方式:{{customerInfo.telephone}}</div>
        <!-- 状态 -->
        <div class="status">状态:{{customerInfo.status}}</div>
        <!-- 地址 -->
        <div class="address">地址:{{customerInfo.province + customerInfo.city}}</div>
      </el-tab-pane>
      <!-- 订单信息 -->
      <el-tab-pane label="订单信息" name="second">
        <div class="orderTable">
          <el-table :data="orderData" stripe style="width: 100%">
            <!-- 订单编号 -->
            <el-table-column prop="id" label="订单编号" align="center"></el-table-column>
            <!-- 下单时间 -->
            <el-table-column prop="orderTime" label="下单时间" align="center">
              <template slot-scope="scope">
                {{scope.row.orderTime | dateParse}}
              </template>
            </el-table-column>
            <!-- 总价 -->
            <el-table-column prop="total" label="总价" align="center"></el-table-column>
            <!-- 状态 -->
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <!-- 顾客id -->
            <el-table-column prop="customer.id" label="顾客id" align="center"></el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 服务地址 -->
      <el-tab-pane label="服务地址" name="third">
        <div class="addressTable">
          <el-table :data="addressData" stripe style="width: 100%">
            <!-- 地址编号 -->
            <el-table-column prop="id" label="地址编号" align="center"></el-table-column>
            <!-- 地址 -->
            <el-table-column prop="address" label="地址" align="center">
              <template slot-scope="scope">
                {{scope.row.province + scope.row.city + scope.row.area + scope.row.address}}
              </template>
            </el-table-column>
            <!-- 电话 -->
            <el-table-column prop="telephone" label="电话" align="center"></el-table-column>
            <!-- 顾客id -->
            <el-table-column prop="customerId" label="顾客id" align="center"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入辅助函数
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  created() {
    this.findAllData();
  },
  computed: {
    ...mapState("customer", ["customerInfo", "orderData", "addressData"]),
  },
  methods: {
    // 通过辅助函数 使用actions中的方法
    ...mapActions("customer", ["findCustomerInfoById", "findOrderDataById", "findAddressDataById"]),
    // 获取所有所需数据
    findAllData() {
      // 获取顾客信息
      this.findCustomerInfoById(this.$route.query.id);
      // 根据顾客id获取订单信息
      this.findOrderDataById(this.$route.query.id);
      // 根据顾客id获取地址信息
      this.findAddressDataById(this.$route.query.id);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 返回上一个界面 返回上一级路由
    toBackCustomer() {
      // 编程式导航
      // this.$router.go 参数为正负数 正数 1 负数 -1
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* 设置详情界面的基本样式 */
.customerDetail {
  width: 99%;
  background-color: #fff;
  /* 最小高度 vh视框高度*/
  min-height: calc(100vh - 90px);
  padding: 10px;
  overflow: hidden;
}
/* 设置头像的样式 */
.avator {
  width: 150px;
  height: 150px;
  background-color: gray;
  margin: 0 auto;
  border-radius: 50%;
}
/* 设置头像img的样式 */
.avator img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin: 10px 0 0 10px;
}
/* 设置姓名的样式 */
.realname {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
}
/* 设置说说的样式 */
.shuoshuo {
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
}
/* 统一设置联系方式状态地址 */
.tel,
.status,
.address {
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
}

/* 设置订单表格的样式 */
.orderTable {
  width: 100%;
  /* 最高高度 */
  max-height: 500px;
  padding-bottom: 10px;
  overflow: auto;
}
</style>