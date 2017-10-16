<template>                
    <el-form ref="form" :model="form" label-width="100px" :fules="rules">
        <el-col :span="18" offset="3">
            <el-form-item label="策略类型" prop="stg_type">
                <el-input v-model="form.stg_type"></el-input>
            </el-form-item>
            <el-form-item label="产品数量" prop="year_start_backtesting">
                <el-input v-model="form.year_start_backtesting"></el-input>
            </el-form-item>
            <el-form-item label="规模" prop="year_end_backtesting">
                <el-input v-model="form.year_end_backtesting"></el-input>
            </el-form-item>
            <el-form-item label="策略占比区间开始" prop="stg_proportion_from">
                <el-input type="number" v-model="form.stg_proportion_from"></el-input>
            </el-form-item>
            <el-form-item label="策略占比区间结束" prop="stg_proportion_to">
                <el-input type="number" v-model="form.stg_proportion_to"></el-input>
            </el-form-item>
            <el-form-item label="策略描述" prop="desc">
                <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="产品id" prop="prod_id">
                <el-input type="number" v-model="form.prod_id"></el-input>
            </el-form-item>
        </el-col>
        <el-col>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">取消</el-button>
            </el-form-item>
        </el-col>
    </el-form>
</template>

<script>
    import api from '../axios.js'
    export default {
        data() {
            return {
                dialogFormVisible: null,
                form: {
                    "stg_type": "",
                    "year_start_backtesting": "",
                    "year_end_backtesting": "",
                    "stg_proportion_from": "",
                    "stg_proportion_to": "",
                    "desc": "",
                    "prod_id": ""
                },
                rules: { //验证规则
                    stg_type: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    year_start_backtesting: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    year_end_backtesting: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    stg_proportion_from: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    stg_proportion_to: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    desc: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    prod_id: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let opt = this.form;
                        opt.stg_proportion_from = Number(opt.stg_proportion_from);
                        opt.stg_proportion_to = Number(opt.stg_proportion_to);
                        opt.prod_id = Number(opt.prod_id);
                        api.addProdStg(opt)
                        .then(response => {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                            this.dialogFormVisible = false;
                            this.$emit("close",this.dialogFormVisible,"success");
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: 'error'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.dialogFormVisible = false;
                this.$emit("close",this.dialogFormVisible);
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>




