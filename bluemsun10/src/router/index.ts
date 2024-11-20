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
import   { isLoggedIn }   from  '@/utils/auth' 
import { ElMessage }  from  'element-plus'  

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'details',
            path: '/details',
            component: GoodsDetails,
            meta: { requiresAuth: true },
        }, 

        {
            path: '/cart',
            component: ShopCart,
            meta: { requiresAuth: true },
        },


        {
            name: 'OrderList',
            path: '/orderList',
            component: () => import('@/views/OrderList/OrderListIndex.vue'),
            meta: { requiresAuth: true },
        }, 

        {//首页
            path: '/home',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true },
        },

        {//登录
            path: '/',
            name: 'login',
            component: Login
        },

        {
            path: '/manage',
            name: 'manage',
            component: Manage,
            meta: { requiresAuth: true ,role:'超市管理员'},
        }, 

        {
            path: '/order',
            name: 'order',
            component: Order,
            meta: { requiresAuth: true,role:'超市管理员' },
        }, 

        {
            path: '/record',
            name: 'record',
            component: Record,
            meta: { requiresAuth: true ,role:'超市管理员'},
        }

    ]
})



router.beforeEach((to, from, next) => {  

    const role = localStorage.getItem('role');

    if (to.meta.requiresAuth && !isLoggedIn()) {
      // 如果目标路由需要登录且用户未登录 
      ElMessage.error('请先登录'); // 显示提示消息
      next({ name: 'Login' }); // 跳转到登录页面 
           

    }  
    
    else if (to.meta.role && to.meta.role !== role) {
        // 用户角色不符合要求，禁止访问 
        ElMessage.error('无访问权限')
        next({ name: 'home' }); // 或者跳转到 403 页面
      }

    else {
      next(); // 否则正常跳转
    }
  });
  



//暴露出去router
export default router

