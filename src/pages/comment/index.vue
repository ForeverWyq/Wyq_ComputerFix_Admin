<template>
  <div class="comment">
    <!-- 标题 -->
    <div class="comment_title">评论管理</div>
    <!-- 头部区域 -->
    <div class="comment_header">
    </div>
    <!-- 表格展示区域 -->
    <div class="comment_table">
      <el-table :data="commentObj.list" stripe style="width: 100%">
        <!-- 编号 -->
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <!-- 内容 -->
        <el-table-column prop="content" label="内容" width="300" align="center"></el-table-column>
        <!-- 时间 -->
        <el-table-column prop="commentTime" label="评论时间" width="200" align="center">
			<template slot-scope="scope">
                	{{scope.row.commentTime | dateParse}}
            </template>
		</el-table-column>
        <!-- 状态 -->
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="setSapn" @click="deleteCommentById(scope.row.id)"><i class="el-icon-delete"></i></span>
			<!-- scope.row 点击哪一行的编辑按钮 它就是哪一行的一个对象 -->
            <span class="setSapn" v-if="scope.row.status==='审核不通过'||scope.row.status==='未审核'" @click="PassComment(scope.row.id)">通过</span>
            <span class="setSapn" v-if="scope.row.status==='审核通过'||scope.row.status==='未审核'" @click="RefuseComment(scope.row.id)">拒绝</span>
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
      :total="total"
    ></el-pagination>
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
		// 表单数据对象 可以做为发送相应网络请求时的参数来使用
		ruleForm: {},
    };
  },
  created() {
    // 对应的生命周期钩子函数中进行函数自执行 加载默认数据
    this.findAllCommentData();
  },
  computed: {
    // 利用辅助函数 获取state中的数据
    ...mapState("comment", ["commentObj"]),
  },
  methods: {
    // 辅助函数 来获取actions中的方法
    // 第一个参数 命名空间对应的名称
    ...mapActions("comment", ["findAllComment", "deleteComment", "commentExamine", "commentRefuseExamine"]),

    // 获取所有评论信息
    findAllCommentData() {
      // 配置传递的参数
      let params = {
        // 从第一页开始加载数据 请求数据的时候 参数默认从0开始 此时 我们可以使用currentPage - 1即可
        page: this.currentPage - 1,
        pageSize: this.pageSize,
      };
      this.findAllComment(params)
        // 加载数据完毕以后 我们可以根据数据 获取到总数据条数
        .then((r) => {
          this.total = this.commentObj.total;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findAllCommentData();
    },
    // 根据id删除评论信息
    deleteCommentById(id) {
      this.$confirm("此操作将永久删除该评论信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定的时候触发
          // 执行删除操作
          this.deleteComment(id).then((r) => {
            // 对页数进行处理 Math.ceil向上取整 1.4 -》 2
            const totalPage = Math.ceil(
              (this.commentObj.total - 1) / this.pageSize
            );
            this.currentPage =
              this.currentPage > totalPage ? totalPage : this.currentPage;
            this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
            // 提示删除成功
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 重新刷新页面数据
            this.findAllCommentData();
          });
        })
        .catch(() => {
          // 点击取消的时候触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
	},
	PassComment(id){
		this.commentExamine(id).then((r)=>{
			let messageInfo = "评论通过审核"
			this.findAllCommentData();
			this.$notify({
                title: '通过',
                message: messageInfo,
                type: 'success'
            });
		})
	},
	RefuseComment(id){
		this.commentRefuseExamine(id).then((r)=>{
			let messageInfo = "评论审核不通过"
			this.findAllCommentData();
			this.$notify({
                title: '拒绝',
                message: messageInfo,
                type: 'error'
            });
		})
	}
  },
};
</script>
<style scoped>
/* 设置comment整体样式 */
.comment {
  width: 99%;
  background-color: #fff;
  /* 最小高度 vh视框高度*/
  min-height: calc(100vh - 70px);
  padding: 10px;
  overflow: hidden;
}
/* title设置样式 */
.comment_title {
  /* border-bottom: 1px solid black; */
  padding-bottom: 10px;
}
/* 设置头部区域样式 */
.comment_header {
  margin-top: 10px;
  margin-bottom: 10px;
}
/* 设置表格的样式 */
.comment_table {
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
