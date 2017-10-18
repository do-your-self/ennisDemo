<template>                
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <el-col :span="11">
            <el-form-item label="基金经理" prop="prod_mgr_id">
                <el-select v-model.number="form.prod_mgr_id" filterable placeholder="请选择" style="width:100%">
                    <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="基金产品全称" prop="full_name">
                <el-input v-model="form.full_name"></el-input>
            </el-form-item>
            <el-form-item label="基金产品简称" prop="short_name">
                <el-input v-model="form.short_name"></el-input>
            </el-form-item>
            <el-form-item label="预警线" prop="warning_line">
                <el-input type="number" v-model.number="form.warning_line"></el-input>
            </el-form-item>
            <el-form-item label="风控线" prop="winding_line">
                <el-input type="number" v-model.number="form.winding_line"></el-input>
            </el-form-item>
            <el-form-item label="产品成立时间" prop="date_establishment">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date_establishment" @change="dateChange" style="width: 100%;"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="11">
            <el-form-item label="产品数量" prop="prod_count">
                <el-input type="number" v-model.number="form.prod_count"></el-input>
            </el-form-item>
            <el-form-item label="产品规模" prop="prod_scale">
                <el-input type="number" v-model.number="form.prod_scale"></el-input>
            </el-form-item>
            <el-form-item label="平均年华换手率" prop="avg_turn_over_rate">
                <el-input type="number" v-model.number="form.avg_turn_over_rate"></el-input>
            </el-form-item>
            <el-form-item label="盈利股票平均持仓" prop="avg_win_holding_period">
                <el-input type="number" v-model.number="form.avg_win_holding_period"></el-input>
            </el-form-item>
            <el-form-item label="运行状态" prop="status">
                 <el-select v-model="form.status" placeholder="请选择" style="width:100%">
                    <el-option key="1" label="是" value="1"></el-option>
                    <el-option key="0" label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="结构化描述信息(如果是结构化产品)" prop="desc_struct">
                <el-input type="textarea" v-model="form.desc_struct"></el-input>
            </el-form-item>
        </el-col>
        <div style="text-align:left;padding:0 150px 10px;float:left;">
            <el-checkbox v-model="form.is_auto_trading">是否程序化交易</el-checkbox>
            <el-checkbox v-model="form.is_intraday_trading">是否日内交易</el-checkbox>
            <el-checkbox v-model="form.is_struct">是否结构化</el-checkbox>
        </div>
        <el-col style="padding:20px 0 50px;">
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
        </el-col>
    </el-form>
</template>

<script>
    import api from '../axios.js'
    export default {
        data() {
            return {
                items: [],
                staff: [],
                list: [],
                loading: false,
                states: [],
                form: {
                    "full_name": "",
                    "short_name": "",
                    "prod_count": "",
                    "prod_scale": "",
                    "warning_line": "",
                    "winding_line": "",
                    "desc_struct": "",
                    "status": "1",
                    "date_establishment": "",
                    "is_auto_trading": false,
                    "is_intraday_trading": false,
                    "avg_turn_over_rate": "",
                    "avg_win_holding_period": "",
                    "is_struct": false,
                    "prod_mgr_id": ""
                },
                rules: { //验证规则
                    full_name: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    short_name: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    prod_count: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    prod_scale: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    warning_line: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    winding_line: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    desc_struct: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    status: [
                        { required: true, message: '请选择运行状态', trigger: 'change'}
                    ],
                    date_establishment: [
                        { required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    is_auto_trading: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    is_intraday_trading: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    avg_turn_over_rate: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    avg_win_holding_period: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    is_struct: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    prod_mgr_id: [
                        { type: 'number', required: true, message: '请选择产品经理', trigger: 'change'}
                    ]
                }
            }
        },
        mounted() {
            api.getStaff(50,1).then(response => {
                this.states = response.data.items;
                this.list = this.states.map(item => {
                    return { value: item.id, label: item.name };
                });
            }).catch((err) => {
                console.log(err);
            })
        },
        methods: {
            getData(response){      //拿到返回的数据
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        this.loading = false;
                        this.form = response.data;
                        if(this.form.sex){
                            this.form.sex = '1';
                        }else{
                            this.form.sex = '0';
                        }
                    }
                }
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.items = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.items = [];
                }
            },
            dateChange(val){
                this.form.date_establishment = val;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let opt = JSON.parse(JSON.stringify(this.form));
                        opt.status = Number(opt.status);
                        api.addProduct(opt)
                        .then(response => {
                            this.$emit("close","success","添加成功");
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
                this.$emit("close");
                // this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>

</style>




