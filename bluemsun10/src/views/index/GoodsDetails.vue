<template>
    <section id="productDetailModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 id="productName">商品详情</h2>
        <img id="productImage" :src="productDetail.imageUrlUrl" alt="商品图片">
        <h2 id="productDescription">{{ productDetail.name }}</h2>
        <br>
        <span id="name">商品介绍:{{ productDetail.intro }}</span>
        <br>
        <span id="number">库存:{{ productDetail.amount }}</span>
        <br>
        <span id="con-price">价格:{{ productDetail.currencyType }} {{ productDetail.price }}</span>
        <br>
        <br>
        <div class="count">
          <span>数量：</span>
          <div class="update">
            <button class="btn1" @click="minus">-</button>
            <div class="num">{{ num }}</div>
            <button class="btn1" @click="add">+</button>
          </div>
        </div>
        <br>
        <div class="btn-box">
          <div class="mb-4">
            <!-- <el-button type="primary" round @click="buyNow">立即购买</el-button> -->
            <el-button type="primary" round @click="addToCart">加入购物车</el-button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Axios from '../Axios/index';
  import { useRouter } from 'vue-router';
  //
  import { useRoute } from 'vue-router';
  //
  const productDetail = ref({});
  const num = ref(1);
  
  const router = useRouter();
    const closeModal = () => {
      router.back(); // 返回上一页面
    };
  
  const minus = () => {
    if (num.value > 1) {
      num.value--;
    }
  };
  
  const add = () => {
    if(num.value < productDetail.value.amount)
        num.value++;
  };

  const addToCart = () => {
  // 检查库存是否大于0（修改）
  if (productDetail.value.amount > 0) {
    const payload = {
      goodsId: productDetail.value.id,
      num: num.value
    };
    Axios.post('http://106.54.24.243:8080/market/cart', payload)
      .then(response => {
        if(response.data.code===500)
        {
          alert(response.data.msg);
          console.log('商品下架', response);
        }
        else{
          console.log('加入购物车成功', response);
          alert('加入购物车成功');
        }
      })
      .catch(error => {
        console.error('加入购物车失败', error);
        alert('加入购物车失败');
      });
  } else {
    // 如果库存为0，提示用户库存不足
    alert('库存不足，无法加入购物车');
  }
};
  const route = useRoute();
  const fetchProductDetail = async () => {
    const productId = route.query.id;
    try {
      const response = await Axios.get(`http://106.54.24.243:8080/market/goods/${productId}`);
      productDetail.value = response.data.data;
      if(productDetail.value.currencyType==0)
      {
        productDetail.value.currencyType="日用币";
      }
      else{
        productDetail.value.currencyType="服装币";
      }
    } catch (error) {
      console.error('获取商品详情失败', error);
    }
  };
  
  fetchProductDetail();
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
    background-color: rgb(36, 39, 39);
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
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    /* height:100vh; */
    overflow: auto;
    background-color: rgba(22, 22, 22, 0.469);
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