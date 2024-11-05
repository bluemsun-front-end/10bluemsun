<template>
  <el-header height="85px">
    <div class="header-content">
      <div class="top_hello">
        <span style="margin-left: 40px;">爱心超市</span>
        <span class="campus">净月校区</span>
      </div>
      <div class="header_menu">
        <span class="cloud"></span>
        <ul class="menuList">
          <li ref="item1" class="active">首页</li>
          <li ref="item2">购物车</li>
          <li ref="item3">订单</li>
        </ul>
      </div>
      <div class="money">
        <span>日用币：0</span>
        <span>服饰币：0</span>
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
import { ref, reactive, toRefs } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})

const { circleUrl, squareUrl, sizeList } = toRefs(state)
</script>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 85px; 
  margin: 0 40px;
  border-bottom: 1px solid rgb(243.9, 244.2, 244.8);
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
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
  display: inline-block;
  padding: 0 50px;
 text-decoration: none;
}

.menuList li:hover{
  border-bottom: 4px solid #409EFF;
}

.active{
   border-bottom: 4px solid #409EFF;
   color: #409EFF;
}

</style>
