<template>
    <div class="goods-disaplay">
        <slot></slot>
        <!-- <h2>{{name}}</h2> -->
         <slot name="title"></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script setup lang="ts" name="Goods">
    defineProps(['name'])
</script>

<style scoped>

.goods-disaplay{
    /* background-color:rgb(235.9, 245.3, 255);
     */
     background-color: rgb(247, 249, 250);
    border-radius: 10px;
    padding:1.5vw;
    /* width:17vw; */
    /* height: 50vh; */
    height: 283px;
    width:180px;
}
.goods-disaplay:hover{
    box-shadow:0 0 10px rgb(51.2, 126.4, 204);
    transition: all 0.2s;
}
h2{
    text-align: center;
    font-size:20px;
    font-weight: 800;
    color:rgb(122, 121, 121);
}
</style>
