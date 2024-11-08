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
              <div class="price">{{ product.currencyType}}:{{ product.price }}</div>
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
</template>

<script setup name="index">
import { ref,  watch } from 'vue';
import ProductInfo from '@/plugins/ProductInfo/index.vue';
import { RouterLink } from 'vue-router';
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

a{
  text-decoration: none;
}
</style>