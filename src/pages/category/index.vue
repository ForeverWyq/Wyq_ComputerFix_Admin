<template>
  <div class="category">
    <!-- 标题 -->
    <div class="category_title">栏目管理</div>
    <!-- 头部区域 -->
    <div class="category_header">
      <!-- 新增按钮 -->
      <el-button type="primary" @click="addCategory">添加</el-button>
      <!-- 搜索内容 -->
      <el-input v-model="searchInput" placeholder="请输入栏目名称"></el-input>
      <!-- 查询按钮 -->
      <el-button type="primary" @click="searchCategoryByName">查询</el-button>
    </div>
    <!-- 表格展示区域 -->
    <div class="category_table">
      <el-table :data="categoryObj.list" stripe style="width: 100%">
        <!-- 编号 -->
        <el-table-column prop="id" label="编号" align="center"></el-table-column>
        <!-- 名称 -->
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
       	<!-- 序号 -->
        <el-table-column prop="num" label="序号" align="center"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span class="setSapn" @click="deleteCategoryById(scope.row.id)"><i class="el-icon-delete"></i></span>
						<!-- scope.row 点击哪一行的编辑按钮 它就是哪一行的一个对象 -->
            <span class="setSapn" @click="editCategory(scope.row)"><i class="el-icon-edit"></i></span>
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
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<!-- 栏目名称 -->
				<el-form-item label="栏目名称" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>

				<!-- 序号 -->
				<el-form-item label="序号" prop="num">
					<el-input v-model="ruleForm.num"></el-input>
				</el-form-item>

				<!--  上传图片 -->
				<el-form-item label="上传图片">
                <el-upload
                class="upload-demo"
                action="http://121.199.29.84:8001/file/upload"
                :on-success="uploadSuccessHandler"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
				</el-form-item>
			</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false,this.fileList=[]">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate('ruleForm')">确 定</el-button>
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
		    // 模态框的标题
		    dialogTitle: '',
		    // 表单数据对象 可以做为发送相应网络请求时的参数来使用
		    ruleForm: {},
		    // 表单验证规则
		    rules: {
			    name: [
				    { required: true, message: '请输入栏目名称', trigger: 'blur' }
			    ], 
			    num: [
				    { required: true, message: '请输入栏目序号', trigger: 'blur' }
			    ], 
		    },
		    // 上传文件所用
		    fileList:[],
    };
  },
  created() {
    // 对应的生命周期钩子函数中进行函数自执行 加载默认数据
    this.findAllCategoryData();
  },
  computed: {
    // 利用辅助函数 获取state中的数据
    ...mapState("category", ["categoryObj"]),
  },
  methods: {
    // 辅助函数 来获取actions中的方法
    // 第一个参数 命名空间对应的名称
    ...mapActions("category", ["findAllCategory", "deleteCategory","saveOrUpdateCategory"]),

    // 获取所有栏目信息
    findAllCategoryData() {
      // 配置传递的参数
      let params = {
        // 从第一页开始加载数据 请求数据的时候 参数默认从0开始 此时 我们可以使用currentPage - 1即可
        page: this.currentPage - 1,
        pageSize: this.pageSize,
      };
      this.findAllCategory(params)
        // 加载数据完毕以后 我们可以根据数据 获取到总数据条数
        .then((r) => {
          this.total = this.categoryObj.total;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findAllCategoryData();
    },
    // 根据栏目名称查询数据
    searchCategoryByName() {
      // 配置参数
      let params = {
        page: this.currentPage - 1,
        pageSize: this.pageSize,
        name: this.searchInput,
      };
      if (params.name == "") {
        // 如果name参数为空 那么其实就是相当于做了一个分页查询的操作 为了不让它为空的时候影响数据的获取 我们可以直接删除这个属性
        delete params.name;
        this.findAllCategory(params).then((r) => {
          this.total = this.categoryObj.total;
        });
      } else {
        this.findAllCategory(params).then((r) => {
          this.total = this.categoryObj.total;
        });
      }
    },

    // 根据id删除栏目信息
    deleteCategoryById(id) {
      this.$confirm("此操作将永久删除该栏目信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定的时候触发
          // 执行删除操作
          this.deleteCategory(id).then((r) => {
            // 对页数进行处理 Math.ceil向上取整 1.4 -》 2
            const totalPage = Math.ceil(
              (this.categoryObj.total - 1) / this.pageSize
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
            this.findAllCategoryData();
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

		//添加栏目信息
		addCategory(){
			// 因为是新增栏目信息 模态框中的表单 置空
			this.ruleForm = {}
			// 修改模态框的标题
			this.dialogTitle = '添加栏目信息'
			// 显示模态框
			this.dialogVisible = true
		},

		// 编辑栏目信息
		editCategory(row){
			// 设置对应的标题
			this.dialogTitle = '编辑栏目信息'
			// 将当前对象的信息显示在模态框对应的表单中
			// 如果我们选择直接将对应的对象赋值给this.ruleForm 那么你会发现 表格中的数据会随着编辑一起进行更改 这种现象并不是 数据响应式  浅拷贝
			// {...row} 使用这种方式进行赋值 值是相同的 但是内存地址不一样了
			this.ruleForm = {...row}
			// 点击编辑按钮弹出模态框
			this.dialogVisible = true
		},

		// 保存或更新栏目信息
		saveOrUpdate(ruleFormRef){
			// 可能我们的一个组件中会有多个表单 那么做表单验证的时候 如何去区分每一个表单呢？
			// 通过设置ref值 (类比key或id来理解) 通过$refs[ref] 取到对应的表单 进行验证即可
			// element提供的表单验证函数 validate
			this.$refs[ruleFormRef].validate((valid) => {
				if (valid) {
					// 验证通过时
					// 发送网络请求
					this.saveOrUpdateCategory(this.ruleForm)
					.then(r => {
						// 提示是否成功
						let messageInfo = ''
						// 新增是没有id的 编辑是有id的
						if (this.ruleForm.id) {
							messageInfo = '编辑'
						}else{
							messageInfo = '新增'
						}
						this.$notify({
							title: '成功',
							message: messageInfo + '成功!',
							type: 'success'
						});
						// 刷新界面数据
						this.findAllCategoryData()
						// 关闭模态框
						this.dialogVisible = false
		        this.fileList=[]
					})	
				} else {
					// 验证不通过 重新输入信息验证 或 关闭模态框
					return false;
				}
			});
		},
		// 上传成功处理
    uploadSuccessHandler(response){
        let icon = "http://121.199.29.84:8888/group1/"+response.data.id
        // 将图片地址设置到form中，便于一起提交到后台
        this.ruleForm.icon = icon;
    },
  },
};
</script>
<style scoped>
/* 设置category整体样式 */
.category {
  width: 99%;
  background-color: #fff;
  /* 最小高度 vh视框高度*/
  min-height: calc(100vh - 70px);
  padding: 10px;
  overflow: hidden;
}
/* title设置样式 */
.category_title {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
}
/* 设置头部区域样式 */
.category_header {
  margin-top: 10px;
  margin-bottom: 10px;
}
/* 输入框的样式 */
.category_header .el-input {
  width: 200px;
}
/* 设置表格的样式 */
.category_table {
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
