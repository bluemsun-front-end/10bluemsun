<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="搜索商品"
      class="search-input"
      @keydown.enter="onSearch"
    />
    <button @click="onSearch" class="search-button">搜索</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    onSearch() {
      if (this.searchTerm.trim()) {
        // 处理搜索逻辑
        console.log('Searching for:', this.searchTerm);
        // 在这里添加搜索功能
      }
    },
  },
};
</script>
<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh; 
  padding-bottom: 13px;
  padding-top: 27px;
}

.search-input {
  outline:none;
  width: 50vw;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.search-button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 700;
  background-color: #409EFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: rgb(51.2, 126.4, 204); 
}
</style>