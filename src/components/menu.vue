<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" style="width: 100%;">
        <router-link to="/home/company">
            <el-menu-item index="1"><i class="el-icon-menu"></i>公司信息</el-menu-item>
        </router-link>
        <router-link to="/home/staff">
            <el-menu-item index="2"><i class="el-icon-information"></i>用户信息</el-menu-item>
        </router-link>
        <router-link to="/home/stg">
            <el-menu-item index="3"><i class="el-icon-document"></i>策略信息</el-menu-item>
        </router-link>
        <router-link to="/home/product">
            <el-menu-item index="4"><i class="el-icon-plus"></i>产品信息</el-menu-item>
        </router-link>
        <router-link to="/home/prodStg">
            <el-menu-item index="5"><i class="el-icon-date"></i>产品策略信息</el-menu-item>
        </router-link>
    </el-menu>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            }
        }
    }
</script>

<style>
    .el-menu-vertical-demo{
        width: 100%;
        height: 100%;
        text-align: left;
    }
    a{
        text-decoration: none;
    }
</style>


