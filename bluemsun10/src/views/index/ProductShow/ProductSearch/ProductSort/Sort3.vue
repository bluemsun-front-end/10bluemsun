 <template>
    <div class="flex flex-wrap items-center">
      <el-dropdown >
        <el-button type="primary" size="large">
          货币分类<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>全部</el-dropdown-item>
            <el-dropdown-item>服装币</el-dropdown-item>
            <el-dropdown-item>日用币</el-dropdown-item>
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
  