<template>
  <div class="all-goods">
    <div class="content">
      <div class="item" v-for="product in productlist" :key="product.id">
        <ProductInfo :name="product.name" :img-url="product.imageUrlUrl">
          <template #default>
            <img :src="product.imageUrlUrl" />
          </template>
          <template #footer>
            <div class="details">
              <!-- 价格 -->
              <div class="price">{{ products.currencyType }}  :{{ product.price }}</div>
              <div class="num">库 存：{{ product.limitNum }}</div>
            </div>
            <div class="btn">
              <RouterLink :to="{ path: '/details', query: { id: product.id } }" active-class="active">
                <el-button type="primary" plain>查看详情</el-button>
              </RouterLink>
            </div>
          </template>
        </ProductInfo>
      </div>
    </div>
  </div>
  <el-pagination layout="prev, pager, next" :total="50" v-model:currentPage="currentPage"
    pager-count="50"
    @current-change="handlePageChange"
    id="pagenation"/>
</template>

<script setup name="index">
import { ref, onMounted, watch } from 'vue';
import ProductInfo from '@/plugins/ProductInfo/index.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
const productlist = ref([]);

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

watch(() => props.products, (newProducts) => {
  productlist.value = newProducts;
}, { immediate: true });

//分页
// 获取登录token
const authToken = localStorage.getItem('token');
const clientId = localStorage.getItem('client_id');
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
axios.defaults.headers.common['clientId'] = `${clientId}`;
   
const products = ref([]);
const currentPage = ref(1); // 当前页码
   
// 获取商品列表
const fetchProducts = async (pageNum) => {
  try {
    const response = await axios.get('http://106.54.24.243:8080/market/goods/list', {
      params: {
        pageSize: 1,
        pageNum: pageNum,
      },
    });
    products.value = response.data.rows;
    if(products.value.currencyType==0)
      {
        products.value.currencyType="日用币";
      }
      else{
        products.value.currencyType="服装币";
      }
    //totalProducts.value = response.data.total; // 假设API返回了总商品数
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
};
   
// 监听页码改变
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchProducts(newPage);
};
   
onMounted(async () => {
  await fetchProducts(currentPage.value);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.all-goods {
  padding: 20px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0px 75px 30px;
}
.item {
  width: calc(25% - 10px);
  margin-right: 10px;
  margin-bottom: 20px;
}
.item:last-child {
  margin-right: 0;
}
img {
  width: 100%;
  height: auto;
}
img:hover {
  transform: scale(1.1);
  transition: all 0.2s;
}
.details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
}
.price {
  margin-bottom: 8px;
}
.price,
.num {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
#pagenation{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>