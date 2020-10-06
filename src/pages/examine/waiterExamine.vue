<template>
  <div class="waiter">
    <!-- 标题 -->
    <div class="waiter_title">员工审核</div>
    <!-- 头部区域 -->
    <div class="waiter_header">
      <!-- 搜索内容 -->
      <el-input v-model="searchInput" placeholder="请输入状态"></el-input>
      <!-- 查询按钮 -->
      <el-button type="primary" @click="searchWaiterByStatus">查询</el-button>
    </div>
    <!-- 表格展示区域 -->
    <div class="waiter_table">
      <el-table :data="waiterObj.list" stripe style="width: 100%">
        <!-- 编号 -->
        <el-table-column prop="id" label="编号" align="center" fixed="left"></el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="realname" label="姓名" align="center" fixed="left"></el-table-column>
        <!-- 手机号 -->
        <el-table-column prop="telephone" label="手机号" width="120" align="center"></el-table-column>
		<!-- 身份证号 -->
        <el-table-column prop="idCard" label="身份证号" width="200" align="center"></el-table-column>
		<!-- 银行卡号 -->
        <el-table-column prop="bankCard" label="银行卡号" width="200" align="center"></el-table-column>
		<!-- 注册时间 -->
        <el-table-column prop="registerTime" label="注册时间" width="200" align="center">
			<template slot-scope="scope">
                {{scope.row.registerTime | dateParse}}
            </template>
		</el-table-column>
        <!-- 状态 -->
        <el-table-column prop="status" label="状态" align="center" width="50" fixed="right"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="50" fixed="right">
          <template slot-scope="scope">
            <span class="setSapn" @click="examineWaiter(scope.row)">审核</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      background
      layout="total, prev, pager, next"
      :total="total">
	</el-pagination>

    <!-- 模态框 -->
    <el-dialog title="审核员工信息" :visible.sync="dialogVisible" width="45%">
      	<!-- 表单结构 -->
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<!-- 用户名 -->
			<el-form-item label="用户名：" prop="username">{{ruleForm.username}}</el-form-item>
			<!-- 姓名 -->
			<el-form-item label="姓名：" prop="realname">{{ruleForm.realname}}</el-form-item>
			<!-- 手机号 -->
			<el-form-item label="手机号：" prop="telephone">{{ruleForm.telephone}}</el-form-item>
			<!-- 身份证正面 -->
			<el-form-item label="身份证正面" prop="idcardPhotoPositive">
				<img class="idCardimg" :src="ruleForm.idcardPhotoPositive" alt />
			</el-form-item>
			<!-- 身份证背面 -->
			<el-form-item label="身份证背面" prop="idcardPhotoNegative">
				<img class="idCardimg" :src="ruleForm.idcardPhotoNegative" alt />
			</el-form-item>
		</el-form>
      	<span slot="footer" class="dialog-footer">
        	<el-button type="primary" @click="passWaiter('ruleForm')">审核通过</el-button>
        	<el-button type="danger" @click="RefuseWaiter('ruleForm')">拒绝审核</el-button>
      	</span>
    </el-dialog>
  </div>
</template>
<script>
// 引入辅助函数
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      	// 搜索框的内容
      	searchInput: "",
      	// 当前页数
      	currentPage: 1,
      	// 每页显示数据的条数
      	pageSize: 10,
      	// 数据总条数
		total: 100,
		// 控制模态框显示与隐藏的属性
		dialogVisible: false,
		// 表单数据对象 可以做为发送相应网络请求时的参数来使用
		ruleForm: {},
    };
  },
  created() {
    // 对应的生命周期钩子函数中进行函数自执行 加载默认数据
    this.findAllWaiterData();
  },
  computed: {
    // 利用辅助函数 获取state中的数据
    ...mapState("waiter", ["waiterObj"]),
  },
  methods: {
    // 辅助函数 来获取actions中的方法
    // 第一个参数 命名空间对应的名称
    ...mapActions("waiter", ["findAllWaiter", "saveOrUpdateWaiter"]),

    // 获取所有员工信息
    findAllWaiterData() {
      // 配置传递的参数
      let params = {
        // 从第一页开始加载数据 请求数据的时候 参数默认从0开始 此时 我们可以使用currentPage - 1即可
        page: this.currentPage - 1,
        pageSize: this.pageSize,
      };
      this.findAllWaiter(params)
        // 加载数据完毕以后 我们可以根据数据 获取到总数据条数
        .then((r) => {
          this.total = this.waiterObj.total;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findAllWaiterData();
    },
    // 根据状态查询数据
    searchWaiterByStatus() {
      // 配置参数
      let params = {
        page: this.currentPage - 1,
        pageSize: this.pageSize,
        status: this.searchInput,
      };
      if (params.status == "") {
        // 如果status参数为空 那么其实就是相当于做了一个分页查询的操作 为了不让它为空的时候影响数据的获取 我们可以直接删除这个属性
        delete params.status;
        this.findAllWaiter(params).then((r) => {
          this.total = this.waiterObj.total;
        });
      } else {
        this.findAllWaiter(params).then((r) => {
          this.total = this.waiterObj.total;
        });
      }
    },

    
		// 审核员工信息
		examineWaiter(row){
			this.ruleForm = {...row}
			// 点击审核按钮弹出模态框
			this.dialogVisible = true
		},

		// 审核通过
		passWaiter(ruleFormRef){
			this.ruleForm.status='启用'
			this.saveOrUpdateWaiter(this.ruleForm).then(r => {
				// 提示是否成功
				let messageInfo = this.ruleForm.realname
				this.$notify({
					title: '通过',
					message: messageInfo + '审核通过!',
					type: 'success'
				});
				// 刷新界面数据
				this.findAllWaiterData()
				// 关闭模态框
				this.dialogVisible = false
			})					
		},

		// 审核未通过
		RefuseWaiter(ruleFormRef){
			this.ruleForm.status='禁用'
			this.saveOrUpdateWaiter(this.ruleForm).then(r => {
				// 提示是否成功
				let messageInfo = this.ruleForm.realname
				this.$notify({
					title: '失败',
					message: messageInfo + '未通过审核',
					type: 'error'
				});
				// 刷新界面数据
				this.findAllWaiterData()
				// 关闭模态框
				this.dialogVisible = false
			})					
		},
  },
};
</script>
<style scoped>
/* 设置waiter整体样式 */
.waiter {
  width: 99%;
  background-color: #fff;
  /* 最小高度 vh视框高度*/
  min-height: calc(100vh - 70px);
  padding: 10px;
  overflow: hidden;
}
/* title设置样式 */
.waiter_title {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
}
/* 设置头部区域样式 */
.waiter_header {
  margin-top: 10px;
  margin-bottom: 10px;
}
/* 输入框的样式 */
.waiter_header .el-input {
  width: 200px;
}
/* 设置表格的样式 */
.waiter_table {
  width: 100%;
  /* 最高高度 */
  max-height: 500px;
  padding-bottom: 10px;
  overflow: auto;
}
/* 设置操作区域样式 */
.setSapn {
  color: #409EFF;
  cursor: pointer;
}
/* 设置身份证正反面照样式 */
.idCardimg{
  width: 20%;
  max-height: 60px;
}
</style>
