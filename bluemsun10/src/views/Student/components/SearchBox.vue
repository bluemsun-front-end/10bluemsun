<template>
  <div class="search-box">
    <el-input v-model="searchData.grade" class="search-input" placeholder="年级" clearable />
    <el-input v-model="searchData.name" class="search-input" placeholder="名字" clearable />
    <el-input v-model="searchData.studentId" class="search-input" placeholder="学号" clearable />
    <el-input v-model="searchData.major" class="search-input" placeholder="专业" clearable />
    <el-input v-model="searchData.degree" class="search-input" placeholder="学位" clearable />
    <el-button @click="reset" type="primary">重置</el-button>
    <el-button @click="onSearch" type="primary" style="margin-left: 0px;">搜索</el-button>
    <div class="box-right">
      <el-button @click="exportInfo" type="primary" class="export-button">导出信息</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
const authToken = localStorage.getItem('token');
const token = `Bearer ${authToken}`;
const emit = defineEmits(['search']);
const searchData = reactive({
  grade: '',
  name: '',
  studentId: '',
  major: '',
  degree: '',
});

const reset = () => {
  searchData.grade = '';
  searchData.name = '';
  searchData.studentId = '';
  searchData.major = '';
  searchData.degree = '';
};
const onSearch = () => {
  //请求在这里
  emit('search', searchData);
};
const exportInfo = async () => {
  try {
    const config = {
      headers: {
        'Authorization': 'Bearer '+token,
      }
    };
    const params = {
      userId:28,
    };
    await axios.get('http://mxt.nat300.top/grow/userInfo/export', { params, ...config });
  } catch (error) {
    console.error('Error during export:', error);
  }
};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
}

.search-input {
  width: 150px;
}

.box-right {
  margin-left: auto;
}
</style>
