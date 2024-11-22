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
          <li :class="{ active: activeIndex === 0 }" @click="navigateToIndex(0)">首页</li>
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
              <el-avatar :size="65" :src="avatarUrl" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNavBarData } from '@/stores/useNavBarData';

const router = useRouter();
const authToken = localStorage.getItem('token');
const token = `${authToken}`;
const activeIndex = ref(0);

// 使用自定义 Hook 获取数据
const { generalBalance, clothingBalance, campusName ,avatarUrl} = useNavBarData(token);

// 初始化第一个菜单项为激活状态
onMounted(() => {
  const pathToIndexMap: Record<string, number> = {
    '/home': 0,
    '/cart': 1,
    '/orderList': 2,
  };
  
  // 修复路径判断：使用 router.currentRoute.value.path
  const currentPath = router.currentRoute.value.path;
  activeIndex.value = pathToIndexMap[currentPath] ?? 0;
});

const navigateToIndex = (index: number) => {
  activeIndex.value = index; // 更新激活项
  // 根据索引跳转到相应的路由
  const path = ['home', 'cart', 'orderList'][index];
  router.push(`/${path}`);
};

</script>
<style scoped>
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

.menuList {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menuList li {
  cursor: pointer;
  height: 85px;
  line-height: 85px;
  font-size: 20px;
  display: inline-block;
  padding: 0 3vw;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s, border-bottom-color 0.3s;
  margin: 0 1vw;
}

.menuList li.active {
  color: black;
  border-bottom: 4px solid #409EFF; /* 激活项的样式 */
}

.menuList li:hover:not(.active) {
  border-bottom: 4px solid #409EFF; /* 鼠标悬停时的样式 */
}

.demo-avatar {
  margin-right: 20px;
}
</style>
