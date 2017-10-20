<template>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-col :span="15" :offset="4">
            <el-form-item label="策略类型" prop="stg_type">
                <el-input v-model="form.stg_type"></el-input>
            </el-form-item>
            <el-form-item label="产品数量" prop="product_count">
                <el-input type="number" v-model.number="form.product_count"></el-input>
            </el-form-item>
            <el-form-item label="规模" prop="scale">
                <el-input type="number" v-model.number="form.scale"></el-input>
            </el-form-item>
            <el-form-item label="规模上限" prop="scale_ceiling">
                <el-input type="number" v-model.number="form.scale_ceiling"></el-input>
            </el-form-item>
        </el-col>
        <el-col style="padding:20px 0 50px;">
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
        </el-col>
    </el-form>             
</template>

<script>
    import api from '../axios.js'
    export default {
        props: ['listId'],
        data() {
            return {
                form: {
                  "stg_type": "",
                  "product_count": "",
                  "scale": "",
                  "scale_ceiling": ""
                },
                rules: { //验证规则
                    stg_type: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    product_count: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    scale: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    scale_ceiling: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ]
                },
                id: null
            }
        },
        created(){
            api.getStgId(this.listId).then((response) => {
                this.getData(response);
            });
        },
        watch: {
            'listId': function(){
                if(this.listId){
                    api.getStgId(this.listId).then((response) => {
                        this.getData(response);
                    });
                }
            }
        },
        methods: {
            dateChange(val){
                this.form.birthday = val;
            },
            getData(response){      //拿到返回的数据
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        this.form = response.data;
                    }
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let opt = {};
                        opt.stg_type = this.form.stg_type;
                        opt.product_count = Number(this.form.product_count);
                        opt.scale = Number(this.form.scale);
                        opt.scale_ceiling = Number(this.form.scale_ceiling);
                        let id = this.form.id;
                        api.setStg(id,opt)
                        .then(response => {
                            //移除节点
                            this.$emit("close","success","修改成功");
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请按提示输入合法的值'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit("close");
            }
        }
    }
</script>

<style scoped>

</style>




