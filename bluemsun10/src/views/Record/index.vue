<template>
    <main>
        <Nav/>
        <div class="form">
            <div class="form_top">
                <h2>进货记录</h2>
                <div>
                    <span>
                    <!-- <input type="button" value="新增" id="add" @click="addAll"> -->
                </span>
                </div>
            </div>
            <div class="form_main">
                <form action="#">
                    <table>
                        <tr class="tr">
                            <!-- <td>进货编号</td> -->
                            <td>货物名称</td>
                            <td>货物图片</td>
                            <td>进货增加</td>
                            <td>货物库存</td>
                            <td>操作</td>
                        </tr>
                        <tr class="tr" v-for="(item,index) in items" :key="item.id">
                            <!-- <td class="id">{{ item.id }}</td> -->
                            <td class="name">{{ item.name }}</td>
                            <td><img :src="item.imageUrl" alt=""></td>
                            <td>{{item.endAmount-item.originAmount}}</td>
                            <td class="amount">{{ item.endAmount }}</td>
                            <td>
                                <input type="button" value="查看详情"  @click="detail(index)" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="bottom">
            <el-pagination layout="prev, pager, next" :total="total" v-model="currentPage" size="large"
            :page-size="6"
            @current-change="handlePageChange"
            id="pagenation"/>
        </div>
        </div>
        
    <div class="alter" :style="{display:displayed2}" style="height: 600px; margin-top:-300px;position:fixed;">
        <div class="alter_title">查看详情</div>
        <table>
            <tr>
                <td>名称：</td>
                <td>{{name}}</td>
            </tr>
            <tr>
                <td>起始数量：</td>
                <td>{{originAmount}}</td>
            </tr>
            <tr>
                <td>现存数量：</td>
                <td>{{endAmount}}</td>
            </tr>
            <!-- <tr>
                <td>校区：</td>
                <td>{{campus}}</td>
            </tr> -->
            <tr>
                <td>增加数量：</td>
                <td>{{endAmount-originAmount}}</td>
            </tr>
            <tr>
                <td>库存：</td>
                <td>{{amount}}</td>
            </tr>
            <tr>
                <td>图片：</td>
                <img :src="imageUrl" class="detailimag">
            </tr>
    </table>
        <div class="btns">
         <button @click="defines">确定</button></div>
    </div>
    </main>
</template>

<script setup lang="ts">
import Nav from '@/components/ManagerNav/index.vue'
import { reactive, ref } from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import {ElMessage } from 'element-plus';
interface Item {
  id: number;
  name: string;
  amount: number;
  goodsId: number; 
  originAmount: number;
  endAmount:number;
imageUrl:string
}
const total=ref(10);
const name = ref('');
const amount = ref(0);
const endAmount = ref(0);
const originAmount = ref(0);
const imageUrl=ref('')
const displayed2=ref('none')
const items = ref<Item[]>([
]);
// 查看详情功能
const detail=(index:number)=>{
    displayed2.value="block"
    datailGoods(items.value[index].id,index)
}
const datailGoods = async (id,index) => {
  try {
    const authToken=localStorage.getItem('token')
    const clientId=localStorage.getItem('client_id')
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
    axios.defaults.headers.common['clientId'] = clientId;
    const response = await axios.get(`http://106.54.24.243:8080/market/restock/info/${id}`) 
    console.log(response.data.data);
    amount.value=response.data.data.amount
    endAmount.value=response.data.data.endAmount
    imageUrl.value=response.data.data.imageUrl
    name.value=response.data.data.name
    originAmount.value=response.data.data.originAmount
  } catch (error) {
    console.error('请求商品数据失败:', error);
    ElMessage.error('查看商品失败')
  }
};
const defines=()=>{
displayed2.value="none"
}
// 获取进货记录列表
const fetchRecord = async (current) => {
  try {
    const authToken=localStorage.getItem('token')
    const clientId=localStorage.getItem('client_id')
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
    axios.defaults.headers.common['clientId'] = clientId;
    const response = await axios.get('http://106.54.24.243:8080/market/restock/list',{
        params:{
            pageSize:6,
            pageNum:current
        }
  }) 

    items.value = response.data.rows;
    total.value=response.data.total    
    console.log(response.data);
    console.log(total.value);
    
    
  } catch (error) {
    console.error('请求商品数据失败:', error);
    ElMessage.error('查看进货流标失败')
  }
};

// 挂载时渲染页面
onMounted(()=>{
    fetchRecord(currentPage.value)
})


// 分页器
// 页码改变时重新加载商品
const currentPage=ref(1)
const handlePageChange = (newPage) => {
 currentPage.value = newPage;
 fetchRecord(currentPage.value)
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    /* 改盒子高度和长度的计算 */
    box-sizing: border-box;
}
/*分页器*/
.bottom{
    position: absolute;
    width: 280px;
    height: 30px;
    bottom: 25px;
    left: 50%;
    margin-left: -140px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.detailimag{
    width: 200px;
    height: 100px;
    vertical-align: text-top;
    border-radius: 20px;
}
.alter{
    display: none;
position: absolute;
top: 50%;
left: 50%;
margin-top: -150px;
margin-left: -300px;
   width: 600px;
   height: 300px;
   border: gray 2px solid;
   border-radius: 20px;
   box-shadow: rgba(0,0,0,.3) 4px 4px 4px;
   backdrop-filter: blur(40px); 
   font-size: 20px;
   line-height: 35px;
   font-weight: 700;
}
.alter .alter_title{
    font-size: 30px;
    color: rgb(51.2, 126.4, 204);
    font-weight: 700;
    padding: 25px;
    text-align: center;
}
.alter table{
    padding: 0 85px;
    line-height: 55px;
}
.alter table td{
    width: 120px;
}
.alter table input{
    margin-left: 20px;
    margin-bottom: 10px;
    width: 300px;
    height: 35px;
    /* 取消选中时的外边框 */
    outline: none;
}
.alter button{
    display: inline-block;
    width: 80px;
    height: 40px;
    font-size: 16px;
    background-color: #3C79B4;
    border: none;
    border-radius: 5px;
    box-shadow: 2px 2px 2px #014F9C;
    color: #EEF7FC;
    font-size: 20px;
    margin: 20px;
}
.btns{
    display: flex;
    justify-content: center;
    align-content: center;
}
img {
    /* 除掉图片底端的空隙 */
    border: 0;
    /* 图片和文字中心对齐 */
    vertical-align: middle;
}
button {
    /* 让鼠标变小手 */
    cursor: pointer;
}
a {
    color: #409EFF;
    text-decoration: none;
}
a:hover {
    color: #f5d6d4;
}
span,
div,
h2 {
    cursor: default;
}
.w {
    width: 1300px;
    margin: 0 auto;
}
main .form {
    height: 1600px;
}

main .form .form_main table tr input[type="button"] {
    margin: 5px;
}

main .form .form_main .tr img {
    width: 40%;
    height: 60%;
}
#checkall,.ck{
    margin: 20px;
    width: 20px;
    height: 20px;
}
/* 表单 */

main .form {
    border-radius: 10px;
    width: 1200px;
    height: 810px;
    margin: auto;
    background-color: #fff;
    position: relative;
    margin-top: 50px;
    border: 1px solid gray;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .4);
}

main .form .form_top {
    height: 100px;
    display: flex;
    justify-content: space-between;
}

main .form .form_top h2 {
    line-height: 100px;
    margin-left: 20px;
    color: rgb(51.2, 126.4, 204);
}

main .form .form_top span {
    height: 100px;
    line-height: 100px;
}

main .form .form_top input {
    width: 120px;
    height: 45px;
    margin: auto 20px;
    border: #fff 1px solid;
    background-color:rgb(51.2, 126.4, 204) ;
    color: #fff;
    font-size: 17px;
    border-radius: 10px;
}

main .form .form_main {
    margin: 0 20px;
}

main .form .form_main .tr {
    width: 1060px;
    height: 60px;
    text-align: center;
    line-height: 60px;
}

main .form .form_main .tr:first-child {
    background-color: #daeef8;
}

main .form .form_main .tr td {
    cursor: default;
    height: 90px;
    width: 230px;
}
main .form .form_main .tr:first-child{
    background-color:rgb(102, 151, 204);
    font-size: 18px;
    color: #fff;
}
main .form .form_main .tr:first-child td{
  height: 60px;
}
main .form .form_main .tr img {
    width: 60%;
    height: 60%;
}

main .form .form_main .tr td a {
    color: black;
}

main .form .form_main .tr td a:hover {
    color: #daeef8;
}

main .form .form_main .tr td:first-child {
    padding: 0;
}

main .form .form_main .tr input[type="button"] {
    cursor: pointer;
    border: none;
    background-color: #fff;
    font-size: 17px;
    color: #519aba;
}

main .form .form_main .tr input[type="button"]:hover {
    color: blue;
}

main .form .form_bottom {
    height: 50px;
    width: 130px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -65px;
}

main .form .form_bottom input {
    width: 45px;
    height: 35px;
    border: #fff 1px solid;
    background-color: #b77880;
    color: #fff;
    font-size: 17px;
    border-radius: 10px;
}

main .form .form_bottom span {
    display: inline-block;
    width: 40px;
    text-align: center;
}
        
</style>