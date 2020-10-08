<template>
    <div class="order">
		<!-- 标题 -->
    	<!-- <div class="order_title">订单管理</div> -->
        <!-- 选项卡 -->
        <el-tabs v-model="params.status" @tab-click="loadData">
            <el-tab-pane label="全部" name="全部"></el-tab-pane>
            <el-tab-pane label="待支付" name="待支付"></el-tab-pane>
            <el-tab-pane label="待派单" name="待派单"></el-tab-pane>
            <el-tab-pane label="待接单" name="待接单"></el-tab-pane>
            <el-tab-pane label="待服务" name="待服务"></el-tab-pane>
            <el-tab-pane label="待确认" name="待确认"></el-tab-pane>
            <el-tab-pane label="已完成" name="已完成"></el-tab-pane>
        </el-tabs>
        <!-- 选项卡结束 -->
        <!-- 表格 -->
        <el-table :data="orderObj.list">
            <el-table-column label="订单编号" prop="id" align="center"></el-table-column>
            <el-table-column label="下单时间" width="200" prop="orderTime" align="center">
				        <template slot-scope="scope">
                	{{scope.row.orderTime | dateParse}}
              	</template>
			      </el-table-column>
            <el-table-column label="总价" prop="total" align="center"></el-table-column>
            <el-table-column label="状态" prop="status" align="center"></el-table-column>
            <el-table-column label="顾客Id" prop="customerId" align="center"></el-table-column>
            <el-table-column label="员工Id" prop="waiterId" align="center"></el-table-column>
            <el-table-column label="地址Id" prop="addressId" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="120">
                <template v-slot="slot">
					        <span class="setSapn" @click="toOrderDetail(slot.row.id)">详情</span>
					        <span class="setSapn" v-if="slot.row.status==='待派单'" @click="toSendOrderHandler(slot.row)">派单</span>
					        <span class="setSapn" v-if="slot.row.status==='待接单'" @click="toCancelSendOrderHandler(slot.row)">取消派单</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 表格结束 -->
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
        <el-dialog title="派单" :visible.sync="dialogVisible" width="50%">
            <div style="paddingLeft:2em">
              <p> <strong>订单编号: </strong> {{ruleForm.id}} </p> <br>
              <p> <strong>订单总价: </strong> {{ruleForm.total}} </p> <br>
              <p> <strong>下单时间: </strong> {{ruleForm.orderTime | dateParse}} </p> <br>
              <p>
                <strong>派送员工:</strong>
                <el-select v-model="waiterId" placeholder="请选择">
                    <el-option v-for="e in waiterData" :key="e.id"
                    :label="e.realname" :value="e.id">
                    </el-option>
                </el-select>
              </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small"
                @click="closeModalHandler">取 消</el-button>
                <el-button type="primary" size="small"
                @click="submitHandler">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 模态框结束 -->
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
      pageSize: 8,
      // 数据总条数
	    total: 10,
		  // 控制模态框显示与隐藏的属性
	  	dialogVisible: false,
		  // 表单数据对象 可以做为发送相应网络请求时的参数来使用
      ruleForm: {},
      // 员工显示
      waiterData:[],
      params:{
        page:0,
        pageSize:10,
        status:'全部',
      },
      waiterId:null   // 选中的员工
    };
  },
  created() {
    // 对应的生命周期钩子函数中进行函数自执行 加载默认数据
    this.findAllOrderData();
    this.findAllWaiterData();
  },
  computed: {
    // 利用辅助函数 获取state中的数据
    ...mapState("order", ["orderObj", "waiterObj", "sendOrder"])
  },
  methods: {
    // 辅助函数 来获取actions中的方法
    // 第一个参数 命名空间对应的名称
    ...mapActions("order", ["findAllOrder", "SendOrder","CancelSendOrder" ,"findAllWaiter"]),
    // 获取所有订单信息
    findAllOrderData() {
        // 配置传递的参数
        let params = {
          // 从第一页开始加载数据 请求数据的时候 参数默认从0开始 此时 我们可以使用currentPage - 1即可
          page: this.currentPage - 1,
          pageSize: this.pageSize,
          status: this.params.status
        };
        if(params.status ==="全部"){
            delete params.status;
        }
        this.findAllOrder(params)
        // 加载数据完毕以后 我们可以根据数据 获取到总数据条数
        .then((r) => {
          this.total = this.orderObj.total;
        });
    },
    // 获取所有员工信息
    findAllWaiterData() {
      // 配置传递的参数
      this.findAllWaiter()
        // 加载数据完毕以
        .then((r) => {
          this.waiterData = this.waiterObj;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findAllOrderData();
    },
    // 根据状态查询数据
    loadData() {
        // 配置参数
        this.currentPage = 1;
        let params = {
            page: this.currentPage - 1,
            pageSize: this.pageSize,
            status: this.params.status
        };
        if (params.status == "全部") {
            // 如果status参数为全部 那么其实就是相当于做了一个分页查询的操作 为了不让它为空的时候影响数据的获取 我们可以直接删除这个属性
            delete params.status;
        } 
        this.findAllOrder(params).then((r) => {
            this.total = this.orderObj.total;
        });
    },

	// 跳转到订单详情界面
	toOrderDetail(id){
		// 编程式导航
		this.$router.push({
			path: '/order/orderDetail',
			query:{
				id: id
			}
		})
    },
    // 派单
    toSendOrderHandler(row){
        // 模态框显示当前订单信息
        this.ruleForm = {...row};
        this.dialogVisible = true;
    },
    // 取消派单
    toCancelSendOrderHandler(row){
        this.ruleForm = {...row};
        this.CancelSendOrder(this.ruleForm.id).then((r)=>{
          let messageInfo = '成功取消派单'
          // 对页数进行处理 Math.ceil向上取整 1.4 -》 2
          const totalPage = Math.ceil((this.orderObj.total - 1) / this.pageSize);
          this.currentPage =
              this.currentPage > totalPage ? totalPage : this.currentPage;
              this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
              this.$notify({
                title: '成功',
                message: messageInfo,
                type: 'success'
              });
          // 刷新界面数据
          this.findAllOrderData();
        })
    },
    closeModalHandler(){
        this.dialogVisible = false;
    },
    submitHandler(){
        let params = {
            waiterId: this.waiterId,
            orderId: this.ruleForm.id,
        }
        this.SendOrder(params)
        .then((r)=>{
            // 提示是否成功
            let messageInfo = this.sendOrder.message
            if(this.sendOrder.status == 200){
              if(this.params.status == '待派单'){
                // 对页数进行处理 Math.ceil向上取整 1.4 -》 2
                const totalPage = Math.ceil(
                  (this.orderObj.total - 1) / this.pageSize
                );
                this.currentPage =
                  this.currentPage > totalPage ? totalPage : this.currentPage;
                  this.currentPage = this.currentPage < 1 ? 1 : this.currentPage;
              }
              this.$notify({
                title: '成功',
                message: messageInfo,
                type: 'success'
              });
            }else if(this.sendOrder.status == 500){
              this.$notify({
                title: '派单失败',
                message: messageInfo,
                type: 'error'
              });
            }
						
						// 刷新界面数据
            this.findAllOrderData();
            // 清空员工数据
            this.waiterId = null
						// 关闭模态框
						this.dialogVisible = false
        })
    },
  },
};
</script>
<style scoped>
/* 设置order整体样式 */
.order {
  width: 99%;
  background-color: #fff;
  /* 最小高度 vh视框高度 */
  min-height: calc(100vh - 90px);
  padding: 10px;
  overflow: hidden;
}

/* 设置操作区域样式 */
.setSapn {
  color: #409EFF;
  cursor: pointer;
}
</style>