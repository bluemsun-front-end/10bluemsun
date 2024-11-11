<template>   

  
  <div class="cart-card">
    <div class="cart-container"> 
      
      <el-card class="cart" :body-style="{ padding: '15px' }"> 
        <NavBar></NavBar>
     
          <el-card class="cart-card" shadow="hover">
        <div class="cart-total">
    <strong>总价: 服装币: ¥{{ clothingTotal.toFixed(2) }} | 日用币: ¥{{ dailyTotal.toFixed(2) }}</strong>
        </div>
          </el-card>
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
          <img src="../background/emptyCart.png" alt="空购物车" class="empty-cart-image">
          <p class="empty-cart-text">您的购物车是空的</p>
          <el-button type="primary" class="empty-cart-button" @click="toHome">继续购物</el-button>
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
    
  </div>
</template>


<style scoped> 

/* 总价的样式 */ 
.cart-card {
  border-radius: 8px;
  padding: 20px;
  background-color: #f7f8fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin: 10px;
}

.cart-total {
  font-size: 1.5rem;
  color: #409EFF;
  text-align: center;
}


/* 购物车商品样式 */
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px; 
  background-image: url('../background/cartBackground.png');
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


/* 标题样式 */
.cart-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #409EFF;
  -webkit-background-clip: text;
  text-align: center;
  margin-bottom: 20px;
}



/* 余额样式 */
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



/* 结算样式 */
.success {
  background: linear-gradient(45deg, #007bff, #00c6ff);
  color: #fff;
  transition: background-position 0.5s;
}

.success:hover {
  background-position: right center;
}


/* 
购物车为空的样式 */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.empty-cart-image {
  width: 150px;
  height: auto;
  margin-bottom: 20px;
  animation: bounce 1.5s infinite;
}

.empty-cart-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
}

.empty-cart-button {
  font-size: 1rem;
  color: #fff;
  background-color: #409EFF;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.empty-cart-button:hover {
  background-color: #66b1ff;
}

/* 动画效果 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

</style>


  


<script setup>
import { useRouter } from 'vue-router';
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

//定义路由
const router=useRouter(); 



//商品为空是跳转到主页


const toHome=()=>
{   console.log('跳转')
    router.push('/home')
}



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