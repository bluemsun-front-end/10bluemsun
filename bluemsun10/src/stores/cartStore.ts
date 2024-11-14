import { defineStore } from 'pinia';
import { ref, computed, } from 'vue';
import { ElMessage } from 'element-plus';
import Axios from '../views/Axios';
import { useRouter } from 'vue-router';

export const useCartStore = defineStore('cartStore', () => {

    // 商品数据
    
    const cartItems:any = ref([]);
    const filteredItems:any = ref([...cartItems.value]);
    const selectedItems:any = ref([]);
    const userBalance:any = ref([]);
    const checkoutInfo:any = ref(false);
    const isAllSelected:any = ref(false);
    
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
    
    
    // 计算服装币和日用币的总价
    const clothingTotal = computed(() => {
      return selectedItems.value.reduce((total: number,id: any) => {
        const item = cartItems.value.find((item: { goodsId: any; currencyType: string; }) =>item.goodsId===id  &&  item.currencyType === '1');
        return total + (item ? item.price * item.num : 0);
      }, 0);
    });
    
    const dailyTotal = computed(() => {
      return selectedItems.value.reduce((total: number,id: any) => {
        const item = cartItems.value.find((item: { goodsId: any; currencyType: string; }) =>item.goodsId===id && item.currencyType === '0');
        return total + (item ? item.price * item.num : 0);
      }, 0);
    });
    
    
    // 移除选中的商品
    
    const removeSelectedItems = async (itemId: any) => {
        var removeItem={ids:[itemId]}
      try {
          const response = await Axios.delete(
          `http://106.54.24.243:8080/market/cart/${removeItem.ids.join(',')}`
    );
        console.log('DELresponse', response); 
        console.log('removeItem', removeItem)
    
        if (response.data.code=='200') {
          cartItems.value = cartItems.value.filter((item: { goodsId: any; }) => item.goodsId !== itemId);
          filteredItems.value = filteredItems.value.filter((item: { goodsId: any; }) => item.goodsId !== itemId);
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
    const formatPrice = (row: { price: number; }) => {
      return `¥${row.price.toFixed(2)}`;
    };
    
    // 显示结算信息
    const checkout = () => {
      if (selectedItems.value.length > 0) {
        checkoutInfo.value = true;
      } else {
        ElMessage.warning('购物车没有选中的商品，无法结算！');
      }
    };
    
    
    // 确认结算
    const reCheckout = async () => {
      const selectedItemsData = selectedItems.value.map((id: any) => {
        const item = cartItems.value.find((item: { goodsId: any; }) => item.goodsId === id);
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
        selectedItems.value = filteredItems.value.map((item: { goodsId: any; }) => item.goodsId);
      } else {
        selectedItems.value = [];
      }
    };
  
    return{
        router,
        cartItems, 
        filteredItems,
        selectedItems,
        userBalance,
        clothingTotal,
        dailyTotal,
        checkoutInfo,
        isAllSelected,
        getItem,
        getCurrency,
        removeSelectedItems,
        checkout,
        reCheckout,
        toggleSelectAll, 
        updateSelectedTotalPrice,
        formatPrice,
        toHome
    }

});
