<template>
    <div class="flex flex-wrap items-center">
      <el-dropdown>
        <el-button type="primary" size="large">
          商品排序<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>综合排序</el-dropdown-item>
            <el-dropdown-item>价格升序排列</el-dropdown-item>
            <el-dropdown-item>价格降序排序</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ArrowDown } from '@element-plus/icons-vue'
  </script>
  <style scoped>
  .example-showcase .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
  </style>
  