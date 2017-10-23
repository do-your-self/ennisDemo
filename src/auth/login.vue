<template>
    <div style="height:100%;background:#2c3e50;">
        <el-row>
            <el-col :span="8" :offset="8" class="bg">
            <!-- el-tabs放在这里其实不合理，可以提到App.vue里面。然后引入Login组件和Register组件 -->
                <el-tabs v-model="activeName" class="tab">
                    <el-tab-pane label="登录" name="login">
                        <el-col :span="20" :offset="1">
                            <el-form :model="loginForm" :rules="rules" label-width="80px" ref="loginForm" style="margin-top:20px;">
                                <el-form-item label="用户名" prop="username">
                                    <el-input v-model="loginForm.username"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="password">
                                    <el-input v-model="loginForm.password" type="password"></el-input>
                                </el-form-item>
                                <el-form-item style="text-align:left;">
                                    <el-checkbox label="记住密码" v-model="rempsw"></el-checkbox>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('loginForm')" style="width:45%;">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="register">
                        <Register></Register>
                    </el-tab-pane>

                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '../axios.js'
//引入验证组件
import Register from './register.vue'


export default {
    data(){
        let user = window.localStorage.getItem('fofuser');  //从缓存获取用户名密码
        let psw = window.localStorage.getItem('fofpsw');
        let check = user?true:false;    //判断记住密码状态
        return {
            rempsw: check,
            activeName: 'login', //选项卡
            loginForm: {        //表单v-model的值
                username: user||'',
                password: psw||''
            },
            rules: { //验证规则
                username: [
                    { required: true, message: '用户名不能少', trigger: 'blur'},
                    { min: 4, max: 16, message: '用户名在4到16位之间', trigger: 'blur,change'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'},
                    { min: 4, max: 16, message: '密码在4到16位之间', trigger: 'blur,change'}
                ]
            }
        }
    },
    methods: {
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){ //验证通过
                    let opt = this.loginForm;
                    api.userLogin(opt)
                        .then(({ data }) => {
                      //解构赋值拿到data
                            //账号不存在
                            if(data.success === false){
                                this.$message({
                                    type: 'info',
                                    message: '用户名或密码错误'
                                });
                                return ;
                            }
                            //账号存在
                            if(data.success){
                                this.$message({
                                    type: 'success',
                                    message: '登录成功'
                                });
                                let token = data.token;
                                let company = data.company;
                                let admin = data.admin;
                                if(this.rempsw){    //缓存用户名密码
                                    window.localStorage.setItem('fofuser', this.loginForm.username);
                                    window.localStorage.setItem('fofpsw', this.loginForm.password);
                                }
                                this.$store.dispatch('UserLogin', token);    //vuex 
                                this.$store.dispatch('Company', company);
                                this.$store.dispatch('User', data.name);
                                this.$store.dispatch('Id', 'null');
                                window.localStorage.setItem('user', data.name);
                                window.localStorage.setItem('company', company);
                                if(data.admin){
                                    this.$store.dispatch('Admin', 'true');
                                }else{
                                    this.$store.dispatch('Admin', 'false');
                                }
                                //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
                                if(admin){
                                    //跳转到指定的路由
                                    this.$router.push({
                                         path:'/home/admin/user'
                                    });
                                }else{
                                    //跳转到指定的路由
                                    this.$router.push({
                                         path:'/home/company'
                                    });
                                }
                            }else{
                                this.$message({
                                    type: 'info',
                                    message: '用户名或密码错误'
                                });
                            }
                        });
                }else{
                    //验证不通过
                    return false;
                }
            });
        }
    },
    components: {
        Register
    }
}
</script>

<style>
    .bg {
        background: #fff;
        padding: 20px 50px;
        border-radius: 5px;
        position: relative;
        top: 200px;
        min-height: 400px;
    }
    .tab {
        width: 100%;
    }
    .el-tabs__nav {
        width: 100%;
    }
    .tab .el-tabs__item {
        width: 50%;
        font-size: 18px!important;
        font-weight: 800;
        text-align:center;
    }
</style>
