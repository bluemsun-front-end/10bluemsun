import { createRouter, createWebHistory } from 'vue-router'
//引入可能呈现的组件
import GoodsDetails from '@/views/index/GoodsDetails.vue'
import Home from '@/views/index/index.vue'; // 首页组件
// import Login from '@/views/index/login.vue';
import ShopCart from '@/views/ShopCart/index.vue';
import login2 from '@/views-file/login2.vue';
import StudentsFile from '@/views-file/StudentsFile.vue';

import Login from '@/components/Login/index.vue';
import Manage from '@/views/Manage/index.vue';
import Order from '@/views/Order/index.vue';
import Record from '@/views/Record/index.vue'
import index from '@/views-file/Login/index.vue';
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
        // {//登录
        //     path: '/',
        //     name: 'login',
        //     component: Login
        // },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: () => import('@/views/ShopCart/index.vue')
        },
        {//首页
            path: '/home',
            name: 'home',
            component: Home
        },
        
        //个人成长档案
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            name:'growthFile',
            path:'/growthfile',
            component:StudentsFile
        },
       
        {
            path: '/studentFiles',
            name: 'studentFiles',
            component: import('@/views/Student/index.vue')
        },
        //
        {
            path: '/manage',
            name: 'manage',
            component: Manage,
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/record',
            name: 'record',
            component: Record
        }

    ]
})



router.beforeEach((to, from, next) => {
    // 每次路由切换时执行的函数
    console.log("每次路由切换时执行的函数");

    // 继续导航
    next();
});




//暴露出去router
export default router

