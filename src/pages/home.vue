<template>
    <el-row class="side">
        <v-header></v-header>
        <el-row v-if="$store.state.admin=='false'||$store.state.id!='null'" class="main">
            <el-col :span="3" style="height:100%;">
                <v-menu></v-menu>
            </el-col>
            <el-col :span="21" class="content">
                <router-view></router-view>
            </el-col>
        </el-row>
        <el-row v-if="$store.state.admin=='true'&&$store.state.id=='null'">
            <el-col :span="20" :offset="2">
                <router-view></router-view>
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
    import api from '../axios.js'
    import Header from '../components/header'
    import Menu from '../components/menu'
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        components: {
            'v-header': Header,
            'v-menu': Menu
        }
    }
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 600px;
    }
    .router-link-exact-active {
        color: #20a0ff!important; 
    }
    .router-link-active>li {
        color: #20a0ff!important; 
        border-bottom: 5px solid #20a0ff!important;
    }
    .el-menu--horizontal.el-menu--dark .el-menu-item:hover {
        background: #1f2938!important;
        color: #20a0ff;
    }
    .router-link-exact-active>li {
        color: #20a0ff!important;
    }
    .router-link-active {
        color: #20a0ff!important; 
    }
    .el-menu-item.is-active {
        color: #48576a;
    }
    .side {
        width: 100%;
        height: 100%;
    }
    .main {
        width: 100%;
        height: 100%;
        position: absolute!important;
        top: 0;
        padding-top: 60px;
    }
    .content{
        padding:40px;
    }
</style>



