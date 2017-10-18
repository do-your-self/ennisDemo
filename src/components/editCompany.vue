<template>
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
        <el-col :span="11">
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
                <el-input type="number" v-model.number="form.reg_capital"></el-input>
            </el-form-item>
            <el-form-item label="股东名单" prop="shareholder_names">
                <el-input v-model="form.shareholder_names"></el-input>
            </el-form-item>
            <el-form-item label="员工数量" prop="num_staff">
                <el-input type="number" v-model.number="form.num_staff"></el-input>
            </el-form-item>
            <el-form-item label="投研人数" prop="num_rd">
                <el-input type="number" v-model.number="form.num_rd"></el-input>
            </el-form-item>
            <el-form-item label="交易人员数(含运维)" prop="num_trade">
                <el-input type="number" v-model.number="form.num_trade"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="11">
            <el-form-item label="IT人数" prop="num_it">
                <el-input type="number" v-model.number="form.num_it"></el-input>
            </el-form-item>
            <el-form-item label="风控人数" prop="num_risk_mgr">
                <el-input type="number" v-model.number="form.num_risk_mgr"></el-input>
            </el-form-item>
            <el-form-item label="硕士及以上学历人数" prop="num_master">
                <el-input type="number" v-model.number="form.num_master"></el-input>
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
        <div style="text-align:left;padding: 0 150px 10px;">
            <el-checkbox v-model="form.risk_role_backup">人员备份</el-checkbox>
            <el-checkbox v-model="form.risk_web_backup">网络冗余</el-checkbox>
            <el-checkbox v-model="form.risk_power_backup">电源冗余</el-checkbox> 
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
                        { required: true, message: '请选择时间', trigger: 'change' }
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
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    num_master: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    num_rd: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    num_risk_mgr: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'},
                    ],
                    num_staff: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    num_trade: [
                        { type: 'number', required: true, message: '不允许为空和非数字类型的值', trigger: 'blur'}
                    ],
                    reg_capital: [
                        { type: 'number', required: true, message: '不允许为空', trigger: 'blur'}
                    ],
                    reg_id: [
                        { required: true, message: '不允许为空', trigger: 'blur'}
                    ],
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
                            delete this.form.id;
                            delete this.form.mgrcomp_id;
                            delete this.form.user;
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
                        this.form.risk_role_backup = !!this.form.risk_role_backup;
                        this.form.risk_web_backup = !!this.form.risk_web_backup;
                        this.form.risk_power_backup = !!this.form.risk_power_backup;
                        let opt = this.form;
                        api.setCompany(opt)
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
                this.$emit("close");
            }
        }
    }
</script>

<style scoped>
</style>


