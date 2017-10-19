<template>
    <el-col :span="24">
        <el-card class="box-card" style="text-align:left;width:100%">
            <div slot="header" class="clearfix">
                <span style="line-height: 36px;">{{form.user}}</span>
                <router-link to="/home/editCompany" v-if="$store.state.admin=='false'">
                    <el-button style="float: right;" type="primary" @click="editCompany">修改/完善</el-button>
                </router-link>
            </div>
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class="text item"><b>投顾公司简称:</b> {{form.mgrcomp_short_name}}</div>
                    <div class="text item"><b>协会注册备案号:</b> {{form.reg_id}}</div>
                    <div class="text item"><b>地址:</b> {{form.address}}</div>
                    <div class="text item"><b>成立时间:</b> {{form.date_establishment}}</div>
                    <div class="text item"><b>注册资本:</b> {{form.reg_capital}}</div>
                    <div class="text item"><b>股东名单:</b> {{form.shareholder_names}}</div>
                    <el-checkbox v-model="form.risk_role_backup">人员备份</el-checkbox>
                    <el-checkbox v-model="form.risk_web_backup">网络冗余</el-checkbox>
                    <el-checkbox v-model="form.risk_power_backup">电源冗余</el-checkbox>
                </el-col>
                <el-col :span="14">
                    <div class="text item">
                        <el-tabs type="card">
                            <el-tab-pane>
                                <span slot="label">员工</span>
                                <div class="text item">员工数量: {{form.num_staff}}</div>
                                <div class="text item">投研人数: {{form.num_rd}}</div>
                                <div class="text item">交易人员数(含运维): {{form.num_trade}}</div>
                                <div class="text item">IT人数: {{form.num_it}}</div>
                                <div class="text item">风控人数: {{form.num_risk_mgr}}</div>
                                <div class="text item">硕士及以上学历人数: {{form.num_master}}</div>
                            </el-tab-pane>
                            <el-tab-pane label="基础硬件硬件信息">
                                <div class="text item">基础硬件硬件信息: {{form.desc_hardware}}</div>
                            </el-tab-pane>
                            <el-tab-pane label="平台">
                                <div class="text item">交易平台,商业平台(如TB,讯投),或自建平台: {{form.desc_trading_platform}}</div>
                            </el-tab-pane>
                            <el-tab-pane label="数据库类型">
                                <div class="text item">数据库类型: {{form.desc_db}}</div>
                            </el-tab-pane>
                            <el-tab-pane label="数据库备份及系统冗余">
                                <div class="text item">数据库备份及系统冗余: {{form.desc_backup}}</div>
                            </el-tab-pane>
                            <el-tab-pane label="其他风控措施">
                                <div class="text item">其他风控措施: {{form.desc_risk_mgr}}</div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="closeDialog">
            <hr>
            <router-view v-on:close="closeDialog"></router-view>
        </el-dialog>
    </el-col>
</template>

<script>
    import api from '../axios.js'
    export default {
        data() {
            return {
                title: '',
                dialogFormVisible: false,
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
                }
            }
        },
        beforeCreate(){
            let admin = this.$store.state.admin;
            if(admin=="true"&&this.$store.state.id!="null"){
                let id = this.$store.state.id;
                api.getIdCompany(id).then((response) => {
                    this.getData(response);
                });
            }else{
                api.getCompany().then((response) => {
                    this.getData(response);
                });   
            }
        },
        methods: {
            getData(response){      //拿到返回的数据
                if(response){
                    if(response.status === 401){
                        this.$router.push('/login');
                        //可以把无效的token清楚掉
                        this.$store.dispatch('UserLogout');
                    }else{
                        if(response != {}){
                            this.form = response.data;
                        }
                    }
                }
            },
            dateChange(val){
                this.form.date_establishment = val;
            },
            closeDialog(res,msg){
                this.dialogFormVisible = false;
                this.$router.push('/home/company');
                if(res==="success"){
                    this.$message({
                        type: 'success',
                        message: msg
                    });
                    api.getCompany().then((response) => {
                        this.getData(response);
                    });
                }
            },
            editCompany() {
                this.dialogFormVisible = true;
                this.title = '编辑';
            }
        }
    }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 8px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    min-height: 500px;
  }
</style>


