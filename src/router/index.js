import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'

Vue.use(Router);

//路由懒加载
// const Login = resolve => {
//   require.ensure(['../components/Login.vue'], () => {
//     resolve(require('../components/Login.vue'));
//   });
// };

// const Register = resolve => {
//   require.ensure(['../components/Register.vue'], () => {
//     resolve(require('../components/Register.vue'));
//   });
// };
import Login from '../auth/login.vue'
import Register from '../auth/register.vue'
import Home from '../pages/home.vue'
import Menu from '../components/menu.vue'
import User from '../components/user.vue'
import Invitation from '../auth/invitation.vue'
import Staff from '../components/staff.vue'
import Company from '../components/company.vue'
import allCompany from '../components/allCompany.vue'
import editStaff from '../components/editStaff.vue'
import addStaff from '../components/addStaff.vue'
import editCompany from '../components/editCompany.vue'
import Stg from '../components/stg.vue'
import editStg from '../components/editStg.vue'
import addStg from '../components/addStg.vue'
import Product from '../components/product.vue'
import editProduct from '../components/editProduct.vue'
import addProduct from '../components/addProduct.vue'
import prodStg from '../components/prodStg.vue'
import editProdStg from '../components/editProdStg.vue'
import addProdStg from '../components/addProdStg.vue'
import Error404 from '../components/404.vue'

const router = new Router({
  // mode: 'history',
  // base: '/static/',
  routes: [
    /*{
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },*/
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/home/user',
          name: 'user',
          component: User
        },
        {
          path: '/home/staff',
          name: 'staff',
          component: Staff,
          children: [
            {
              path: '/home/staff/editStaff',
              name: 'editStaff',
              component: editStaff
            },
            {
              path: '/home/staff/addStaff',
              name: 'addStaff',
              component: addStaff
            }
          ] 
        },
        {
          path: '/home/company',
          name: 'company',
          component: Company,
          children: [
            {
              path: '/home/editCompany',
              name: 'editCompany',
              component: editCompany
            }
          ]
        },
        {
          path: '/home/stg',
          name: 'stg',
          component: Stg,
          children: [
            {
              path: '/home/stg/editStg',
              name: 'editStg',
              component: editStg
            },
            {
              path: '/home/stg/addStg',
              name: 'addStg',
              component: addStg
            }
          ]
        },
        {
          path: '/home/product',
          name: 'product',
          component: Product,
          children: [
            {
              path: '/home/product/editProduct',
              name: 'editProduct',
              component: editProduct
            },
            {
              path: '/home/product/addProduct',
              name: 'addProduct',
              component: addProduct
            }
          ]
        },
        {
          path: '/home/prodStg',
          name: 'prodStg',
          component: prodStg,
          children: [
            {
              path: '/home/prodStg/editProdStg',
              name: 'editProdStg',
              component: editProdStg
            },
            {
              path: '/home/prodStg/addProdStg',
              name: 'addProdStg',
              component: addProdStg
            }
          ]
        },
        {
          path: '/home/admin/allCompany',
          name: 'allCompany',
          component: allCompany
        },           
        {
          path: '/home/admin/invitation',
          name: 'invitation',
          component: Invitation
        },            
        {
          path: '/home/admin/staff',
          name: 'staff1',
          component: Staff
        },
        {
          path: '/home/admin/company',
          name: 'company1',
          component: Company
        },
        {
          path: '/home/admin/stg',
          name: 'stg1',
          component: Stg
        },
        {
          path: '/home/admin/product',
          name: 'product1',
          component: Product
        },
        {
          path: '/home/admin/prodStg',
          name: 'prodStg1',
          component: prodStg
        },
        {
          path: '/home/admin/user',
          name: 'user1',
          component: User
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register 
    },
    {
      path: '*',
      name: 'error',
      component: Login
      // component: Error404
      // redirect: '/login'
    }
  ]
});

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){

    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  }else{
    next();//如果无需token,那么随它去吧
  }
});

export default router;


