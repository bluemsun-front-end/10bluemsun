<!-- <template>
  <el-header height="85px">
    <div class="header-content">
      <div class="top_hello">
        <span style="margin-left: 40px;">爱心超市</span>
        <span class="campus">{{ campusName }}</span>
      </div>
      <div class="header_menu">
        <span class="cloud"></span>
        <ul class="menuList">
          <li :class="{ active: activeIndex === 0 }" @click="navigateToIndex(0)" class="">首页</li>
          <li :class="{ active: activeIndex === 1 }" @click="navigateToIndex(1)">购物车</li>
          <li :class="{ active: activeIndex === 2 }" @click="navigateToIndex(2)">订单</li>
        </ul>
      </div>
      <div class="money">
        <span>日用币：{{ generalBalance }}</span>
        <span>服饰币：{{ clothingBalance }}</span>
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
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useNavBarData } from '@/api/useNavBarData'; 

const router = useRouter();
const authToken = localStorage.getItem('token');
const token = `${authToken}`;

// 使用自定义 Hook 获取数据
const { generalBalance, clothingBalance, campusName } = useNavBarData(token);

const activeIndex = ref(0); // 初始化第一个菜单项为激活状态

//跳转前检查是否登录
const navigateToIndex = (index: number) => {
  if (!token) {
    router.push('/login');
    return;
  }
  activeIndex.value = index; // 更新当前激活的菜单项索引
  router.push(`/${['home', 'shopcart', 'orderList'][index]}`); // 根据索引导航到相应的页面
};

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
});
const { circleUrl, squareUrl, sizeList } = toRefs(state);
</script>

<style scoped>
/* 修改样式 */
.header-content {
  width: 92vw;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 85px; 
  margin-left: 2vw;
  margin-right: 2vw;
  border-bottom: 1px solid rgb(243.9, 244.2, 244.8);
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.top_hello, .money {
  font-size: 18px;
}

.top_hello span {
  font-size: 30px;
  margin-right: 1.5vw;
  letter-spacing: 0.1em;
}

.top_hello .campus {
  margin-right: 1vw;
  font-size: 20px;
}

.money span {
  margin: 0 1vw;
}

.block {
  margin: 0 1vw;
  margin-top: 10px;
}

.menuList li {
  box-sizing: border-box;
  line-height: 85px;
  height: 85px;
  list-style: none;
  font-size: 20px;
  display: inline-block;
  padding: 0 3vw;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, border-bottom-color 0.3s;
}

.menuList li.active {
  /* background-color: #409EFF; */
  color: black;
  border-bottom: 4px solid #409EFF; /* 确保这个样式在激活时生效 */
}

.menuList li:hover:not(.active) {
  border-bottom: 4px solid #409EFF;
}
</style> -->
<template>
  <el-header height="85px">
    <div class="header-content">
      <div class="top_hello">
        <span style="margin-left: 40px;">爱心超市</span>
        <span class="campus">{{ campusName }}</span>
      </div>
      <div class="header_menu">
        <span class="cloud"></span>
        <ul class="menuList">
          <li :class="{ active: activeIndex === 0 }" @click="navigateToIndex(0)" class="">首页</li>
          <li :class="{ active: activeIndex === 1 }" @click="navigateToIndex(1)">购物车</li>
          <li :class="{ active: activeIndex === 2 }" @click="navigateToIndex(2)">订单</li>
        </ul>
      </div>
      <div class="money">
        <span>日用币：{{ generalBalance }}</span>
        <span>服饰币：{{ clothingBalance }}</span>
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
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useNavBarData } from '@/stores/useNavBarData';

const router = useRouter();
const authToken = localStorage.getItem('token');
const token = `${authToken}`;

// 使用自定义 Hook 获取数据
const { generalBalance, clothingBalance, campusName } = useNavBarData(token);

const activeIndex = ref(0); // 初始化第一个菜单项为激活状态

const navigateToIndex = (index: number) => {
  activeIndex.value = index; // 更新当前激活的菜单项索引
  router.push(`/${['home', 'shopcart', 'orderList'][index]}`); // 根据索引导航到相应的页面
};

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
});
const { circleUrl, squareUrl, sizeList } = toRefs(state);
</script>

<style scoped>
/* 修改样式 */
.header-content {
  width: 92vw;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 85px; 
  margin-left: 2vw;
  margin-right: 2vw;
  border-bottom: 1px solid rgb(243.9, 244.2, 244.8);
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.top_hello, .money {
  font-size: 18px;
}

.top_hello span {
  font-size: 30px;
  margin-right: 1.5vw;
  letter-spacing: 0.1em;
}

.top_hello .campus {
  margin-right: 1vw;
  font-size: 20px;
}

.money span {
  margin: 0 1vw;
}

.block {
  margin: 0 1vw;
  margin-top: 10px;
}

.menuList li {
  box-sizing: border-box;
  line-height: 85px;
  height: 85px;
  list-style: none;
  font-size: 20px;
  display: inline-block;
  padding: 0 3vw;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, border-bottom-color 0.3s;
}

.menuList li.active {
  /* background-color: #409EFF; */
  color: black;
  border-bottom: 4px solid #409EFF; /* 确保这个样式在激活时生效 */
}

.menuList li:hover:not(.active) {
  border-bottom: 4px solid #409EFF;
}
</style>
