<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <div class="carousel-image" :style="{'background-image': 'url(your-image-url)'}"></div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel {
  width: 75vw;
  height: 500px;
  margin: 0 auto;
  margin-top: 60px;
}

.el-carousel__item {
  height: 500px; /* 设置轮播项的高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.el-carousel__container {
  height: 500px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.carousel-image {
  width: 100%; /* 图片宽度 */
  height: 100%; /* 图片高度 */
  background-size: cover; /* 覆盖整个容器 */
  background-position: center; /* 图片居中 */
}
</style>