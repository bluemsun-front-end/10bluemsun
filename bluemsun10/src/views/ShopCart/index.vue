
<template>
    <div class="cart-container">
  
      <el-card class="cart" >
        <h2  class="art-title">购物车</h2> 
        <p>您的当前余额: 服装币: ¥{{ userBalance.clothing.toFixed(2) }} | 日用币: ¥{{ userBalance.daily.toFixed(2) }}</p>
  
        <div >
          <el-input
            placeholder="搜索商品"
            v-model="searchQuery"
            prefix-icon="el-icon-search"
            clearable
            style="flex: 1;" 
            class="search-input"
          />
          <el-button type="primary" @click="performSearch" >搜索</el-button>
        </div>
  
        <div v-if="filteredItems.length === 0" >
          <el-alert title="没有找到该商品" type="warning" />
        </div>
  
        <div>
          <el-checkbox v-model="isAllSelected" @change="toggleSelectAll">全选</el-checkbox>
        </div>
  
        <el-table :data="filteredItems" style="width: 100%">
          <el-table-column label="选择" width="100">
            <template #default="{ row }">
              <el-checkbox
                v-model="selectedItems"
                :label="row.id"
                @change="updateSelectedTotalPrice"
              />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名" />
          <el-table-column prop="price" label="价格" :formatter="formatPrice" />
          <el-table-column label="数量" width="120">
            <template #default="{ row }">
              <el-input-number
                v-model="row.quantity"
                :min="1"
                @change="updateSelectedTotalPrice"  
                class="quantity-input"
              />
            </template>
          </el-table-column>
          <el-table-column label="货币类型" width="120">
            <template #default="{ row }">
              <span>{{ row.currency === 'clothing' ? '服装币' : '日用币' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="{ row }">
              <el-button type="danger" @click="removeItem(row.id)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>     
  
        <div v-if="checkoutInfo" class="checkout-info">
        <p>您的当前余额: 服装币: ¥{{ userBalance.clothing.toFixed(2) }} | 日用币: ¥{{ userBalance.daily.toFixed(2) }}</p>
        <p>结算总额: 服装币: ¥{{ clothingTotal.toFixed(2) }} | 日用币: ¥{{ dailyTotal.toFixed(2) }}</p>
        <el-button type="primary" @click="reCheckout">确认结算</el-button>
        <el-button type="default" @click="checkoutInfo = false">取消</el-button>
      </div>
  
  
        <div class="cart-total">
          <strong>总价: 服装币: ¥{{ clothingTotal.toFixed(2) }} | 日用币: ¥{{ dailyTotal.toFixed(2) }}</strong>
        </div>
        <div style="margin-top: 20px; display: flex; justify-content: space-between;">
          <el-button type="primary" @click="addItem">添加商品</el-button>
          <el-button type="success" @click="checkout">结算</el-button>
          <el-button type="danger" @click="removeSelected">全删</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { ElMessage } from 'element-plus';
  
  // 商品数据
  const cartItems = ref([
    { id: 1, name: '苹果', price: 5.5, quantity: 1, currency: 'clothing' },
    { id: 2, name: '香蕉', price: 3.0, quantity: 1, currency: 'daily' },
    { id: 3, name: '橙子', price: 4.2, quantity: 1, currency: 'clothing' },
    { id: 4, name: '葡萄', price: 6.8, quantity: 1, currency: 'daily' },
    { id: 5, name: '西瓜', price: 10.0, quantity: 1, currency: 'clothing' },
  ]);
  
  const searchQuery = ref('');
  const filteredItems = ref([...cartItems.value]);
  const selectedItems = ref([]);
  const userBalance = ref({ clothing: 50.0, daily: 30.0 });
  const checkoutInfo = ref(false);
  const isAllSelected = ref(false);
  
  
  // 计算服装币和日用币的总价
  const clothingTotal = computed(() => {
    return selectedItems.value.reduce((total, id) => {
      const item = cartItems.value.find(item => item.id === id && item.currency === 'clothing');
      return total + (item ? item.price * item.quantity : 0);
    }, 0);
  });
  
  const dailyTotal = computed(() => {
    return selectedItems.value.reduce((total, id) => {
      const item = cartItems.value.find(item => item.id === id && item.currency === 'daily');
      return total + (item ? item.price * item.quantity : 0);
    }, 0);
  });
  
  // 计算选中商品的总价
  const selectedTotalPrice = computed(() => {
    return clothingTotal.value + dailyTotal.value;
  });
  
  // 添加商品
  const addItem = () => {
    const newItem = {
      id: cartItems.value.length + 1,
      name: `商品${cartItems.value.length + 1}`,
      price: (Math.random() * 100),
      quantity: 1,
      currency: Math.random() > 0.5 ? 'clothing' : 'daily',
    };
    cartItems.value.push(newItem);
    filteredItems.value = cartItems.value;
  };
  
  // 移除商品
  const removeItem = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
    filteredItems.value = cartItems.value;
    selectedItems.value = selectedItems.value.filter(selectedId => selectedId !== id);
  };
  
  // 移除选中的商品
  const removeSelected = () => {
    if (selectedItems.value.length === 0) {
      ElMessage.warning('请先选择要删除的商品！');
      return;
    }
    cartItems.value = cartItems.value.filter(item => !selectedItems.value.includes(item.id));
    filteredItems.value = cartItems.value;
    selectedItems.value = [];
    isAllSelected.value = false;
  };
  
  // 更新选中商品的总价
  const updateSelectedTotalPrice = () => {
    // 计算总价会自动更新，因为使用了计算属性
  };
  
  // 格式化价格
  const formatPrice = (row) => {
    return `¥${row.price.toFixed(2)}`;
  };
  
  // 执行搜索
  const performSearch = () => {
    if (!searchQuery.value) {
      filteredItems.value = [...cartItems.value];
      return;
    }
  
    const results = cartItems.value.filter(item =>
      item.name.includes(searchQuery.value)
    );
  
    if (results.length === 0) {
      ElMessage.warning('没有找到该商品');
    } else {
      ElMessage.success(`找到 ${results.length} 个匹配的商品`);
    }
  
    filteredItems.value = results;
  };
  
  // 显示结算信息
  const checkout = () => {
    if (selectedTotalPrice.value > 0) {
      checkoutInfo.value = true;
    } else {
      ElMessage.warning('购物车为空，无法结算！');
    }
  };
  
   
  
  //确认结算 
  
  const reCheckout=()=>
  { 
        const { clothing, daily } = userBalance.value; 
        if(clothing>=clothingTotal.value && daily>=dailyTotal.value) 
        {
          userBalance.value.clothing -= clothingTotal.value;
          userBalance.value.daily -= dailyTotal.value;  
          filteredItems.value = [];
           selectedItems.value = [];
           checkoutInfo.value = false;
            ElMessage.success('结算成功');
        } 
        else
        {
          ElMessage.warning('余额不足，无法结算！')
        }
  }
  
  
  
  
  // 切换全选状态
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedItems.value = filteredItems.value                        
        .map(item => item.id);
    } else {
      selectedItems.value = [];
    }
  };
  </script>
  
  <style scoped> 
  
  /* 表格样式 */  
  
  .el-table {
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .el-table th {
    background-color: #007bff;
    color: white;
    padding: 12px;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid #0056b3;
  }
  
  .el-table td {
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    transition: transform 0.3s ease; /* 动画过渡效果 */
  }
  
  .el-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .el-table tr:hover {
    background-color: rgba(0, 123, 255, 0.1);
    transition: background-color 0.3s ease;
  }
  
  @media (max-width: 600px) {
    .el-table th, .el-table td {
      padding: 8px;
      font-size: 14px;
    }
  }
   
  /* 整体购物车样式 */
  .cart-container {
    background: linear-gradient(270deg, rgba(162, 194, 230, 0.8), rgba(240, 244, 255, 0.8));
    box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.5);
  
  }
  
  .art-title {
    color: #ff5000; 
    letter-spacing: 2px; 
    transition: transform 0.3s ease; 
  }
  
  .cart-total {
    font-size: 18px;
    margin-top: 20px;
    text-align: right;
  }  
  
  /* 搜索框样式 */
  .quantity-input
  {
    width: auto;
  }  
  .search-input
  {
    display: flex;
    align-items: center; 
    margin-bottom: 20px;
  }   
  
  /* 一些简单动画效果 */
  
   
  
  /* 页面字体 */ 
  body {
    font-family: 'Roboto', sans-serif; /* 更改为你选择的字体 */
    line-height: 1.6; /* 增加行高 */
  }
   
  
  /* 按钮样式 */ 
  .el-button:active {
    transform: scale(0.95); /* 按钮按下时缩小 */
  }
  
  .el-button:focus {
    outline: none; /* 移除默认轮廓 */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 聚焦时添加阴影 */
  }
   
  .el-button {
    transition: transform 0.2s ease, background-color 0.3s ease;
  }
  
  .el-button:hover {
    transform: translateY(-2px); /* 鼠标悬停时稍微抬起 */
  }
  
  
  
   
  </style>
  
