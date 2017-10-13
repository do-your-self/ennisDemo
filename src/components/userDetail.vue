<template>                
        <el-form ref="form" :model="form" label-width="200px" >
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
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date_establishment" style="width: 100%;"></el-date-picker>
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
                <el-form-item label="">
                    <el-checkbox v-model="form.risk_role_backup">人员备份</el-checkbox>
                    <el-checkbox v-model="form.risk_web_backup">网络冗余</el-checkbox>
                    <el-checkbox v-model="form.risk_power_backup">电源冗余</el-checkbox>
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
            <el-col v-if="!this.$store.state.admin">
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
        props: ['listId'],
        data() {
            return {
                admin: false,
                dialogFormVisible: null,
                form: {
                  "num_risk_mgr": "",
                  "num_trade": "",
                  "user": "",
                  "address": "",
                  "date_establishment": "",
                  "reg_capital": "",
                  "mgrcomp_short_name": "",
                  "desc_risk_mgr": "",
                  "reg_id": "",
                  "risk_role_backup": "",
                  "desc_backup": "",
                  "num_master": "",
                  "mgrcomp_id": "",
                  "risk_power_backup": "",
                  "risk_web_backup": "",
                  "num_rd": "",
                  "num_it": "",
                  "desc_hardware": "",
                  "shareholder_names": "",
                  "id": "",
                  "num_staff": "",
                  "desc_trading_platform": "",
                  "desc_db": ""
                }
            }
        },
        created(){
            api.getUserId(this.listId).then((response) => {
                this.admin = this.$store.state.admin;
                console.log(this.admin)
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        this.form = response.data;
                    }
                }
            });
        },
        watch: {
            'listId': function(){
                if(this.listId){
                    api.getUserId(this.listId).then((response) => {
                        if(response){
                            if(response.status === 401){
                                this.$router.push('/login');
                                //可以把无效的token清楚掉
                                this.$store.dispatch('UserLogout');
                            }else{
                                this.form = response.data;
                            }
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>




