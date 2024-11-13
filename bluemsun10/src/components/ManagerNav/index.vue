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
            :class="{active: isActive === index}"
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
import { ref, reactive, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();  // 用来获取当前路由信息

const menuItems = [
  { label: '管理货物' },
  { label: '进货记录' },
  { label: '订单管理' },
];

const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
});

const { circleUrl, squareUrl, sizeList } = toRefs(state);

// 当前选中的菜单项索引
const isActive = ref(0);

// 根据当前路由更新 active 样式
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/manage') isActive.value = 0;
    if (newPath === '/record') isActive.value = 1;
    if (newPath === '/order') isActive.value = 2;
  },
  { immediate: true }  // 初始加载时也要更新一次
);

const handleClick = (index: number) => {
  isActive.value = index;
  if (index === 0) {
    router.push('/manage');
  }
  if (index === 1) {
    router.push('/record');
  }
  if (index === 2) {
    router.push('/order');
  }
};
</script>

<style scoped>
li {
  cursor: pointer;
}
.header-content {
  display: flex;
  width: 1300px;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  border-bottom: 1px solid rgb(243.9, 244.2, 244.8);
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
.name {
  color: rgb(51.2, 126.4, 204);
  font-weight: 700;
  font-size: 40px;
}
.top_hello,
.money {
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
.menuList li {
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

.menuList li:hover {
  border-bottom: 4px solid #409EFF;
  color: #409EFF;
}

.active {
  border-bottom: 4px solid #409EFF;
  color: #409EFF;
}
</style>
