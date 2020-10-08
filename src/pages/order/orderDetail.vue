<template>
  <div class="orderDetail">
    <!-- 返回按钮 -->
    <el-button type="primary" icon="el-icon-arrow-left" size="mini" plain @click="toBackOrder">返回</el-button>
    <!-- 产品图片 -->
    <div class="avator">
      <span v-for="line in orderInfo.orderLines" :key="line.id">
        <img :src="line.product.photo" alt />
      </span>
    </div>
    <!-- 购买物品 -->
    <div class="product">购买物品:
      <span v-for="line in orderInfo.orderLines" :key="line.id">
            {{line.product.name}}
      </span>
    </div>
    <!-- 订单id -->
    <div class="id">订单ID:{{orderInfo.id}}</div>
    <!-- 物品描述 -->
    <div class="description">物品描述:
      <span v-for="line in orderInfo.orderLines" :key="line.id">
            {{line.product.description}}
      </span>
    </div>
    <!-- 下单时间 -->
    <div class="time">下单时间:{{orderInfo.orderTime | dateParse}}</div>
    <!-- 下单顾客 -->
    <div class="customer">下单顾客:{{orderInfo.customer.realname}}</div>
    <!-- 员工 -->
    <div class="waiter" v-if="orderInfo.status!='待派单'&&orderInfo.status!='待支付'">员工:{{orderInfo.waiter.realname}}</div>
    <!-- 订单价格 -->
    <div class="price">价格:{{orderInfo.total}}</div>
    <div class="address">服务地点：
      {{orderInfo.address.province}}{{orderInfo.address.city}}{{orderInfo.address.area}}{{orderInfo.address.address}}
    </div>
    <!-- 订单状态 -->
    <div class="status">状态:{{orderInfo.status}}</div>
  </div>
</template>

<script>
// 引入辅助函数
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  created() {
    this.findAllData();
  },
  computed: {
    ...mapState("order", ["orderInfo"]),
  },
  methods: {
    // 通过辅助函数 使用actions中的方法
    ...mapActions("order", ["findOrderInfoById"]),
    // 获取所有所需数据
    findAllData() {
      // 根据订单id获取订单信息
      this.findOrderInfoById(this.$route.query.id);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 返回上一个界面 返回上一级路由
    toBackOrder() {
      // 编程式导航
      // this.$router.go 参数为正负数 正数 1 负数 -1
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* 设置详情界面的基本样式 */
.orderDetail {
  width: 99%;
  background-color: #fff;
  /* 最小高度 vh视框高度*/
  min-height: calc(100vh - 90px);
  padding: 10px;
  overflow: hidden;
}
/* 设置图片的样式 */
.avator {
  margin-top: 20px;
  margin-left: calc(50% - 75px) ;
  width: 150px;
  height: 150px;
  background-color: antiquewhite;
}
/* 设置img的样式 */
.avator img {
  width: 130px;
  height: 130px;
  margin: 10px 0 0 10px;
}
/* 设置产品名称的样式 */
.product {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
}

/* 统一设置显示 */
.id,
.description,
.status,
.time,
.customer,
.waiter,
.address,
.price {
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
}
</style>