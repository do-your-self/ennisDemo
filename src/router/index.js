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
const Login = resolve => {
  require.ensure(['../auth/login.vue'], () => {
    resolve(require('../auth/login.vue'));
  });
};

const Register = resolve => {
  require.ensure(['../auth/register.vue'], () => {
    resolve(require('../auth/register.vue'));
  });
};

const Home = resolve => {
  require.ensure(['../pages/home.vue'], () => {
    resolve(require('../pages/home.vue'));
  });
};

const Menu = resolve => {
  require.ensure(['../components/menu.vue'], () => {
    resolve(require('../components/menu.vue'));
  });
};

const User = resolve => {
  require.ensure(['../components/user.vue'], () => {
    resolve(require('../components/user.vue'));
  });
};

const Invitation = resolve => {
  require.ensure(['../auth/invitation.vue'], () => {
    resolve(require('../auth/invitation.vue'));
  });
};

const Staff = resolve => {
  require.ensure(['../components/staff.vue'], () => {
    resolve(require('../components/staff.vue'));
  });
};

const Company = resolve => {
  require.ensure(['../components/company.vue'], () => {
    resolve(require('../components/company.vue'));
  });
};

const allCompany = resolve => {
  require.ensure(['../components/allCompany.vue'], () => {
    resolve(require('../components/allCompany.vue'));
  });
};

const editStaff = resolve => {
  require.ensure(['../components/editStaff.vue'], () => {
    resolve(require('../components/editStaff.vue'));
  });
};

const addStaff = resolve => {
  require.ensure(['../components/addStaff.vue'], () => {
    resolve(require('../components/addStaff.vue'));
  });
};

const editCompany = resolve => {
  require.ensure(['../components/editCompany.vue'], () => {
    resolve(require('../components/editCompany.vue'));
  });
};

const Stg = resolve => {
  require.ensure(['../components/stg.vue'], () => {
    resolve(require('../components/stg.vue'));
  });
}

const editStg = resolve => {
  require.ensure(['../components/editStg.vue'], () => {
    resolve(require('../components/editStg.vue'));
  });
};

const addStg = resolve => {
  require.ensure(['../components/addStg.vue'], () => {
    resolve(require('../components/addStg.vue'));
  });
};

const Product = resolve => {
  require.ensure(['../components/product.vue'], () => {
    resolve(require('../components/product.vue'));
  });
}

const editProduct = resolve => {
  require.ensure(['../components/editProduct.vue'], () => {
    resolve(require('../components/editProduct.vue'));
  });
};

const addProduct = resolve => {
  require.ensure(['../components/addProduct.vue'], () => {
    resolve(require('../components/addProduct.vue'));
  });
};

const prodStg = resolve => {
  require.ensure(['../components/prodStg.vue'], () => {
    resolve(require('../components/prodStg.vue'));
  });
}

const editProdStg = resolve => {
  require.ensure(['../components/editProdStg.vue'], () => {
    resolve(require('../components/editProdStg.vue'));
  });
};

const addProdStg = resolve => {
  require.ensure(['../components/addProdStg.vue'], () => {
    resolve(require('../components/addProdStg.vue'));
  });
};

const Error404 = resolve => {
  require.ensure(['../components/404.vue'], () => {
      resolve(require('../components/404.vue'));
  }); 
};

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


