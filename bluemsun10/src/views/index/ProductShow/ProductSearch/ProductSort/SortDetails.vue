<template>
    <div class="nav-bar">
        <Sort1 />
        <Sort2 />
        <Sort3 />
    </div>
</template>
<script setup lang="ts" name="SortDetails">
    import Sort1 from '@/views/index/ProductShow/ProductSearch/ProductSort/Sort1.vue'
    import Sort2 from '@/views/index/ProductShow/ProductSearch/ProductSort/Sort2.vue'
    import Sort3 from '@/views/index/ProductShow/ProductSearch/ProductSort/Sort3.vue'
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