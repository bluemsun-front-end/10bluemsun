<template>
  <div>
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
          <el-button type="primary" @click="getList">筛选</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%; height: 500px">
      <el-table-column prop="username" label="用户名" width="140" />
      <el-table-column prop="status" label="订单状态" width="140">
        <template #default="{ row }">
          {{ statusMap[row.status] || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量" width="140" />
      <el-table-column prop="price" label="价格" width="140" />
      <el-table-column prop="general_balance" label="日用币" width="140" />
      <el-table-column prop="clohting_balance" label="服装币" width="140" />
      <el-table-column prop="operate" label="操作" width="200">
        <template #default="{ row }">
          <el-popconfirm title="确定取消订单?" confirm-button-text="确定" cancel-button-text="取消" @confirm="cancelOrder(row)" placement="top">
            <template #reference>
              <el-button text type="primary" class="table-btn">取消订单</el-button>
            </template>
          </el-popconfirm>

          <el-button text type="primary" class="table-btn ml10">订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="->, sizes, prev, pager, next, jumper, total"
      v-model:current-page="query.pageNo"
      v-model:page-size="query.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :total="total"
      class="my-pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/api/request.ts';
// 查询参数
const form = ref({
  status: '',
});

const query = ref({
  pageNo: 1,
  pageSize: 10,
});
const total = ref(17);

const handleSizeChange = (val: number) => {
  getList(query.value.pageNo, val);
};
const handleCurrentChange = (val: number) => {
  getList(val, query.value.pageSize);
};

const tableData = ref([
  {
    username: '张三',
    price: 100.5,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.5,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
  {
    username: '张三',
    price: 100.0,
    status: '2',
    quantity: 2,
    general_balance: 50,
    clohting_balance: 30,
  },
  {
    username: '李四',
    price: 200.0,
    status: '1',
    quantity: 1,
    general_balance: 40,
    clohting_balance: 20,
  },
]);

// 状态枚举
const statusList = ref([
  { label: '失败', value: '1' },
  { label: '成功', value: '2' },
]);

const statusMap = ref({
  1: '失败',
  2: '成功',
});

// 获取表格数据
const getList = async (pageNo = 1, pageSize = query.value.pageSize) => {
  try {
    const params = {
      pageNo,
      pageSize,
      ...form.value,
    };
    const res = await request.post('/market/order/userlist', params);
    const { records, total } = res.data;
    query.value.pageNo = pageNo;
    query.value.pageSize = pageSize;
    tableData.value = records;
    total.value = total;
  } catch (err) {
    console.log(err);
  }
};

// 取消订单
const cancelOrder = async (row: any) => {
  ElMessage.success('取消成功');
  try {
    const res = await request.get(`/market/order/cancel/${row.orderId}`);
    if (res.code === 200) {
      ElMessage.success('取消成功');
      getList(query.value.pageNo, query.value.pageSize);
    }
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getList();
});
</script>

<style scoped>
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
</style>
