<template>
  <div id="app">
    <NavBar />
    <div class="show">
      <!-- <UseStep /> -->
      <ProductCarrousel />
      <!-- <PeopleInfo /> -->
    </div>
    <SearchBox />
    <ProductSearch/>
    <ProductShow />
    
  </div>
</template>
<script setup>
// import UseStep from '@/views/index/UseStep/index.vue';
import ProductCarrousel from '@/views/index/ProductCarrousel/index.vue';
// import PeopleInfo from '@/views/index/PeopleInfo/index.vue';
import SearchBox from '@/views/index/SearchBox/index.vue'; 
import NavBar from '@/components/NavBar/index.vue'; 
import ProductShow from '@/views/index/ProductShow/index.vue';
import ProductSearch from '@/views/index/ProductShow/ProductSearch/index.vue';

</script>

<style>
#app {
  display: block;
  margin: 0 auto;
  padding: 0 0;
}
.show{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>