<template>
    <el-col :span="20" :offset="1">
        <el-form :model="regForm" :rules="rules" label-width="80px" ref="regForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="regForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="regForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input v-model="regForm.checkPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="regForm.email" type="email"></el-input>
            </el-form-item>
            <el-form-item label="公司" prop="company_name">
                <el-input v-model="regForm.company_name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="邀请码" prop="code">
                <el-input v-model="regForm.code" type="text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('regForm')" style="width:45%;">注册</el-button>
                <el-button @click="resetForm('regForm')" style="width:45%;">重置</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
import api from '../axios.js'

export default {
    data(){
        //自定义验证规则
        let validatePass1 = (rule, value, callback) => {
            // 6-16位, 数字, 字母, 字符至少包含两种, 同时不能包含中文和空格
            let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{2,16}$/;
            if(!reg.test(value)){
                callback(new Error('密码长度需6-16位，且包含字母和数字'));
            }else{
                callback();
            }
            // if (value === '') {
            //   callback(new Error('请输入密码'));
            // } else {
            //   if (this.regForm.checkPassword !== '') {
            //     this.$refs.regForm.validateField('checkPassword');
            //   }
            //   callback();
            // }
        };
        //验证密码是否重复
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.regForm.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
        };

        return {
            regForm: {
                username: '',
                password: '',
                checkPassword: '',
                email:'',
                company_name:'',
                code:''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能少', trigger: 'blur'},
                    { min: 4, max: 16, message: '用户名在4到16位之间', trigger: 'blur,change'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur,change'},
                    { validator: validatePass1, trigger: 'blur,change'}
                ],
                checkPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur,change'},
                    { validator: validatePass2, trigger: 'blur,change'}
                ],
                email: [
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ],
                company_name:  [
                    { min: 2, max: 16, message: '长度在2到16位之间', trigger: 'blur,change'}
                ],
                code:  [
                    { required: true, message: '请输入邀请码', trigger: 'blur' }
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
                    api.userRegister(this.regForm)
                    .then( (data) => {
                        switch(data.status){
                            case 200:  
                                this.$message({
                                    type: 'success',
                                    message: '注册成功'
                                });
                                setTimeout(function(){
                                    window.location.reload();
                                },2000)
                                // this.$router.push({
                                //      path:'/home/login'
                                // });
                                break;
                            case 433: 
                                this.$message({  //code过期 Invalid validation code
                                    type: 'info',
                                    message: "邀请码不存在",
                                    customClass: "height"
                                });
                                break; 
                            case 434:  
                                this.$message({   // User name already exists
                                    type: 'info',
                                    message: "用户名已存在"
                                }); 
                                break;
                            case 435:  
                                this.$message({   //Company name already exists
                                    type: 'info',
                                    message: "投资公司已存在"
                                });
                                break;
                            case 436: 
                                this.$message({   //Email already exists
                                    type: 'info',
                                    message: "邮箱已存在"
                                }); 
                                break;
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }else{ //验证不通过
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
