<template>
    <div class="all-goods">
        <div class="content">
            <Goods name="净月商品">
                <img :src="imgUrl" alt="">
                <template #footer>
                    <div class="details">
                        <div class="price">日用币：30</div>
                        <div class="num">库 存：100</div>
                    </div>
                    <div class="btn">
                        <RouterLink :to="{path:'/details'}" active-class="active">
                            <el-button type="primary" plain>查看详情</el-button>
                        </RouterLink>
                    </div>
                    <RouterView></RouterView>
                </template>
            </Goods>
            <Goods name="净月商品">
                <img :src="imgUrl" alt="">
                <template #footer>
                    <div class="details">
                        <div class="price">日用币：30</div>
                        <div class="num">库 存：100</div>
                    </div>
                    <div class="btn">
                        <RouterLink :to="{path:'/details'}" active-class="active">
                            <el-button type="primary" plain>查看详情</el-button>
                        </RouterLink>
                    </div>
                    <RouterView></RouterView>
                </template>
            </Goods>
            <Goods name="净月商品">
                <img :src="imgUrl" alt="">
                <template #footer>
                    <div class="details">
                        <div class="price">日用币：30</div>
                        <div class="num">库 存：100</div>
                    </div>
                    <div class="btn">
                        <RouterLink :to="{path:'/details'}" active-class="active">
                            <el-button type="primary" plain>查看详情</el-button>
                        </RouterLink>
                    </div>
                    <RouterView></RouterView>
                </template>
            </Goods>
            <Goods name="净月商品">
                <img :src="imgUrl" alt="">
                <template #footer>
                    <div class="details">
                        <div class="price">日用币：{{price}}</div>
                        <div class="num">库 存：{{num}}</div>
                    </div>
                    <div class="btn">
                        <RouterLink :to="{path:'/details'}" active-class="active">
                            <el-button type="primary" plain>查看详情</el-button>
                        </RouterLink>
                    </div>
                    <RouterView></RouterView>
                    
                </template>
            </Goods>
        </div>
    </div>
</template>

<script setup lang="ts" name="index">
    import { RouterView ,RouterLink} from 'vue-router'
    import Goods from "./Goods.vue";
    import {ref} from 'vue'
    let num=ref(20);
    let price=ref(20)
    let imgUrl=ref('image/商品图片1.jpg')
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}
.all-goods{
    padding:20px;
    /* background-color: rgb(242, 244, 245); */
}
.content{
    display: flex;
    justify-content: space-evenly;
    /* 均分 */
    flex-wrap: wrap
}
img{
   width: 95%;
   height:48%;
   padding-left:2.5%;
}
img:hover{
    transform: scale(1.1);
}
.details{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom:10px;
}
.price{
    margin-bottom:8px;
}
.price,.num{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.btn {
    width: 100%;
    display: flex;
    justify-content: center;

     
}
</style>