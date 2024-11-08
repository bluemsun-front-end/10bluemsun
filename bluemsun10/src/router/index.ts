import {createRouter,createWebHistory} from 'vue-router'
//引入可能呈现的组件
import GoodsDetails from '@/views/index/GoodsDetails.vue'
import Home from '@/views/index/index.vue'; // 首页组件
import Login from '@/views/index/login.vue';

//创建路由器
const router=createRouter({
    history:createWebHistory(),   
    routes:[  
        {
            name:'details',
            path:'/details',
            component:GoodsDetails
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
        {//登录
            path: '/',
            name: 'login',
            component: Login
        },
        {
            name:'shopcart',
            path:'/shopcart',
            component:() => import('@/views/ShopCart/index.vue')
        },
        {//首页
            path: '/home',
            name: 'home',
            component: Home
        },
   ]
})

//暴露出去router
export default router

