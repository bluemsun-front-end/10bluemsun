<template>
  <div id="app">
    <NavBar />
    <div class="show">
      <ProductCarrousel />
    </div>
    <SearchBox @search="handleSearch" />
    <ProductSearch />
    <ProductShow :products="displayedProducts" />
    <el-pagination layout="prev, pager, next" :total="50" v-model:currentPage="currentPage"
    pager-count="50"
    @current-change="handlePageChange"
    id="pagenation"/>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import NavBar from '@/components/NavBar/index.vue';
import ProductCarrousel from '@/views/index/ProductCarrousel/index.vue';
import SearchBox from '@/views/index/SearchBox/index.vue';
import ProductSearch from '@/views/index/ProductShow/ProductSearch/index.vue';
import ProductShow from '@/views/index/ProductShow/index.vue';
import axios from 'axios';

const displayedProducts = ref([]);
const currentPage = ref(1);

const authToken = localStorage.getItem('token');
const clientId = localStorage.getItem('client_id');
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
axios.defaults.headers.common['clientId'] = clientId;

// 提供响应式数据
import { provide } from 'vue';
const category = ref('');
const search = ref('');
const productclass = ref('');
const isasc = ref('');
provide('category', category);
provide('searchTerm', search);
provide('productclass', productclass);
provide('isasc', isasc);

// 加载商品列表
const loadProducts = (pageNum) => {
  axios
    .get('http://106.54.24.243:8080/market/goods/list', {
      params: {
        pageSize: 1,
        pageNum: pageNum,
        currencyType: category.value,
        name: search.value,
        type: productclass.value,
        isAsc: isasc.value,
        orderByColumn: 'price'
      },
    })
    // .then(response => {
    //   displayedProducts.value = response.data.rows;
    // })
    .then(response => {
      const currencyTypeMap = { '0': '日用币', '1': '服装币' };
      displayedProducts.value = response.data.rows.map(product => ({
        ...product,
        currencyType: currencyTypeMap[product.currencyType] || product.currencyType
      }));
    })
    .catch(error => {
      console.error('加载商品失败', error);
    });
};

// 页码改变时重新加载商品
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  loadProducts(newPage);
};

onMounted(() => {
  loadProducts(currentPage.value);
});

// 监听变化并重新加载商品
watch(category, (newVal) => {
  loadProducts(1); // 重置为第一页
});
watch(search, (newVal) => {
  category.value = '';
  productclass.value = '';
  isasc.value = '';
  loadProducts(1); // 重置为第一页
});
watch(productclass, (newVal) => {
  loadProducts(1); // 重置为第一页
});
watch(isasc, (newVal) => {
  loadProducts(1); // 重置为第一页
});
</script>

<style>
#app {
  display: block;
  margin: 0 auto;
  padding: 0 0;
}
.show {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

#pagenation{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

</style>