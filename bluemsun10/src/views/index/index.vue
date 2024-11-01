<template>
  <div id="app">
    <NavBar />
    <ProductCarrousel />
    <SearchBox />
    <ProductSearch/>
    <ProductShow />
    
  </div>
</template>
<script>
import ProductCarrousel from '@/views/index/ProductCarrousel/index.vue';
import SearchBox from '@/views/index/SearchBox/index.vue'; 
import NavBar from '@/components/NavBar/index.vue'; 
import ProductShow from '@/views/index/ProductShow/index.vue';
import ProductSearch from '@/views/index/ProductShow/ProductSearch/index.vue';
export default {
  name: 'App',
  components: {
    NavBar,
    ProductCarrousel,
    SearchBox,
    ProductShow,
    ProductSearch
  }
};
</script>

<style>
#app {
  display: block;
  margin: 0 auto;
  padding: 0 0;
}
</style>