<template>
  <div class="waiter">
    <!-- 标题 -->
    <div class="waiter_title">提现审核</div>
    <!-- 表格展示区域 -->
    <div class="waiter_table">
      <el-table :data="waiterShouObj.list" stripe style="width: 100%">
        <!-- 编号 -->
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <!-- 金额 -->
        <el-table-column prop="money" label="金额" align="center"></el-table-column>
        <!-- 类型 -->
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
		    <!-- 描述 -->
        <el-table-column prop="description" label="描述" width="300" align="center"></el-table-column>
		    <!-- 员工id -->
        <el-table-column prop="userId" label="员工ID" align="center"></el-table-column>
        <!-- 上传凭证 -->
        <el-table-column label="凭证" align="center">
          <template slot-scope="scope">
            <span class="setSapn" v-if="scope.row.transferAccounts===null"
             @click="updateTransferAccounts(scope.row)">上传凭证</span>
            <span class="setSapn" v-if="scope.row.transferAccounts!==null"
             @click="checkVoucher(scope.row)">查看凭证</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="setSapn" v-if="scope.row.status===0" @click="cashExamine(scope.row)">审核</span>
            <span class="setSapn" v-if="scope.row.status===1">已审核</span>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%">
      	<!-- 表单结构 -->
		    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!-- 查看凭证 -->
          <el-form-item v-if="dialogTitle==='查看凭证'">
            <div class="avator">
              <img :src="ruleForm.transferAccounts" alt />
            </div>
          </el-form-item>
          <!-- 上传图片 -->
          <el-form-item label="上传凭证" v-if="dialogTitle==='上传凭证'">
            <el-upload class="upload-demo"
            action="http://121.199.29.84:8001/file/upload"
            :on-success="uploadSuccessHandler"
            :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
		    </el-form>
      	<span slot="footer" class="dialog-footer" v-if="dialogTitle==='上传凭证'">
          <el-button @click="dialogVisible = false">取 消</el-button>
        	<el-button type="primary" @click="uploadExamine(ruleForm)">上 传</el-button>
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
      	// 当前页数
      	currentPage: 1,
      	// 每页显示数据的条数
      	pageSize: 10,
      	// 数据总条数
        total: 100,
        // 模态框标题
        dialogTitle:'',
		    // 控制模态框显示与隐藏的属性
		    dialogVisible: false,
		    // 表单数据对象 可以做为发送相应网络请求时的参数来使用
        ruleForm: {},
        // 上传图片
        fileList:[],
    };
  },
  created() {
    // 对应的生命周期钩子函数中进行函数自执行 加载默认数据
    this.findAllWaiterShouData();
  },
  computed: {
    // 利用辅助函数 获取state中的数据
    ...mapState("waiter", ["waiterShouObj"]),
  },
  methods: {
    // 辅助函数 来获取actions中的方法
    // 第一个参数 命名空间对应的名称
    ...mapActions("waiter", ["findAllWaiterShou", "WaiterExamine", "UpLoadExamine"]),

    // 获取所有员工信息
    findAllWaiterShouData() {
      // 配置传递的参数
      let params = {
        // 从第一页开始加载数据 请求数据的时候 参数默认从0开始 此时 我们可以使用currentPage - 1即可
        page: this.currentPage - 1,
        pageSize: this.pageSize,
        type:'提现'
      };
      this.findAllWaiterShou(params)
        // 加载数据完毕以后 我们可以根据数据 获取到总数据条数
        .then((r) => {
          this.total = this.waiterShouObj.total;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findAllWaiterShouData();
    },

		// 上传凭证
		updateTransferAccounts(row){
      this.ruleForm = {...row}
      if(row.status==1){
        this.dialogTitle = '上传凭证'
			  // 点击审核按钮弹出模态框
			  this.dialogVisible = true
      }else{
				this.$notify({
					title: '未审核',
					message: '请先审核',
					type: 'error'
				});
      }
      
    },
    // 查看凭证
    checkVoucher(row){
      this.ruleForm = {...row}
      this.dialogTitle = '查看凭证'
      this.dialogVisible = true
    },

		// 审核通过
		cashExamine(row){
      let accountEmployee = {
        description: row.description,
        id: row.id,
        money: row.money,
        status: 1,
        transferAccounts: row.transferAccounts,
        type: row.type,
        userId: row.userId,
      }
			this.WaiterExamine(accountEmployee).then(r => {
				// 提示是否成功
				this.$notify({
					title: '通过',
					message: '审核通过!',
					type: 'success'
        });
        row.status=1
      });				
    },

    // 上传成功处理
    uploadSuccessHandler(response){
        let photo = "http://121.199.29.84:8888/group1/"+response.data.id
        // 将图片地址设置到form中，便于一起提交到后台
        this.ruleForm.transferAccounts = photo;
    },

    // 上传凭证
    uploadExamine(ruleForm){
      let accountEmployee = {
        description: ruleForm.description,
        id: ruleForm.id,
        money: ruleForm.money,
        status: 1,
        transferAccounts: ruleForm.transferAccounts,
        type: ruleForm.type,
        userId: ruleForm.userId,
      }
      this.UpLoadExamine(accountEmployee).then(r => {
			  // 提示是否成功
			  this.$notify({
					title: '成功',
					message: '凭证上传成功!',
					type: 'success'
          });
          this.dialogVisible = false;
      });	
      this.findAllWaiterShouData();
    }
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
/* 设置图片的样式 */
.avator {
  margin-top: 20px;
  margin-left: calc(45% - 120px) ;
  width: 200px;
  height: 200px;
  background-color: gray;
}
/* 设置img的样式 */
.avator img {
  width: 180px;
  height: 180px;
  margin: 10px 0 0 10px;
}
/* 设置头部区域样式 */
.waiter_header {
  margin-top: 10px;
  margin-bottom: 10px;
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
</style>
