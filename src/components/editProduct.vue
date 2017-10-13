<template>                
    <el-form ref="form" :model="form" label-width="100px" :fules="rules">
        <el-col :span="12">
            <el-form-item label="基金产品全称" prop="full_name">
                <el-input v-model="form.full_name"></el-input>
            </el-form-item>
            <el-form-item label="基金产品简称" prop="short_name">
                <el-input v-model="form.short_name"></el-input>
            </el-form-item>
            <el-form-item label="预警线" prop="warning_line">
                <el-input type="number" v-model="form.warning_line"></el-input>
            </el-form-item>
            <el-form-item label="风控线" prop="winding_line">
                <el-input type="number" v-model="form.winding_line"></el-input>
            </el-form-item>
            <el-form-item label="产品成立时间" prop="">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date_establishment" @change="dateChange" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="结构化描述信息(如果是结构化产品)" prop="desc_struct">
                <el-input v-model="form.desc_struct"></el-input>
            </el-form-item>
            <el-form-item label="基金经理ID" prop="prod_mgr_id">
                <el-input type="number" v-model="form.prod_mgr_id"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="产品数量" prop="prod_count">
                <el-input type="number" v-model="form.prod_count"></el-input>
            </el-form-item>
            <el-form-item label="产品规模" prop="prod_scale">
                <el-input type="number" v-model="form.prod_scale"></el-input>
            </el-form-item>
            <el-form-item label="平均年华换手率" prop="avg_turn_over_rate">
                <el-input type="number" v-model="form.avg_turn_over_rate"></el-input>
            </el-form-item>
            <el-form-item label="盈利股票平均持仓" prop="avg_win_holding_period">
                <el-input type="number" v-model="form.avg_win_holding_period"></el-input>
            </el-form-item>
            <el-form-item label="运行状态" prop="status">
                 <el-select v-model="form.status" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结构化描述信息(如果是结构化产品)" prop="desc_struct">
                <el-input type="textarea" v-model="form.desc_struct"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="form.is_auto_trading">是否程序化交易</el-checkbox>
                <el-checkbox v-model="form.is_intraday_trading">是否日内交易</el-checkbox>
                <el-checkbox v-model="form.is_struct">是否结构化</el-checkbox>
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
        props: ['listId'],
        data() {
            return {
                dialogFormVisible: null,
                form: {
                  "full_name": "",
                  "short_name": "",
                  "prod_count": "",
                  "prod_scale": "",
                  "warning_line": "",
                  "winding_line": "",
                  "desc_struct": "",
                  "status": "",
                  "date_establishment": "",
                  "is_auto_trading": "",
                  "is_intraday_trading": "",
                  "avg_turn_over_rate": "",
                  "avg_win_holding_period": "",
                  "is_struct": "",
                  "prod_mgr_id": ""
                },
                options2: [{
                        value: true,
                        label: '是'
                    }, {
                        value: false,
                        label: '否'
                    }
                ],
                options: [{
                        value: '0',
                        label: '是'
                    }, {
                        value: '1',
                        label: '否'
                    }
                ],
                rules: { //验证规则
                    full_name: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    short_name: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    prod_count: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    prod_scale: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    warning_line: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    winding_line: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    desc_struct: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    status: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    date_establishment: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    is_auto_trading: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    is_intraday_trading: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    avg_turn_over_rate: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    avg_win_holding_period: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    is_struct: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    prod_mgr_id: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ]
                },
                id: null
            }
        },
        created(){
            api.getProductId(this.listId).then((response) => {
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        this.form = response.data;
                        if(this.form.status == 0){
                            this.form.status = "是";
                        }else{
                            this.form.status = "否";
                        }
                    }
                }
            });
        },
        watch: {
            'listId': function(){
                // this.form = {};
                if(this.listId){
                    api.getProductId(this.listId).then((response) => {
                        if(response){
                            if(response.status === 401){
                                this.$router.push('/login');
                                //可以把无效的token清楚掉
                                this.$store.dispatch('UserLogout');
                            }else{
                                this.form = response.data;
                                if(this.form.status == 0){
                                    this.form.status = "是";
                                }else{
                                    this.form.status = "否";
                                }
                            }
                        }
                    });
                }
            }
        },
        methods: {
            dateChange(val){
                this.form.date_establishment = val;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.prod_count = Number(this.form.prod_count);
                        this.form.prod_scale = Number(this.form.prod_scale);
                        this.form.warning_line = Number(this.form.warning_line);
                        this.form.winding_line = Number(this.form.winding_line);
                        this.form.status = Number(this.form.status);
                        this.form.avg_turn_over_rate = Number(this.form.avg_turn_over_rate);
                        this.form.avg_win_holding_period = Number(this.form.avg_win_holding_period);
                        this.form.prod_mgr_id = Number(this.form.prod_mgr_id);
                        let opt = this.form;
                        let id = this.form.id;
                        api.setProduct(id,opt)
                        .then(response => {
                            this.$message({
                                type: 'success',
                                message: '修改成功'
                            });
                            //移除节点
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
                this.$refs[formName].resetFields();
                this.$emit("close",this.dialogFormVisible,"close");
            }
        }
    }
</script>

<style scoped>

</style>




