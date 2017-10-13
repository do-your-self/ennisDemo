<template>
    <el-col :span="10" :offset="7" style="margin-top:200px">
        <el-form :model="regForm" label-width="100px" ref="regForm">
            <el-form-item prop="email" label="邮箱" 
                :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ]">
                <el-input v-model="regForm.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('regForm')">发送</el-button>
                <el-button @click="resetForm('regForm')" >重置</el-button>
            </el-form-item>

        </el-form>
    </el-col>
</template>

<script>
import api from '../axios.js'

export default {
    data(){
        return {
            regForm: {
                "email":""
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
                    api.sendMail(this.regForm)
                    .then(({ data }) => {
                        if(data.Success){
                            this.$message({
                                type: 'success',
                                message: '已发送'
                            });

                        }else{
                            this.$message({
                                type: 'info',
                                message: data.statusText
                            });
                        }
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
