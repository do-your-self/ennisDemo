<template>
  <md-table-card style="width:100%;">

    <md-card-header v-if="$store.state.admin=='false'">
      <router-link tag="md-button" :to="{path:'/home/editCompany',query: {'form': form}}" class="md-raised md-primary">
        <md-icon>edit</md-icon>
        编辑
      </router-link>
    </md-card-header>
    <md-layout md-gutter>
      <md-layout md-flex="33">
        <md-list>
          <md-list-item>
            <span>投顾公司简称:{{form.mgrcomp_short_name}}</span>
          </md-list-item>
          <md-list-item>
            <span>协会注册备案号:{{form.reg_id}}</span>
          </md-list-item>
          <md-list-item>
            <span>地址:{{form.address}}</span>
          </md-list-item>
          <md-list-item>
            <span>成立时间:{{form.date_establishment}}</span>
          </md-list-item>
          <md-list-item>
            <span>注册资本:{{form.reg_capital}}</span>
          </md-list-item>
          <md-list-item>
            <span>股东名单:{{form.shareholder_names}}</span>
          </md-list-item>
          <md-list-item>
            <span></span>
          </md-list-item>
        </md-list>
      </md-layout>
      <md-layout>
        <md-tabs>
          <md-tab md-label="员工">
            <p>
              <span slot="label">员工</span>
            <div class="text item">员工数量: {{form.num_staff}}</div>
            <div class="text item">投研人数: {{form.num_rd}}</div>
            <div class="text item">交易人员数(含运维): {{form.num_trade}}</div>
            <div class="text item">IT人数: {{form.num_it}}</div>
            <div class="text item">风控人数: {{form.num_risk_mgr}}</div>
            <div class="text item">硕士及以上学历人数: {{form.num_master}}</div>
            </p>
          </md-tab>
          <md-tab md-label="基础硬件硬件信息">
            <p>基础硬件硬件信息: {{form.desc_hardware}}</p>
          </md-tab>
          <md-tab md-label="平台">
            <p>交易平台,商业平台(如TB,讯投),或自建平台: {{form.desc_trading_platform}}</p>
          </md-tab>
          <md-tab md-label="数据库类型">
            <p>数据库类型: {{form.desc_db}}</p>
          </md-tab>
          <md-tab md-label="数据库备份及系统冗余">
            <p>数据库备份及系统冗余: {{form.desc_backup}}</p>
          </md-tab>
          <md-tab md-label="其他风控措施">
            <p>其他风控措施: {{form.desc_risk_mgr}}</p>
          </md-tab>

        </md-tabs>
      </md-layout>
    </md-layout>
  </md-table-card>
</template>

<script>
  import api from '../axios.js'

  export default {
    data() {
      return {
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
    beforeCreate() {
      let admin = this.$store.state.admin;
      if (admin == "true" && this.$store.state.id != "null") {
        let id = this.$store.state.id;
        api.getIdCompany(id).then((response) => {
          this.getData(response);
        });
      } else {
        api.getCompany().then((response) => {
          this.getData(response);
        });
      }
    },
    methods: {
      getData(response) {      //拿到返回的数据
        if (response) {
          if (response.status === 401) {
            this.$router.push('/login');
            //可以把无效的token清楚掉
            this.$store.dispatch('UserLogout');
          } else {
            if (response != {}) {
              this.form = response.data;
            }
          }
        }
      }
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }
</style>


