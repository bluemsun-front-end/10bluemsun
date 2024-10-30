<template>
    <div class="nav-bar">
        <ProductClass />
        <ProductSort />
        <CurrencySort />
    </div>
</template>
<script setup lang="ts" name="SortDetails">
    import CurrencySort from './CurrencySort/index.vue'
    import ProductSort from './ProductSort/index.vue'
    import ProductClass from './ProductClass/index.vue'
</script>
<style scoped>
    .nav-bar{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 10vh;
        /* background: #e0dede; */
        color: #171616;
        border-radius: 10px;
    }
</style>