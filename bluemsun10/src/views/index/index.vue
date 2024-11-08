<template>
  <div id="app">
    <NavBar />
    <div class="show">
      <ProductCarrousel />
    </div>
    <SearchBox @search="handleSearch" />
    <ProductSearch />
    <ProductShow :products="displayedProducts" />
    <!-- <div class="pagenation">
      <PageNation />
    </div> -->
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
// 这里加了
import { watch } from 'vue';
import NavBar from '@/components/NavBar/index.vue';
import ProductCarrousel from '@/views/index/ProductCarrousel/index.vue';
import SearchBox from '@/views/index/SearchBox/index.vue';
import ProductSearch from '@/views/index/ProductShow/ProductSearch/index.vue';
import ProductShow from '@/views/index/ProductShow/index.vue';
import PageNation from '@/components/PageNation/index.vue';
import axios from 'axios';

const displayedProducts = ref([]);

const authToken = localStorage.getItem('token');
const clientId = localStorage.getItem('client_id');
axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
axios.defaults.headers.common['clientId'] = clientId;
// 页面渲染
import { provide } from 'vue';
const category = ref('');
const search = ref('');
const productclass = ref('');
const isasc = ref('');
provide('category', category);
provide('searchTerm', search);
provide('productclass',productclass);
provide('isasc',isasc);
const loadDefaultProducts = () => {
  axios.get('http://106.54.24.243:8080/market/goods/list', {
    params: {
      pageSize: 4,
      pageNum: 1,
      currencyType: category.value,
      name: search.value,
      type:productclass.value,
      isAsc:isasc.value,
      orderByColumn: 'price'
    },
  })
    .then(response => {
      displayedProducts.value = response.data.rows;
    })
    .catch(error => {
      console.error('加载商品失败', error);
    });
};
onMounted(() => {
  loadDefaultProducts();
});
// 监听变化并重新加载商品
watch(category, (newVal) => {
  loadDefaultProducts();
});
watch(search, (newVal) => {
  category.value='';
  productclass.value='';
  isasc.value='';
  loadDefaultProducts();
});
watch(productclass, (newVal) => {
  loadDefaultProducts();
});
watch(isasc, (newVal) => {
  loadDefaultProducts();
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
.pagenation {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

</style>