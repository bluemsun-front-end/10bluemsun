<template>


<ShopCart>


    <NavBar />
    <el-main>
      <router-view></router-view>
    </el-main>

</ShopCart>


</template>


<script setup>

import ShopCart from './views/ShopCart/index.vue'
import NavBar from './components/NavBar/index.vue'

<style scoped>

</style>
