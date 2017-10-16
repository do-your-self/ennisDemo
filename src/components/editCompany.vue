<template>
    <el-form ref="form" :model="form" label-width="200px" :fules="rules">
        <el-col :span="12">
            <el-form-item label="投顾公司简称" prop="mgrcomp_short_name">
                <el-input v-model="form.mgrcomp_short_name"></el-input>
            </el-form-item>
            <el-form-item label="协会注册备案号" prop="reg_id">
                <el-input v-model="form.reg_id"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="成立时间" prop="date_establishment">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date_establishment" @change="dateChange" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="注册资本" prop="reg_capital">
                <el-input type="number" v-model="form.reg_capital"></el-input>
            </el-form-item>
            <el-form-item label="股东名单" prop="shareholder_names">
                <el-input v-model="form.shareholder_names"></el-input>
            </el-form-item>
            <el-form-item label="员工数量" prop="num_staff">
                <el-input type="number" v-model="form.num_staff"></el-input>
            </el-form-item>
            <el-form-item label="投研人数" prop="num_rd">
                <el-input type="number" v-model="form.num_rd"></el-input>
            </el-form-item>
            <el-form-item label="交易人员数(含运维)" prop="num_trade">
                <el-input type="number" v-model="form.num_trade"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="IT人数" prop="num_it">
                <el-input type="number" v-model="form.num_it"></el-input>
            </el-form-item>
            <el-form-item label="风控人数" prop="num_risk_mgr">
                <el-input type="number" v-model="form.num_risk_mgr"></el-input>
            </el-form-item>
            <el-form-item label="硕士及以上学历人数" prop="num_master">
                <el-input type="number" v-model="form.num_master"></el-input>
            </el-form-item>
            <el-form-item label="基础硬件硬件信息" prop="desc_hardware">
                <el-input type="textarea" v-model="form.desc_hardware"></el-input>
            </el-form-item>
            <el-form-item label="交易平台,商业平台(如TB,讯投),或自建平台" prop="desc_trading_platform">
                <el-input type="textarea" v-model="form.desc_trading_platform"></el-input>
            </el-form-item>
            <el-form-item label="数据库类型" prop="desc_db">
                <el-input type="textarea" v-model="form.desc_db"></el-input>
            </el-form-item>
            <el-form-item type="textarea" label="数据库备份及系统冗余" prop="desc_backup">
                <el-input v-model="form.desc_backup"></el-input>
            </el-form-item>
            <el-form-item label="其他风控措施" prop="desc_risk_mgr">
                <el-input type="textarea" v-model="form.desc_risk_mgr"></el-input>
            </el-form-item>
        </el-col>
        <el-form-item label="">
            <el-checkbox v-model="form.risk_role_backup">人员备份</el-checkbox>
            <el-checkbox v-model="form.risk_web_backup">网络冗余</el-checkbox>
            <el-checkbox v-model="form.risk_power_backup">电源冗余</el-checkbox>
        </el-form-item>
        <el-col>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-col>
    </el-form>
</template>

<script>
    import api from '../axios.js'
    export default {
        data() {
            return {
                loading: true,
                activeIndex: '1',
                form: {
                    "address": "",
                    "date_establishment": "",
                    "desc_backup": "",
                    "desc_db": "",
                    "desc_hardware": "",
                    "desc_risk_mgr": "",
                    "desc_trading_platform": "",
                    "mgrcomp_short_name": "",
                    "num_it": "",
                    "num_master": "",
                    "num_rd": "",
                    "num_risk_mgr": "",
                    "num_staff": "",
                    "num_trade": "",
                    "reg_capital": "",
                    "reg_id": "",
                    "risk_power_backup": "",
                    "risk_role_backup": "",
                    "risk_web_backup": "",
                    "shareholder_names": ""
                },
                rules: { //验证规则
                    address: [
                        { required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    date_establishment: [
                        { required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    desc_backup: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    desc_db: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    desc_hardware: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    desc_risk_mgr: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    desc_trading_platform: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    mgrcomp_short_name: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    num_it: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    num_master: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    num_rd: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    num_risk_mgr: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    num_staff: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    num_trade: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    reg_capital: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    reg_id: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    // risk_power_backup: [
                    //     { required: true, message: '不允许为空', trigger: 'blur'}
                    // ],
                    // risk_role_backup: [
                    //     { required: true, message: '不允许为空', trigger: 'blur'}
                    // ],
                    // risk_web_backup: [
                    //     { required: true, message: '不允许为空', trigger: 'blur'}
                    // ],
                    shareholder_names: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ]
                }
            }
        },
        beforeCreate(){
            api.getCompany().then((response) => {
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        if(response != {}){
                            this.loading = false;
                            this.form = response.data;
                        }
                    }
                }
            }); 
        },
        methods: {
            dateChange(val){
                this.form.date_establishment = val;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.num_staff = Number(this.form.num_staff);
                        this.form.num_trade = Number(this.form.num_trade);
                        this.form.num_rd = Number(this.form.num_rd);
                        this.form.num_risk_mgr = Number(this.form.num_risk_mgr);
                        this.form.reg_capital = Number(this.form.reg_capital);
                        this.form.num_it = Number(this.form.num_it);
                        this.form.num_master = Number(this.form.num_master);
                        this.form.risk_role_backup = !!this.form.risk_role_backup;
                        this.form.risk_web_backup = !!this.form.risk_web_backup;
                        this.form.risk_power_backup = !!this.form.risk_power_backup;
                        let opt = this.form;
                        api.setCompany(opt)
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
                // this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                // this.$emit("close",this.dialogFormVisible,"close");
            }
        }
    }
</script>

<style scoped>
</style>


