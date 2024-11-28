import { createRouter, createWebHistory } from 'vue-router'
//引入可能呈现的组件
import GoodsDetails from '@/views/index/GoodsDetails.vue'
import Home from '@/views/index/index.vue'; // 首页组件
import ShopCart from '@/views/ShopCart/index.vue';
import Login from '@/components/Login/index.vue';
import Manage from '@/views/Manage/index.vue';
import Order from '@/views/Order/index.vue';
import Record from '@/views/Record/index.vue'
import index from '@/views-file/Login/index.vue';
import isLogin from '@/api/isLogin';
import { ElMessage } from 'element-plus'; 
function sleep(ms: number | undefined) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'details',
            path: '/details',
            component: GoodsDetails
        },
        {
            path: '/cart',
            component: ShopCart
        },


        {
            name: 'OrderList',
            path: '/orderList',
            component: () => import('@/views/OrderList/OrderListIndex.vue')
        },
        {//首页
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: () => import('@/views/ShopCart/index.vue')
        },
        {
            path: '/manage',
            name: 'manage',
            component: Manage,
            meta: { role: ['超市管理员', '超级管理员'] }
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            meta: { role: ['超市管理员', '超级管理员'] }
        },
        {
            path: '/record',
            name: 'record',
            component: Record,
            meta: { role: ['超市管理员', '超级管理员'] }
        }

    ]
})



router.beforeEach(async (to, from, next) => {
    try {
      // 获取 URL 参数
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const role = urlParams.get('role');
  
      // 存储 token 和 role
      if (token) localStorage.setItem('token', token);
      if (role) localStorage.setItem('role', role);
    
  
      // 检查登录状态
      const isLoggedIn = await isLogin();
      if (!isLoggedIn && to.path !== '/') {
        const redirectUrl = `${window.location.origin}${to.fullPath}`;
        return (window.location.href = `http://localhost:5173/?redirect=${redirectUrl}&role=${role}`);
      }
  
      // 验证权限
      const storedRole = localStorage.getItem('role') || '';
      const requiredRoles = to.meta?.role as string[] | undefined; // 类型断言
      if (requiredRoles && !requiredRoles.includes(storedRole)) {
        ElMessage.error('无访问权限');
        return router.push('/home');
      }
  
      next();
    } catch (error) {
    
      next('/'); // 默认跳转到登录页
    }
  });
  
  router.afterEach((to, from) => {
    const query = { ...to.query };
    if ('token' in query) delete query.token;
    if ('role' in query) delete query.role;
  
    if (JSON.stringify(query) !== JSON.stringify(to.query)) {
      const newPath = to.path.replace(/\/+/g, '/');
      router.replace({ path: newPath, query });
    }
  });




//暴露出去router
export default router

