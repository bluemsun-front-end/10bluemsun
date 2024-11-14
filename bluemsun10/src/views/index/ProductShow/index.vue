<template>
  <div class="all-goods">
    <div class="content">
      <div class="item" v-for="product in productlist" :key="product.id" >
        <!-- 商品下架 -->
          <ProductInfo :name="product.name  " :img-url="product.imageUrlUrl" :is-shelved="product.isShelved">
          <template #default>
            <img :src="product.imageUrlUrl" :class="{ 'image-darken': product.isShelved }" />
          </template>
          <template #title>
            <div v-if="product.isShelved" class="shelved-tag">已下架</div> 
              <div class="title">{{ product.name }}</div>
          </template>
          <template #footer>
            <div class="details">
              <div class="price">{{ product.currencyType}}:{{ product.price }}</div>
              <div class="num">库 存：{{ product.amount}}</div>
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
</template>

<script setup name="index">
import { ref,  watch } from 'vue';
import ProductInfo from '@/plugins/ProductInfo/index.vue';
import { RouterLink } from 'vue-router';
const productlist = ref([]);
import { defineProps } from 'vue';


const props = defineProps({
  products: {
    type: Array,
    required: true,
  }
});

watch(() => props.products, (newProducts) => {
  productlist.value = newProducts;
}, { immediate: true });
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
 .title{
    text-align: center;
    font-size:21px;
    font-weight: 800;
    color:rgb(122, 121, 121);
    margin-bottom:5px;
 }
.all-goods {
  padding: 20px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0px 75px 30px;
  justify-content: center;
}
.item {
  width: calc(25% - 10px);
  margin-right: 10px;
  margin-bottom: 40px;
  box-sizing: border-box; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  justify-content: center; 
  text-align: center; 
}

.details, .btn {
  width: 100%; 
  box-sizing: border-box; 
}
.item:nth-child(4n) {
  margin-right: 0; /* Remove margin for the last item in a row */
}
.item:nth-child(4n+1) {
  margin-left: 0; /* Ensure first item in a new row has no left margin */
}
img {
  width: 100%;
  height: 145px;
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
  padding-bottom: 4px;
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
a {
  text-decoration: none;
}
.image-darken {
  filter: grayscale(100%) opacity(0.5); /* 变暗并降低透明度 */
}
.shelved-tag {
  background-color: rgba(255, 0, 0, 0.5); /* 红色背景，透明度0.8 */
  color: white;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 3px;
  margin-left:62px;
  margin-right:62px;
}
</style>