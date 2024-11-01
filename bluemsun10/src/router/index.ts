import {createRouter,createWebHistory} from 'vue-router'
//引入可能呈现的组件
import GoodsDetails from '@/views/index/GoodsDetails.vue'

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
        }
   ]
})

//暴露出去router
export default router

