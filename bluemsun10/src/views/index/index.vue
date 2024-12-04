<template>
  <div id="app">
    <NavBar />
    <div class="show">
      <ProductCarrousel />
    </div>
    <div class="center-container">
      <ProductSearch />
      <SearchBox @search="handleSearch" />
    </div>
    <div v-if="displayedProducts.length === 0" style="text-align: center; ">
      <el-empty :image-size="150" />
    </div>
    <ProductShow :products="displayedProducts" />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalNum"
      :page-size="8"
      v-model:currentPage="currentPage"
      pager-count="50"
      @current-change="handlePageChange"
      id="pagenation"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch} from 'vue';
import NavBar from '@/components/NavBar/index.vue';
import ProductCarrousel from '@/views/index/ProductCarrousel/index.vue';
import SearchBox from '@/views/index/SearchBox/index.vue';
import ProductSearch from '@/views/index/ProductShow/ProductSearch/index.vue';
import ProductShow from '@/views/index/ProductShow/index.vue';

import Axios from '../Axios/index'

const displayedProducts = ref([]);
const currentPage = ref(1);
const totalNum = ref(0); // 存储商品总数的响应式变量



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
 Axios
    .get('http://106.54.24.243:8080/market/goods/list', {
      params: {
        pageSize: 8,
        pageNum: pageNum,
        currencyType: category.value,
        name: search.value,
        type: productclass.value,
        isAsc: isasc.value,
        orderByColumn: 'price'
      },
    })
    .then(response => {
        totalNum.value = response.data.total; 
        displayedProducts.value = response.data.rows.map(product => {
        const status = product.status; 
        //判断商品status
        return {
          ...product,
          currencyType: {'0': '日用币', '1': '服装币'}[product.currencyType] || product.currencyType,
          isShelved: status === '1'
        };
      });
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
  isPC()
  loadProducts(currentPage.value);
  console.log('Initial totalNum:', totalNum.value); 
});

// 定义一个响应式变量来存储客户端ID
const clientId = ref('');
// 定义一个变量来判断是电脑端还是移动端
let isPc = true;
// 定义一个函数来判断是否是电脑端
const isPC = () => {
  const userAgent = navigator.userAgent;

  // 定义一些常见的移动设备和浏览器的用户代理特征
  const mobileAgents = [
    /android/i,     // Android设备
    /iphone|ipad|ipod/i, // iOS设备
    /windows phone/i, // Windows Phone设备
    /blackberry/i,  // Blackberry设备
    /opera mini/i,  // Opera Mini浏览器（通常用于移动设备）
    /mobile/i,      // 通用移动设备标记
    /touch/i        // 触摸设备标记（可能包括桌面触摸屏）
  ];

  // 初始化isPc为true
  isPc = true;

  // 检查用户代理字符串是否包含任何移动设备的特征
  for (let i = 0; i < mobileAgents.length; i++) {
    if (mobileAgents[i].test(userAgent)) {
      isPc = false; // 如果是移动设备，则将isPc设置为false
    }
  }
  console.log(isPc);
      //改变clientId查看是移动端还是PC端
    if (isPc == false) {
      clientId.value = '428a8310cd442757ae699df5d894f051'
    } else {
      clientId.value = 'e5cd7e4891bf95d1d19206ce24a7b32e'
    }
 localStorage.setItem('client_id',clientId.value)
 console.log(1111);
};


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
  margin-top:30px;
}

#pagenation{
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom:30px;
}
.center-container {
  display: flex;
  margin-top: 30px;
}

html, body {
  height: 100%; /* 确保 body 和 html 元素填满整个视口 */
  margin: 0 ;

}
html{
  background-image: url('../../../public/image/背景图2.gif');
  background-size: cover; /* 使背景图像覆盖整个元素，而不改变其宽高比 */
  background-position: center; /* 将背景图像放置在元素的中心 */
  background-attachment: fixed;
}

.box{
  background-color: rgba(255, 255, 255, 0.8);
  margin: 6vh 5vh;
  border-radius: 20px;
}
</style>