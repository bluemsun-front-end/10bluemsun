<template>
  <NavBar />
  <div class="order-list">
    <!-- 筛选 -->
    <el-form :model="form" label-width="auto">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="订单状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getList(query.pageNum, query.pageSize)">筛选</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%; height: 500px" v-loading="loadings.table">
 
      <el-table-column prop="status" label="订单状态" minWidth="100">
        <template #default="{ row }">
          {{ statusMap[row.status] || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="下单时间" minWidth="140" />
      <!-- <el-table-column prop="amount" label="数量" widminWidthth="140" /> -->
      <el-table-column prop="generalBalance" label="日用币" minWidth="140" />
      <el-table-column prop="clothingBalance" label="服装币" minWidth="140" />
      <el-table-column prop="operate" label="操作" width="150">
  <template #default="{ row }">
    <!-- 使用 v-show 仅当状态为1（失败）时，显示取消订单按钮，但仍保持占位 -->
    <el-popconfirm
      title="确定取消订单?"
      confirm-button-text="确定"
      cancel-button-text="取消"
      @confirm="cancelOrder(row)"
      placement="top"
    >
      <template #reference>
        <el-button
          v-show="row.status === '0'"
          text
          type="primary"
          class="table-btn"
        >
          取消订单
        </el-button>
      </template>
    </el-popconfirm>
    <el-button
      text
      type="primary"
      class="table-btn ml10"
      @click="showDetail(row)"
    >
      订单详情
    </el-button>
  </template>
</el-table-column>


    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="->, sizes, prev, pager, next, jumper, total"
      v-model:current-page="query.pageNum"
      v-model:page-size="query.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total"
      class="my-pagination"
    />

    <!-- 订单详情弹窗 -->
    <el-dialog v-model="visible" :title="`订单详情 - ${rowData.orderCode}`" width="950" top="10vh" :close-on-click-modal="false">
      <div>
        <el-table :data="detailTableData" height="500" v-loading="loadings.detail">
          <el-table-column property="goodsImg" width="150" align="center">
            <template #default="{ row }">
              <el-image :src="row.imageUrl" class="goods-img"></el-image>
            </template>
          </el-table-column>
          <el-table-column property="goodsName" label="商品名称" minWidth="200" />
          <el-table-column property="amount" label="数量" minWidth="140" />
          <el-table-column property="currentType" label="消耗币类型" minWidth="140">
            <template #default="{ row }">
              {{ row.currentType === 0 ? '服装币' : '日常币' }}
            </template>
          </el-table-column>
          <el-table-column property="price" label="消耗币" minWidth="150" />
        </el-table>

        <div class="total-num">共 {{ detailTableDataTotal }} 条数据</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/api/request';
import NavBar from '@/components/NavBar/index.vue';
// 查询参数
const form = ref({
  status: '',
});

const query = ref({
  pageNum: 1,
  pageSize: 10,
});
const total = ref(17);
const loadings = ref({
  table: false,
  detail: false,
})

const handleSizeChange = (val: number) => {
  getList(query.value.pageNum, val);
};
const handleCurrentChange = (val: number) => {
  getList(val, query.value.pageSize);
};

const tableData = ref([]);

// 状态枚举
const statusList = ref([
  { label: '失败', value: '1' },
  { label: '成功', value: '2' },
]);

const statusMap = ref({
  0: '未知',
  1: '失败',
  2: '成功',
});

// 获取表格数据
const getList = async (pageNum = 1, pageSize = query.value.pageSize) => {
  try {
    const params = {
      pageNum,
      pageSize,
      ...form.value,
    };
    loadings.value.table = true;
    const res = await request.get('/market/order/userlist?pageNum=' + pageNum + '&pageSize=' + pageSize);
    if (res.data.code === 200) {
      const { rows } = res.data;
      query.value.pageNum = pageNum;
      query.value.pageSize = pageSize;
      tableData.value = rows;
      total.value = res.data.total;
    }
  } catch (err) {
    console.log(err);
  } finally {
    loadings.value.table = false;
  }
};

// 取消订单
const cancelOrder = async (row: any) => {
  try {
    const res = await request.post(`/market/order/cancel/${row.id}`);
    if (res.data.code === 200) {
      ElMessage.success('取消成功');
      getList(query.value.pageNum, query.value.pageSize);
    } else {
      ElMessage.error(res.data.msg);
    }
  } catch (err) {
    console.log(err);
  }
};

// 订单详情
const visible = ref(false);
const detailTableData = ref();
const detailTableDataTotal = ref(0);
const rowData = ref({});

const showDetail = async (row: any) => {
  if (row.id) {
    try {
      loadings.value.detail = true;
      const res = await request.get(`/market/orderInfo/${row.id}`);
      if (res.status === 200) {
        detailTableData.value = res.data;
        detailTableDataTotal.value = res.data.length;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadings.value.detail = false;
    }
  }

  rowData.value = row;
  visible.value = true;
};

onMounted(() => {
  getList();
});
</script>

<style scoped>
.order-list {
  margin-top:2vh;
  padding: 30px 40px;
}

.table-btn {
  padding-left: 0;
  padding-right: 0;
}

.ml10 {
  margin-left: 10px;
}

.my-pagination {
  margin-top: 20px;
  text-align: right;
}

.goods-img {
  width: 80px;
  height: 80px;
}

.total-num {
  margin: 10px 0;
  text-align: right;
}
</style>