<template>
  <el-header>
    <div class="header-content">
      <div class="top_hello">
        <span style="margin-left: 40px;" class="name">爱心超市</span>
      </div>
      <div class="header_menu">
        <span class="cloud"></span>
        <ul class="menuList">
         <li
      v-for="(item, index) in menuItems"
      :key="index"
      :class="{active:(isActive===index)}"
      @click="handleClick(index)"
    >
      {{ item.label }}
    </li>
        </ul>
      </div>
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="65" :src="circleUrl" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
// import { watch } from 'fs';
import { ref, reactive, toRefs,watch } from 'vue'
  import { useRouter } from 'vue-router';
  // import { onMounted } from 'vue';
  const router=useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const menuItems= [
        { label: '管理货物'},
        { label: '进货记录'},
        { label: '订单管理'},
        // { label: '退出登录'},
      ]

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})
const { circleUrl, squareUrl, sizeList } = toRefs(state)
const isActive = ref(0); 
const handleClick=(index)=>{
  isActive.value=index
  console.log(index);
  if(index===0){
    router.push('/manage')
  }
  if(index===1){
    router.push('/record')
  }
  if(index===2){
    router.push('/order')
  }
}

// forceUpdate()
</script>

<style scoped>
li{
  cursor: default;
}
.header-content {
  display: flex; /* 使用 flexbox 布局 */
  width: 1300px;
  margin: auto;
  justify-content: space-between; /* 均匀分配空间 */
  align-items: center; /* 垂直居中对齐 */
  height: 85px; /* 设置高度 */
  border-bottom: 1px solid rgb(243.9, 244.2, 244.8);
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.name{
  color: rgb(51.2, 126.4, 204);
  font-weight: 700;
  font-size: 40px;
}
.top_hello, .money {
  font-size: 18px;
}

.top_hello span {
  font-size: 30px;
  margin-right: 42px;
  letter-spacing: 0.1em;
}

.top_hello .campus {
  margin-right: 30px;
  font-size: 20px;
}

.money span {
  margin: 0 25px;
}

.block {
  margin: 0 40px;
  margin-top: 10px;
}
.menuList li{
  box-sizing: border-box;
  line-height: 85px;
  height: 85px;
  list-style: none;
  font-size: 20px;
  letter-spacing: 0.1em;
  display: inline-block;
  padding: 0 60px;
 text-decoration: none;
}

.menuList li:hover{
  border-bottom: 4px solid #409EFF;
  color: #409EFF;
}

.active{
   border-bottom: 4px solid #409EFF;
   color: #409EFF;
}

</style>
