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
import { ElMessage }  from  'element-plus'  

//创建路由器
const router = createRouter({  

    history: createWebHistory(),
    routes: [
        {
            name: 'details',
            path: '/details',
            component: GoodsDetails,
            // meta: { requiresAuth: true },
        }, 

        {
            path: '/cart',
            component: ShopCart,
            // meta: { requiresAuth: true },
        },


        {
            name: 'OrderList',
            path: '/orderList',
            component: () => import('@/views/OrderList/OrderListIndex.vue'),
            // meta: { requiresAuth: true },
        }, 

        {//首页
            path: '/home',
            name: 'home',
            component: Home,
            // meta: { requiresAuth: true },
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
            // meta: { requiresAuth: true ,role:'超市管理员'},
        }, 

        {
            path: '/order',
            name: 'order',
            component: Order,
            // meta: { requiresAuth: true,role:'超市管理员' },
        }, 

        {
            path: '/record',
            name: 'record',
            component: Record,
            // meta: { requiresAuth: true ,role:'超市管理员'},
        }

    ]
})

router.beforeEach(async (to, from, next) => {
    try {
        const isLoggedIn = await isLogin(); 
        // 等待 isLogin 返回结果
        if (!isLoggedIn && to.path !== '/') { // 未登录且目标路径不是登录页
           
            console.log('用户未登录，跳转到登录页面');
            next(`/?redirect=${encodeURIComponent(window.location.origin + to.fullPath)}`);
        } else {
            next(); // 已登录或在登录页，继续导航
        }
    } catch (error) {
        console.error('导航守卫检查登录状态出错:', error);
        next('/'); // 默认跳转到登录页
    }
});



//暴露出去router
export default router

