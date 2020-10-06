<template>
  <div class="productDetail">
    <!-- 返回按钮 -->
    <el-button type="primary" icon="el-icon-arrow-left" size="mini" plain @click="toBackProduct">返回</el-button>
        <!-- 产品图片 -->
        <div class="avator">
          <img :src="productInfo.photo" alt />
        </div>
        <!-- 产品名称 -->
        <div class="name">{{productInfo.name}}</div>
        <!-- 产品id -->
        <div class="id">产品ID:{{productInfo.id}}</div>
        <!-- 产品描述 -->
        <div class="description">描述:{{productInfo.description}}</div>
        <!-- 产品价格 -->
        <div class="price">价格:{{productInfo.price}}</div>
        <!-- 产品状态 -->
        <div class="status">状态:{{productInfo.status}}</div>
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
    ...mapState("product", ["productInfo"]),
  },
  methods: {
    // 通过辅助函数 使用actions中的方法
    ...mapActions("product", ["findProductInfoById"]),
    // 获取所有所需数据
    findAllData() {
      // 获取产品信息
      this.findProductInfoById(this.$route.query.id);
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 返回上一个界面 返回上一级路由
    toBackProduct() {
      // 编程式导航
      // this.$router.go 参数为正负数 正数 1 负数 -1
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
/* 设置详情界面的基本样式 */
.productDetail {
  width: 99%;
  background-color: #fff;
  /* 最小高度 vh视框高度*/
  min-height: calc(100vh - 70px);
  padding: 10px;
  overflow: hidden;
}
/* 设置图片的样式 */
.avator {
  margin-top: 20px;
  margin-left: calc(50% - 75px) ;
  width: 150px;
  height: 150px;
  background-color: gray;
}
/* 设置img的样式 */
.avator img {
  width: 130px;
  height: 130px;
  margin: 10px 0 0 10px;
}
/* 设置产品名称的样式 */
.name {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
}
/* 统一设置其他 */
.price,
.description,
.id,
.status {
  text-align: center;
  font-size: 20px;
  margin-top: 10px;
}
</style>