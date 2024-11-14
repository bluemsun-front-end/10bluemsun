<template> 
<title >123</title>
  <main>
    <Nav />
    <div class="form">
      <div class="form_top">
        <h2>订单列表</h2>
        <span>
          <input type="button" value="核销" id="add" @click="deleteSelectedOrders" />
        </span>
      </div>
      <div class="form_main">
        <form action="#">
          <table>
            <tr class="tr">
              <td><input type="checkbox" id="checkall" @click="toggleCheckAll" v-model="checkall" /></td>
              <td>订单编号</td>
              <td>订单时间</td>
              <td>订单状态</td>
              <td>用户名称</td>
              <td>订单总价</td>
              <td>操作</td>
            </tr>
            <tr class="tr" v-for="(order, index) in orders" :key="order.id">
              <td>
                <input type="checkbox" class="ck" v-model="order.checked" @change="updateCheckAll" />
              </td>
              <td class="ID">{{ order.id }}</td>
              <td class="createTime">{{ order.createTime }}</td>
              <td class="status">{{ order.status }}</td>
              <td class="username">{{ order.username }}</td>
              <td class="userId">服装币:{{order.clothingBalance}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日常币:{{order.generalBalance}}</td>
              <td>
                <input type="button" value="核销" class="delete" @click="deleteOrder(index)" />
                <input type="button" value="查看详情" class="delete" @click="detail(index)" />
              </td>
            </tr>
          </table>
        </form>
      </div>
      <div class="bottom">
        <el-pagination layout="prev, pager, next" :total="orderTotal" v-model="currentPage" :page-size="11"
          @current-change="handlePageChange" size="large" id="pagenation"/>
      </div>
    </div>
    <div class="alter" :style="{display:displayed2}" style="height: 630px; margin-top:-300px;position:fixed;">
      <div class="alter_title">查看详情</div>
      <table>
        <tr>
          <td>名称：</td>
          <td>{{goodsName}}</td>
        </tr>
        <tr>
          <td>价格：</td>
          <td>{{price}}</td>
        </tr>
        <tr>
          <td>货币类型：</td>
          <td>{{currencyType}}</td>
        </tr>
        <tr>
          <td>数量：</td>
          <td>{{amount}}</td>
        </tr>
        <tr>
          <td>订单号：</td>
          <td>{{orderId}}</td>
        </tr>
        <tr>
          <td>货物编号：</td>
          <td>{{goodsId}}</td>
        </tr>
        <tr>
          <td>图片：</td>
          <td><img :src="imageUrl" class="detailimag"></td>
        </tr>
      </table>
      <div class="bottom" style="bottom: 10px;">
        <el-pagination layout="prev, pager, next" :total="detailTotal" v-model="currentPage2"  :page-size="1"
          @current-change="handlePageChange2" id="pagenation"/>
      </div>
      <div class="btns" style="margin-top: 15px;">
        <button @click="defines">确定</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Nav from '@/components/ManagerNav/index.vue'
import { reactive, ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { pa } from 'element-plus/es/locale';

interface Order {
  id: string;
  status: string;
  checked: boolean; 
  userId: string;
  username: string;
  createTime: string;
  clothingBalance: string;
  generalBalance: string;
}

const orders = ref<Order[]>([]);

const currentPage = ref(1);
const orderId = ref(1);
const goodsId = ref(0);
const amount = ref(1);
const currencyType = ref('日常');
const price = ref('1');
const goodsName = ref('1 ');
const imageUrl = ref('你好');
const displayed2 = ref('none');
const currentPage2 = ref(1);
const orderTotal = ref(0); // 总订单数 
const detailTotal=ref(0)
const checkall = ref(false);
let orderID;

const handlePageChange2 = (newPage) => {
  currentPage2.value = newPage;

  datailOrder(orderID, currentPage2.value);
  
};

const detail = (index: number) => {
  displayed2.value = "block";
  orderID = orders.value[index].id;
  datailOrder(orderID, currentPage2.value);
};

const datailOrder = async (id, current) => {
  try {
    const authToken = localStorage.getItem('token');
    const clientId = localStorage.getItem('client_id');
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
    axios.defaults.headers.common['clientId'] = clientId;
    
    const response = await axios.get(`http://106.54.24.243:8080/market/orderInfo/page`, {
      params: {
        orderId: id,
        pageSize: 1,
        pageNum: current
      }
    });
    console.log('整个详情', response)
    console.log('详情的总数', response.data.total)

    detailTotal.value = response.data.total;  // 更新总订单数
    goodsName.value = response.data.rows[0].goodsName;
    price.value = response.data.rows[0].price;
    currencyType.value = response.data.rows[0].currencyType === '0' ? '日常币' : '服装币';
    amount.value = response.data.rows[0].amount;
    orderId.value = response.data.rows[0].orderId;
    goodsId.value = response.data.rows[0].goodsId;
    imageUrl.value = response.data.rows[0].imageUrl;
  } catch (error) {
    console.error('请求商品数据失败:', error);
  }
};

const defines = () => {
  displayed2.value = "none";
};

const fetchOrder = async (current) => {
  try {
    const authToken = localStorage.getItem('token');
    const clientId = localStorage.getItem('client_id');
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
    axios.defaults.headers.common['clientId'] = clientId;

    const response = await axios.get('http://106.54.24.243:8080/market/order/adminlist', {
      params: {
        pageSize: 11,
        pageNum: current
      }
    });

    orders.value = response.data.rows; 
    orderTotal.value = response.data.total; // 更新总订单数 
    orders.value.forEach((order, i) => {
      if (order.status === '2') {
        orders.value[i].status = '成功';
      } else if (order.status === '1') {
        orders.value[i].status = '失败';
      } else if (order.status === '0') {
        orders.value[i].status = '未知';
      }
    });
  } catch (error) {
    console.error('请求商品数据失败:', error);
  }
};

onMounted(() => {
  fetchOrder(currentPage.value);
});

const updateCheckAll = () => {
  checkall.value = orders.value.every(order => order.checked);
};

const toggleCheckAll = () => {
  checkall.value = !checkall.value;
  orders.value.forEach(order => {
    order.checked = checkall.value;
  });
};

const delectOrders = async (id) => {
  try {
    const authToken = localStorage.getItem('token');
    const clientId = localStorage.getItem('client_id');
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
    axios.defaults.headers.common['clientId'] = clientId;
    
    await axios.post(`http://106.54.24.243:8080/market/order/check/${id}`);
  } catch (error) {
    console.error('请求商品数据失败:', error);
  }
};

const deleteOrder = (index: number) => {
  delectOrders(orders.value[index].id);
  fetchOrder(currentPage.value);
};

const deleteSelectedOrders = () => {
  orders.value.forEach(order => {
    if (order.checked) {
      delectOrders(order.id);
    }
  });
  fetchOrder(currentPage.value);
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchOrder(currentPage.value);
  checkall.value = false;
};
</script>

<style scoped>
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
    line-height: 45px;

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
* {
    padding: 0;
    margin: 0;
    /* 改盒子高度和长度的计算 */
    box-sizing: border-box;
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
    height: 1200px;
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
    cursor: pointer;
}

main .form .form_main {
    margin: 0 20px;
}

main .form .form_main .tr {
    width: 1060px;
    height: 60px;
    text-align: center;
    line-height: 40px;
}

main .form .form_main .tr:first-child{
    background-color:rgb(102, 151, 204);
    font-size: 18px;
    color: #fff;
}
main .form .form_main .tr td:first-child{
  width: 20px;
}
main .form .form_main .tr td {
    cursor: default;
    width: 220px;
    height: 85px;
}
main .form .form_main .tr:first-child td{
  height: 60px;
}

main .form .form_main .tr img {
    width: 70%;
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
