<template>
    <section id="productDetailModal" class="modal" >
     <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 id="productName">商品名称</h2>
        <img id="productImage" :src="imgUrl" alt="商品图片">
        <p id="productDescription">商品描述...</p>
        <br>
        <span id="name">{{name}}</span>
        <br>
        <span id="number">库存:{{ number }}</span>
        <br>
        <span id="con-price">价格:{{ con_price }}</span>
        <br>
        <br>
        <div class="count">
            <span>数量：</span>
            <div class="update">
                <button class="btn1" @click="minus">-</button>
                <div class="num">{{num }}</div>
                <button class="btn1" @click="add">+</button>
            </div>
        </div>
        <br>
        <div class="btn-box">
            <div class="mb-4">
                <el-button type="primary" round>立即购买</el-button>
                <el-button type="primary" round>加入购物车</el-button>
            </div>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">
    import {ref} from 'vue'
    import { useRouter } from 'vue-router';
    let imgUrl=ref('image/商品图片1.jpg')
    const name=ref('净月商品')
    const number=ref(100)
    const con_price=ref('日用币 100')
    const num=ref(1)

    const router = useRouter();
    // 定义关闭按钮的点击事件处理函数
    const closeModal = () => {
    router.back(); // 返回上一页面
    };

    function minus(){
        if (num.value > 1) {
            num.value--;
        }
    }
    function add(){
        num.value++;
    }
    
</script>
<style scoped>
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
.main-container2{
    display:flex;
    flex-direction: row;
}
.main{
    width:19vw;
    height:54vh;
    box-shadow: inset 0 0 0 0 rgb(0, 0, 0.2);
    border-radius: 10px;
    margin-left:5vh;
    margin-right:5vh;
    margin-top:3vh;
    
}
.content{
    width:18vw;
    height: 48vh;
    margin-top: 2vh;
    margin-left:0.5vw;
    background-color: rgb(238, 239, 239);
    display:flex;
    flex-direction: column;
   border-radius: 10px;
}
.image img{
    width: 14vw;
    height: 23vh;
    margin:1vw;
    margin-left:1vw;
}
#productName{
    padding-bottom:10px;
}
.main:hover{
    border:1px solid orangered;
}
.name span{   
    float: left;
    margin:0 auto;
    margin-bottom: 2vh;
    line-height: 18px;
    font-size: 16px;
    letter-spacing: 0.05em;
    height: 5.6vh;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
.name span:hover{
    color:orangered;
}
.amount span{
    font-size: 14px;
    font-weight:bold;
}
.price span{
    height: 20px;
}
#categoryContainer button {
    margin: 5px;
    padding: 5px 10px;
}

#productListContainer {
    display: flex;
    flex-wrap: wrap;
}

.productItem {
    border: 1px solid #ddd;
    margin: 5px;
    padding: 10px;
    text-align: center;
    margin-left:2vw;
}

.modal {
    /* display: none; */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.modal-content{
    height:400px;
}
#productImage{
    width: 300px;
    height: 300px;
    float:left;
    
}
#productDescription{
    float:left;
    font-size: 25px;
    font-weight:bold;
    padding-left:20px;
    padding-bottom:20px;
    width: 49vw;
}
#number{
    float:left;
    font-size:18px;
    color:orangered;
    padding-left:20px;
    padding-bottom:20px;
    width: 49vw;
}
#con-price{
    float:left;
    font-size:18px;
    padding-left:20px;
    padding-bottom:20px;
    width: 49vw;
}
#name{
    float:left;
    font-size:18px;
    padding-left:20px;
    padding-bottom:20px;
    width: 49vw;
}
#position{
    float:left;
    font-size:18px;
    padding-left:20px;
    padding-bottom:20px;
    width: 49vw;
}
.btn-box{
    float:left;
    height:7vh;
    border:none;
    font-size:20px;
    color:white;
    margin-right:5vw;
    margin-left:2vw;
    width:40%;
    line-height:7vh;
    display:flex;
    flex-direction: row;
}

.count{
    display:flex;
    flex-direction: row;
    font-size:18px;
    padding-left:20px;
    padding-bottom:20px;
    width: 49vw;
}
.update{
    display:flex;
    flex-direction: row;

}
.num{
    width:3vw;
    padding-left: 1vw;
    padding-right: 1vw;
}
.btn1{
    width: 2vw;
    height: 3vh;
}
</style>