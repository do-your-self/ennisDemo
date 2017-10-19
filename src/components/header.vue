<template>
    <div>
        <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="$store.state.admin=='true'">
            <router-link to="/home/admin/allCompany">
            <div class="logo" @click="clearId()">后台管理系统</div>
            </router-link>
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
            <div @click="clearId()" class="company">{{$store.state.company}}</div>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{$store.state.user.length > 10? $store.state.user.substr(0,10)+'...':$store.state.user}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-top: 30px;font-size:14px;">
                        <el-dropdown-item>{{$store.state.user.length > 10? $store.state.user.substr(0,10)+'...':$store.state.user}}</el-dropdown-item>
                        <el-dropdown-item command="invitation">邀请用户</el-dropdown-item>
                        <el-dropdown-item divided command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>
        <el-menu theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="$store.state.admin=='false'">
            <div class="logo">后台管理系统</div>
            <div @click="clearId()" class="company">{{$store.state.company}}</div>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    {{$store.state.user.length > 10? $store.state.user.substr(0,10)+'...':$store.state.user}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="margin-top: 30px;font-size:14px;">
                        <el-dropdown-item>{{$store.state.user.length > 10? $store.state.user.substr(0,10)+'...':$store.state.user}}</el-dropdown-item>
                        <el-dropdown-item divided command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>
    </div>
</template>

<script>
    import api from '../axios.js'
    export default {
        methods: {
            handleCommand(command) {            // which dropdown click
                if(command == 'logout'){
                    this.logout();
                }else if(command == 'invitation'){
                    this.$router.push('/home/admin/invitation');
                }
            },
            handleSelect(key, keyPath) {
            },
            clearId() {
              this.$store.dispatch('Id', "null");
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
    .company {
        float: right;
        height: 60px;
        line-height: 60px;
        margin: 0;
        cursor: pointer;
        position: relative;
        box-sizing: border-box;
        margin-right: 150px;
        color: #dcdcdc;
        font-size: 14px;
    }
    .company:hover,.el-dropdown span:hover {
        color: #fff;
    }
    .el-dropdown {
        position: absolute!important;
        right: 20px;
        top: 20px;
        color: #dcdcdc!important; 
        cursor: pointer;  
    }
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


