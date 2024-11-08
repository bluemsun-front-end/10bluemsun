<template> 
    <div class="login-container">
        <el-card class="login-card">
          <h2 class="login-title">登录</h2>
    
          <el-form :model="form" ref="formRef"  label-width="120px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名" />
            </el-form-item>
    
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                autocomplete="off"
                placeholder="请输入密码"
              />
            </el-form-item>
    
            <el-form-item>
              <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
            </el-form-item>
    
            <el-form-item>
              <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>  
      
  <router-view>
   
  </router-view>
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import { ElForm, ElFormItem, ElInput, ElButton, ElCheckbox, ElMessage } from 'element-plus';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
  import { RouterView } from 'vue-router';
     
  
  
  //获取路由对象 
  
  const router = useRouter();  
  
    // 表单数据和状态
    const form = ref({
      tenantId: '000000',
      username: '',
      password: '',
      rememberMe: false,
      clientId: 'e5cd7e4891bf95d1d19206ce24a7b32e',
      grantType: 'password'
    });
    
    const loading = ref(false);
    
    
    // 登录处理函数
    const handleLogin = async () => {
      try {
    
      
        loading.value = true;
    
        // 创建请求体
        const data = JSON.stringify({
          "tenantId": form.value.tenantId,
          "username": form.value.username,
          "password": form.value.password,
          "rememberMe": form.value.rememberMe,
          "clientId": form.value.clientId,
          "grantType": form.value.grantType
        });
    
        // 请求配置
        const loginConfig = {
          method: 'post',
          url: 'http://106.54.24.243:8080/auth/login',
          headers: { 
            'Content-Type': 'application/json', 
          },
          data: data
        };
    
        // 发起登录请求
        const response = await axios(loginConfig);
        console.log('response', response);
    
        if (response.data.code=='200' ) {     
          ElMessage.success('登录成功');  
       //路由跳转到首页
          localStorage.setItem('token', response.data.data.access_token);  
        console.log('成功跳转')   
        router.push('/test').then(() => {
          window.location.reload();  // 强制刷新页面，重新加载所有内容
  });
  
         
        } else {
          ElMessage.error('用户名或密码错误');
        }
      } catch (error) {
        loading.value = false;
        ElMessage.error('登录失败，请稍后重试');
      } finally {
        loading.value = false;
      }
    };
    </script>
    
    <style scoped>
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f2f5;
    }
    
    .login-card {
      width: 400px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .login-title {
      text-align: center;
      margin-bottom: 20px;
      font-size: 24px;
      color: #333;
    }
    </style>
    