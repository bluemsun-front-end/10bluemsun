import {createRouter,createWebHistory} from 'vue-router'
//引入可能呈现的组件
import GoodsDetails from '@/views/index/GoodsDetails.vue'
import ShopCart from '@/views/ShopCart/index.vue'
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
            path:'/cart',
            component:ShopCart
        },

        
        {
            name: 'OrderList',
            path: '/orderList',
            component: () => import('@/views/OrderList/OrderListIndex.vue')
        } 
        //可老师专属路由,都不能动,可老师说谁动了谁的问题
   ]
})
   


//


//暴露出去router
export default router

