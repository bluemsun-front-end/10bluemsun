<template>
<main>
    <Nav/>
    <div class="form">
        <div class="form_top">
            <h2>商品信息列表</h2>
            <div>
            <span>
                <input type="button" value="删除" id="delect" @click="deleteALl">
            </span>
            <span>
                <input type="button" value="新增" id="add" @click="addAll">
            </span>
        </div>
        </div>
        <div class="form_main">
            <form action="#">
                <table>
                    <tr class="tr">
                        <td><input type="checkbox" id="checkall" @click="toggleCheckAll" v-model="checkall"></td>
                        <!-- <td>商品编号</td> -->
                        <td>商品名称</td>
                        <td>商品图片</td>
                        <td>商品库存</td>
                        <td>商品价格</td>
                        <td>操作</td>
                    </tr>
                    <tr class="tr" v-for="(item, index) in items" :key="item.id">
                        <td class="first">
                            <input type="checkbox" class="ck" v-model="item.checked" @change="updateCheckAll">
                        </td>
                        <!-- <td class="ID">{{ item.id }}</td> -->
                        <td class="name">{{ item.name }}</td>
                        <td><img :src="item.imageUrlUrl" alt=""></td>
                        <td class="rest">{{ item.amount }}</td>
                        <td class="price">{{item.currencyType}}币：{{ item.price }}</td>
                        <td>
                            <input type="button" value="删除" class="delete" @click="deleteItem(index)">
                            <input type="button" value="增加货物" class="addGoodsRecord" @click="addGoodsRecord(index)"><br/>
                            <input type="button" value="修改" class="modify" @click="modifyItem(index)">
                            <input type="button" value="查看详情" class="modify" @click="detail(index)">
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="bottom">
            <el-pagination layout="prev, pager, next" :total=totalNum v-model="currentPage" size="large" page-size="6" page-count=50
            @current-change="handlePageChange"
            id="pagenation"/>
        </div>
    </div>
    <div class="alter" :style="{display:displayed3}" style="height:300px;margin-top:-300px">
        <div class="alter_title" style="padding: 30px;">新增进货记录</div>
        <table>
            <tr>
                <td>货物名称：</td>
                <td style="padding-left:20px;">{{name}}</td>
            </tr>
            <tr>
                <td>货物数量：</td>
                <td><input type="text" v-model="amount2"></td>
            </tr>
        </table>
            <div class="btns"><button @click="addRecord">提交</button>
            <button @click="cancel2">取消</button></div>
     </div>
    <div class="alter" :style="{display:displayed}" style="position:fixed;height:700px;">
        <div class="alter_title" style="padding: 15px;">{{alter_title}}</div>
        <table>
            <tr>
                <td>名称：</td>
                <td><input type="text" v-model="name"></td>
            </tr>
            <tr>
                <td>价格：</td>
                <td><input type="text" v-model="price"></td>
            </tr>
            <tr>
                <td>货币类型：</td>
                <td><input type="text" v-model="currencyType"></td>
            </tr>
            <!-- <tr> -->
                <!-- <td>校区：</td>
                <td><input type="text" v-model="status"></td>
            </tr> -->
            <tr>
                <td>限额：</td>
                <td><input type="text" v-model="limitNum"></td>
            </tr>
            <tr>
                <td>限制类型：</td>
                <td><input type="text" v-model="limitType"></td>
            </tr>
            <tr v-if="alter_title=='修改货物'">
                <td>库存：</td>
                <td><input type="text" v-model="amount"></td>
            </tr>
            <tr v-if="alter_title=='增加货物'">
                <td>介绍：</td>
                <td><input type="text" v-model="intro"></td>
            </tr>
            <tr>
                <td>单位：</td>
                <td><input type="text" v-model="quantifier"></td>
            </tr>
            <tr>
                <td>图片：</td>
                <input type="file" @change="handleFileChange"  ref="fileInput"  style="display: none;">
                <td v-if="alter_title=='修改货物'"><img :src="imageUrlUrl" class="detailimag" style="margin-left: 20px;" @click="handleFileChange2"></td>
                <td v-if="alter_title=='增加货物'"><span style="padding: 20px; color:rgb(51.2, 126.4, 204) " @click="triggerFileInput">{{putimg}}</span></td>
            </tr>
    </table>
        <div class="btns"><button @click="addItem">提交</button>
         <button @click="cancel">取消</button></div>
    </div>
    <div class="alter" :style="{display:displayed2}" style="height: 650px;position:fixed;">
        <div class="alter_title" style="padding: 15px;">查看详情</div>
        <table>
            <tr>
                <td>名称：</td>
                <td>{{name}}</td>
            </tr>
            <tr>
                <td>商品类型：</td>
                <td>{{type}}</td>
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
                <td>限额：</td>
                <td>{{limitNum}}</td>
            </tr>
            <tr>
                <td>限制类型：</td>
                <td>{{limitType}}</td>
            </tr>
            <tr>
                <td>库存：</td>
                <td>{{amount}}</td>
            </tr>
            <tr>
                <td>介绍：</td>
                <td>{{intro}}</td>
            </tr>
            <tr>
                <td>图片：</td>
                <img :src="imageUrlUrl" class="detailimag">
            </tr>
    </table>
        <div class="btns">
         <button @click="defines">确定</button></div>
    </div>
</main>
</template>

<script setup lang="ts">
// import OSS from 'ali-oss';
import Nav from '@/components/ManagerNav/index.vue'
import {reactive,ref} from 'vue';
import { onMounted } from 'vue';
import axios from 'axios';
import { it } from 'element-plus/es/locale';
// 使用 ref 创建每个字段的响应式引用
    const name = ref('(*^▽^*)');
    const price = ref(0);
    const currencyType = ref('1');
    const type = ref('日常');
    const status = ref('1');
    const barcode = ref('1 ');
    const intro = ref('你好');
    const limitNum = ref(10);
    const limitType = ref('1');
    const amount=ref(10)
    const quantifier = ref('1');
    const imageUrl=ref('')
    const imageUrlUrl = ref('');
    const id=ref('')
    const campus=ref('')
    const displayed=ref('none')
    const displayed2=ref('none')
interface Item {
  id: string;
  name: string;
  imageUrlUrl: string;
  amount: number;
  price: number;
  currencyType:string,
  checked: boolean; // 用于单选框状态
}
const alter_title=ref('增加货物')
const totalNum=ref(0)
const items = ref<Item[]>([
    //   { id: 'LX-202300', name: '火锅底料11', imageUrlUrl: 'https://vichywhite.oss-cn-beijing.aliyuncs.com/wxy2023013440/202411021122649.png', amount: 12,  price: 23, checked: false }
    ]);
//发送获取列表的请求
const fetchGoods = async (current) => {
  try {
    const authToken=localStorage.getItem('token')
    const clientId=localStorage.getItem('client_id')
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
    axios.defaults.headers.common['clientId'] = clientId;
    const response = await axios.get('http://106.54.24.243:8080/market/goods/list',{
        params:{
            pageSize:6,
            pageNum:current
        }
    }) // 请求商品数据
    totalNum.value=response.data.total
    console.log(response.data);
    items.value = response.data.rows;
    for(let i=0;i<response.data.rows.length;i++){
        if(items.value[i].currencyType=='0'){
            items.value[i].currencyType='日常'
        }
        else{
            items.value[i].currencyType='服装'
        }
    }
    // console.log(items.value);
    
  } catch (error) {
    console.error('请求商品数据失败:', error);
  }
};

const selectedFile = ref(null);
onMounted(()=>{
    fetchGoods(currentPage.value)
})

//发送增加的请求
const putimg=ref('点击提交图片')
    const addAll=()=>{
        displayed.value='block'
        alter_title.value='增加货物'        
    }
    const addItem=()=>{
        if(alter_title.value==='增加货物'){
             addGoods()
            fetchGoods(currentPage.value)
            displayed.value='none'
        }
       if(alter_title.value==='修改货物'){
        modifyGoods(indexx.value)
       }
    }
    const cancel=()=>{
        displayed.value='none'
    }
    const addGoods = async () => {
     try {
        const authToken=localStorage.getItem('token')
        const clientId=localStorage.getItem('client_id')
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
        axios.defaults.headers.common['clientId'] = clientId;
        const requestData = {
            name: name.value,
            price: price.value,
            currencyType: currencyType.value,
            type: type.value,
            status: status.value,
            barcode: barcode.value,
            intro: intro.value,
            limitNum: limitNum.value,
            limitType: limitType.value,
            quantifier: quantifier.value,
            imageUrl:imageUrl.value,
            };
         const response = await axios.post(`http://106.54.24.243:8080/market/goods`,requestData) 
            // console.log(response.data);
            // console.log(imageUrl.value);
            fetchGoods(currentPage.value)
        } catch (error) {
            console.error('请求商品数据失败:', error);
    }
    };


    // 更新全选状态
    const checkall=ref(false)
    const updateCheckAll = () => {
        checkall.value=items.value.every(item => item.checked)
    };
    // 切换全选
    const toggleCheckAll = () => {
        checkall.value=!checkall.value
        items.value.forEach(item => {
        item.checked = checkall.value;
      })
    }
    
    // 删除指定项
    const deleteItem = (index: number) => {
     console.log(items.value[index].id)
     delectGoods(items.value[index].id)
    fetchGoods(currentPage.value)
    };
    // 删除请求
    const delectGoods = async (id) => {
     try {
        const authToken=localStorage.getItem('token')
        const clientId=localStorage.getItem('client_id')
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
        axios.defaults.headers.common['clientId'] = clientId;
         const response = await axios.delete(`http://106.54.24.243:8080/market/goods/${id}`) // 请求商品数据
      console.log(response.data);
      fetchGoods(currentPage.value)
    //   window.location.reload()
        } catch (error) {
            console.error('请求商品数据失败:', error);
    }
    };


    
    // 删除全部
    const deleteALl=()=>{
        for (let i = 0; i < items.value.length; i++){
            if(items.value[i].checked===true){
                delectGoods(items.value[i].id)
            }
        }
        checkall.value=false
        // fetchGoods(currentPage)
    }

    
    // 修改
// 处理文件选择
const fileInput = ref(null);
const handleFileChange = (event) => {
  const formData = new FormData();
  const imageFile = event.target.files[0];
  if (imageFile) {
    formData.append('file', imageFile);
    addFile(formData)
};
}
const addFile = async (formData) => {
  try {
    const authToken=localStorage.getItem('token')
        const clientId=localStorage.getItem('client_id')
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
        axios.defaults.headers.common['clientId'] = clientId;
    const response = await axios.post('http://106.54.24.243:8080/resource/oss/upload', formData);
    // console.log(response.data.data.ossId);
    imageUrl.value=response.data.data.ossId
    putimg.value='提交图片成功'
    getimag(imageUrl.value)
  } catch (error) {
    console.error('上传失败:', error);
    // 在这里添加用户友好的错误提示
  }
  
};
// 图片回显
const getimag=async (ossIds)=>{
    console.log(ossIds);
     const authToken=localStorage.getItem('token')
        const clientId=localStorage.getItem('client_id')
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
        axios.defaults.headers.common['clientId'] = clientId;
        const response = await axios.get(`http://106.54.24.243:8080/resource/oss/listByIds/${ossIds}`)
        console.log(response.data.data[0].url);
        imageUrlUrl.value=response.data.data[0].url
}
const handleFileChange2=(event)=>{
fileInput.value.click();
}
// 触发文件输入点击事件的方法
const triggerFileInput = () => {
  fileInput.value.click();
};
     const modifyGoods = async (indexx) => {
        console.log(indexx);
        if(currencyType.value==='日常币')
            currencyType.value='1'
        else currencyType.value='0'
     try {
        const authToken=localStorage.getItem('token')
        const clientId=localStorage.getItem('client_id')
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
        axios.defaults.headers.common['clientId'] = clientId;
            let requestData = {
            id:items.value[indexx].id,
            name: name.value,
            price: price.value,
            currencyType: currencyType.value,
            type: type.value,
            status: status.value,
            barcode: barcode.value,
            intro: intro.value,
            limitNum: limitNum.value,
            limitType: limitType.value,
            quantifier: quantifier.value,
            imageUrl: imageUrl.value,
            };
         const response = await axios.put(`http://106.54.24.243:8080/market/goods`,requestData) 
            console.log(response.data);
        } catch (error) {
            console.error('请求商品数据失败:', error);
         }
    try {
        const authToken=localStorage.getItem('token')
        const clientId=localStorage.getItem('client_id')
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
        axios.defaults.headers.common['clientId'] = clientId;
         const response = await axios.put(`http://106.54.24.243:8080/market/warehouse`,{
                amount:amount.value,
                goodsId:items.value[indexx].id
         }) // 请求商品数据
    //   console.log(response.data);
      fetchGoods(currentPage.value)
    //   window.location.reload()
        } catch (error) {
            console.error('请求商品数据失败:', error);
    }
    displayed.value='none'
    };
    const indexx=ref(0)
    const modifyItem = (index: number) => {
        indexx.value=index
        displayed.value="block"
        alter_title.value="修改货物"
        datailGoods(items.value[index].id,index)
        // modifyGoods(index)
        // fetchGoods(currentPage.value)
    };
    // 查看详情
    const detail=(index:number)=>{
        displayed2.value="block"
        datailGoods(items.value[index].id,index)
        // console.log(items.value[index].id);
        
    }
    const datailGoods = async (id,index) => {
  try {
    const authToken=localStorage.getItem('token')
    const clientId=localStorage.getItem('client_id')
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
    axios.defaults.headers.common['clientId'] = clientId;
    const response = await axios.get(`http://106.54.24.243:8080/market/goods/${id}`) // 请求商品数据
    console.log(response.data.data);
    // items.value[index]=response.data.data
    // id.value=response.data.data.id
    name.value=response.data.data.name
    price.value=response.data.data.price
    currencyType.value=response.data.data.currencyType
    if(currencyType.value=='1') currencyType.value='日常币'
    else currencyType.value='服装币'
    type.value=response.data.data.type
    status.value=response.data.data.status
    barcode.value=response.data.data.barcode
    intro.value=response.data.data.intro
    limitNum.value=response.data.data.limitNum
    limitType.value=response.data.data.limitType
    quantifier.value=response.data.data.quantifier
    imageUrl.value=response.data.data.imageUrl
    campus.value=response.data.data.campus
    imageUrlUrl.value=response.data.data.imageUrlUrl
    imageUrl.value=response.data.data.imageUrl
    amount.value=response.data.data.amount
  } catch (error) {
    console.error('请求商品数据失败:', error);
  }
};
const defines=()=>{
    displayed2.value="none"
}
// 分页器
// 页码改变时重新加载商品
const currentPage=ref(1)
const handlePageChange = (newPage) => {
 currentPage.value = newPage;
 fetchGoods(currentPage.value)
 checkall.value=false
};
// 增加进货记录
// 使用 ref 创建每个字段的响应式引用
    const goodsId = ref('1');
    const amount2 = ref(10);
    const displayed3=ref('none')
    const addGoodsRecord=(index)=>{
        displayed3.value='block'    
        name.value=items.value[index].name
        goodsId.value=items.value[index].id    
        // console.log(items.value[index].id);
    }
    const cancel2=()=>{
        displayed3.value='none'
    }
    const addRecord = async (index) => {
     try {
        const authToken=localStorage.getItem('token')
        const clientId=localStorage.getItem('client_id')
        axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`; 
        axios.defaults.headers.common['clientId'] = clientId;
        const requestData = {
            goodsId:goodsId.value,
            amount:amount2.value
            };
         const response = await axios.post(`http://106.54.24.243:8080/market/restock`,requestData) // 请求商品数据
            console.log(response.data);
        } catch (error) {
            console.error('请求商品数据失败:', error);
    }
    displayed3.value="none"
    fetchGoods(currentPage.value)
    };


</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    /* 改盒子高度和长度的计算 */
    box-sizing: border-box;
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
margin-top: -330px;
margin-left: -300px;
   width: 600px;
   height: 660px;
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
    padding: 15px;
    text-align: center;
}
.alter table{
    padding: 0 80px;
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
    position: absolute;
    bottom: 30px;
    width: 600px;
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
    position: relative;
}

main .form .form_main table tr input[type="button"] {
    margin: 5px;
}

main .form .form_main .tr img {
    width: 20%;
    height: 50%;
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
    height: 40px;
    text-align: center;
    line-height: 40px;
}

main .form .form_main .tr td {
    width: 215px;
    height: 90px;
    cursor: default;
}
main .form .form_main .tr:first-child td{
  height: 60px;
}
main .form .form_main .tr:first-child{
    background-color:rgb(102, 151, 204);
    font-size: 18px;
    color: #fff;
}
main .form .form_main .tr:first-child td{
  height: 40px;
}
main .form .form_main .tr td:first-child{
    width: 70px;
}
main .form .form_main .tr img {
    height: 60%;
    width: 60%;
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