<template>   

  
  <div class="cart-card">
    <div class="cart-container"> 
      
      <el-card class="cart" :body-style="{ padding: '15px' }"> 
        <NavBar></NavBar>
        <h2 class="cart-title">购物车</h2>
        <strong class="balance">
          您的当前余额: 服装币: ¥{{ userBalance?.clothingBalance ? userBalance.clothingBalance.toFixed(2) : '0.00' }} |
          日用币: ¥{{ userBalance?.generalBalance ? userBalance.generalBalance.toFixed(2) : '0.00' }}
        </strong>
        <div>
          <el-checkbox v-model="isAllSelected" @change="toggleSelectAll">全选</el-checkbox>
        </div>
        <div class="card-container">
          <div v-for="item in filteredItems" :key="item.goodsId" class="item-card">
            <el-checkbox    
              v-model="selectedItems"
              @change="updateSelectedTotalPrice"
              :value="item.goodsId" 
            />
            <img :src="item.imageUrlUrl" alt="商品图片" class="item-image" />
            <div class="item-info">
              <h3 class="item-name">{{ item.goodsName}}</h3>
              <p class="item-price">{{ formatPrice(item) }}</p>
              <el-input-number
                v-model="item.num"
                :min="1"
                :max="item.limitNum"
                @change="updateSelectedTotalPrice"
                class="quantity-input"
              />
              <p class="currency-type">货币类型: {{ item.currencyType === '0' ? '日用币' : '服装币' }}</p>
              <el-button type="danger" @click="removeSelectedItems(item.goodsId)">移除</el-button>
            </div>
          </div>
        </div>
        <div v-if="filteredItems.length === 0" class="empty-cart">
          <img src="../svg/empty.jpg" alt="空购物车" class="empty-cart-image">
          <p class="empty-cart-text">您的购物车是空的</p>
          <el-button type="primary" class="empty-cart-button">继续购物</el-button>
        </div>
        <div v-if="checkoutInfo" class="checkout-info">
          <p class="checkout-total">结算总额: 服装币: ¥{{ clothingTotal.toFixed(2) }} | 日用币: ¥{{ dailyTotal.toFixed(2) }}</p>
          <el-button type="primary" @click="reCheckout">确认结算</el-button>
          <el-button type="default" @click="checkoutInfo = false">取消</el-button>
        </div>  
        <div class="button-group"> 
          <el-button type="success" @click="checkout" class="success">结算</el-button>
        </div>   
      </el-card>
    </div> 
    <div class="cart-total">
      <strong>总价: 服装币: ¥{{ clothingTotal.toFixed(2) }} | 日用币: ¥{{ dailyTotal.toFixed(2) }}</strong>
    </div>
  </div>
</template>


<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px; 
  background-image: url('../background/cart.png');
}

.item-card {
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 略加深阴影 */
  display: flex;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.item-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 鼠标移入时更深的阴影 */
}

.item-image {
  width: 125px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.cart-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #409EFF;
  -webkit-background-clip: text;
 
  text-align: center;
  margin-bottom: 20px;
}

.balance { 
  color: #409EFF;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
  -webkit-background-clip: text;
  animation: fadeIn 1.2s ease-in-out;
  padding: 10px;
}

.success {
  background: linear-gradient(45deg, #007bff, #00c6ff);
  color: #fff;
  transition: background-position 0.5s;
}

.success:hover {
  background-position: right center;
}

.empty-cart-button {
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    background-color: #007bff;
  }
  50% {
    background-color: #00c6ff;
  }
}
</style>


  


<script setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import Axios from '../Axios'
import NavBar from '@/components/NavBar/index.vue'
// 商品数据

const cartItems = ref([]);

const filteredItems = ref([...cartItems.value]);
const selectedItems = ref([]);
const userBalance = ref([]);
const checkoutInfo = ref(false);
const isAllSelected = ref(false);


// 获取用户购物车商品
async function getItem() {
 Axios.get('http://106.54.24.243:8080/market/cart/list')
.then(function (response) { 
  console.log('getItem',response.data.data)
  cartItems.value=response.data.data
  filteredItems.value=[...cartItems.value]
 
})
.catch(function (error) {
   console.log(error);
});
}

//获取用户余额
async function getCurrency() {      
Axios.get('http://106.54.24.243:8080/market/balance')
.then(function (response) {
    userBalance.value=response.data.data
  console.log('userBalance', userBalance.value)
})
.catch(function (error) {
   console.log(error);
}); 
} 


//页面加载时更新购物车商品以及用户余额
onMounted(
  ()=>
  {
      getItem();
      getCurrency();
  }
)





// 计算服装币和日用币的总价
const clothingTotal = computed(() => {
  return selectedItems.value.reduce((total,id) => {
    const item = cartItems.value.find(item =>item.goodsId===id  &&  item.currencyType === '1');
    return total + (item ? item.price * item.num : 0);
  }, 0);
});

const dailyTotal = computed(() => {
  return selectedItems.value.reduce((total,id) => {
    const item = cartItems.value.find(item =>item.goodsId===id && item.currencyType === '0');
    return total + (item ? item.price * item.num : 0);
  }, 0);
});


// 移除选中的商品

const removeSelectedItems = async (itemId) => {
    var removeItem={ids:[itemId]}
  try {
      const response = await Axios.delete(
      `http://106.54.24.243:8080/market/cart/${removeItem.ids.join(',')}`
);
    console.log('DELresponse', response); 
    console.log('removeItem', removeItem)

    if (response.data.code=='200') {
      cartItems.value = cartItems.value.filter(item => item.goodsId !== itemId);
      filteredItems.value = filteredItems.value.filter(item => item.goodsId !== itemId);
      ElMessage.success('选中商品删除成功');
    } else {
      ElMessage.warning('删除商品失败，请稍后重试！');
    }
  } catch (error) {
    console.error('删除商品时出错:', error);
    ElMessage.error('删除商品时出现错误！');
  }
};


// 更新选中商品的总价
const updateSelectedTotalPrice = () => {
  // 计算总价会自动更新，因为使用了计算属性
};

// 格式化价格
const formatPrice = (row) => {
  return `¥${row.price.toFixed(2)}`;
};

// 显示结算信息
const checkout = () => {
  if (clothingTotal.value + dailyTotal.value > 0) {
    checkoutInfo.value = true;
  } else {
    ElMessage.warning('购物车为空，无法结算！');
  }
};

// 确认结算
const reCheckout = async () => {
  const selectedItemsData = selectedItems.value.map(id => {
    const item = cartItems.value.find(item => item.goodsId === id);
    return {
      goodsId: item.goodsId,
      num: item.num,
    };
  });

  const payload = {
    carts: selectedItemsData, // 形成请求体
  };

  try {
    const response = await Axios.post('http://106.54.24.243:8080/market/cart/settle',payload);
    console.log('结算response', response) 
    console.log('response.data.code', response.data.code)
    if (response.data.code=='200'&&userBalance.value.clothingBalance>=clothingTotal.value&&userBalance.value.generalBalance>=dailyTotal.value) { // 检查结算是否成功 (根据实际响应结构调整)
      // 结算成功的处理逻辑
      userBalance.value.clothingBalance -= clothingTotal.value;
      userBalance.value.generalBalance -= dailyTotal.value;
      filteredItems.value = [];
      selectedItems.value = [];
      checkoutInfo.value = false;
      ElMessage.success('结算成功');
      getCurrency();
      getItem();
    } 
    
    else if(response.data.code=='500')
    {  
      const warning=response.data.msg
      ElMessage.warning(warning)
    }
    else if(userBalance.value.clothingBalance<clothingTotal.value||userBalance.value.generalBalance<dailyTotal.value) {
      ElMessage.warning('余额不足');
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('结算过程中出现错误！');
  }
};


// 切换全选状态
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = filteredItems.value.map(item => item.goodsId);
  } else {
    selectedItems.value = [];
  }
};

</script>