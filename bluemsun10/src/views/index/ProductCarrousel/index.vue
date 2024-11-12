<!-- <template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <div class="carousel-image" :style="{'background-image': 'url(your-image-url)'}"></div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel{
  /* float:left; */
  width:90vw;
  height:400px;
  /* margin-right:5vw; */
  margin: 0 auto;
  padding-bottom:20px;
  padding-top:50px;
}

.el-carousel__item {
  height: 400px; /* 设置轮播项的高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style> -->
<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in images" :key="index">
      <div class="carousel-image" :style="{'background-image': `url(`+item+')'}"></div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
  'image/1.jpg',
  'image/2.jpg',
  'image/3.jpg',
  'image/4.jpg',
]);
</script>

<style scoped>
.el-carousel {
  width: 90vw;
  height: 400px;
  margin: 0 auto;
  padding-bottom: 20px;
  padding-top: 50px;
}

.el-carousel__item {
  height: 400px; /* 设置轮播项的高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.carousel-image{
  height: 100%;
  width: 90vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>