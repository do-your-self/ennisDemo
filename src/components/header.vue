<template>
    <div>
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="$store.state.admin=='true'">
            <div class="logo">后台管理系统</div>
            <router-link to="/home/admin/allCompany">
                <el-menu-item index="1" @click="clearId()">公司</el-menu-item>
            </router-link>
            <router-link to="/home/admin/user">
                <el-menu-item index="2" @click="clearId()">用户管理</el-menu-item>
            </router-link>
            <router-link to="/home/admin/staff">
                <el-menu-item index="3" @click="clearId()">职工管理</el-menu-item>
            </router-link>
            <router-link to="/home/admin/stg">
                <el-menu-item index="4" @click="clearId()">策略管理</el-menu-item>
            </router-link>
            <router-link to="/home/admin/product">
                <el-menu-item index="5" @click="clearId()">产品管理</el-menu-item>
            </router-link>
            <router-link to="/home/admin/prodStg">
                <el-menu-item index="6" @click="clearId()">产品策略管理</el-menu-item>
            </router-link>
            <el-menu-item index="7" style="float:right;">
                <a @click="logout()">登出</a>
            </el-menu-item>
            <router-link to="/home/admin/invitation">
                <el-menu-item index="8" @click="clearId()" style="float:right;">邀请用户</el-menu-item>
            </router-link>
        </el-menu>
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="$store.state.admin=='false'">
            <div class="logo">后台管理系统</div>
            <el-menu-item index="1" style="float:right;">
                <a @click="logout()">登出</a>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import api from '../axios.js'
    export default {
        data() {
            return {
                activeIndex: '1'
            }
        },
        beforeCreate(){
        },
        methods: {
            handleSelect(key, keyPath) {
            },
            clearId() {
              this.$store.dispatch('Id', null);
            },
            logout() {
                //清除token
                this.$store.dispatch('UserLogout');
                if (!this.$store.state.token) {
                    this.$router.push('/login')
                    this.$message({
                        type: 'success',
                        message: '登出成功'
                    })
                } else {
                    this.$message({
                        type: 'info',
                        message: '登出失败'
                    })
                }
            }
        }
    }
</script>


<style>
    .logo{
        float: left;
        width:250px;
        text-align: center;
        height: 60px;
        color: #fff;
        line-height: 60px;
        font-size: 18px;
    }
    .el-menu-demo{
        width: 100%;
        position: absolute;
        z-index: 999;
    }
    .el-menu--horizontal.el-menu--dark .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu__title:hover {
        border-bottom: 5px solid #20a0ff;
    }

</style>


