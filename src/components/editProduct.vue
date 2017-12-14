<template>
  <md-card style="width:100%;">

    <md-card-header>
      <div class="md-title">编辑<span class="md-subhead">(修改产品信息)</span></div>
    </md-card-header>

    <md-card-content>
      <form style="width:100%;">
        <md-layout md-gutter="16">
          <md-layout md-flex="30" md-flex-offset="15">
            <md-input-container :class="{'md-input-invalid':$v.form.prod_mgr_id.$error}">
              <label for="stg_type">基金经理</label>
              <md-select name="prod_mgr_id" v-model="form.prod_mgr_id" style="width:100%">
                <md-option v-for="item in list" :key="item.value" :value="item.value">{{item.label}}</md-option>
              </md-select>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.full_name.$error}">
              <label>基金产品全称</label>
              <md-input class="md-input" v-model.trim="form.full_name" @input="$v.form.full_name.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.short_name.$error}">
              <label>基金产品简称</label>
              <md-input v-model="form.short_name" @input="$v.form.short_name.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.date_establishment.$error}">
              <label>产品成立时间</label>
              <md-input v-model="form.date_establishment" type="date" @input="$v.form.date_establishment.$touch()"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.warning_line.$error}">
              <label>预警线</label>
              <md-input v-model.number="form.warning_line" @input="$v.form.warning_line.$touch()"></md-input>
              <span class="md-error" v-if="!$v.form.warning_line.required">不允许为空</span>
              <span class="md-error" v-if="!$v.form.warning_line.numeric">输入必须为数值</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.winding_line.$error}">
              <label>风控线</label>
              <md-input v-model.number="form.winding_line" @input="$v.form.winding_line.$touch()" type="number"></md-input>
              <span class="md-error" v-if="!$v.form.winding_line.required">不允许为空</span>
              <span class="md-error" v-if="!$v.form.winding_line.numeric">输入必须为数值</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.desc_struct.$error}">
              <label>结构化描述信息(如果是结构化产品)</label>
              <md-input v-model.number="form.desc_struct" @input="$v.form.desc_struct.$touch()" type="number"></md-input>
              <span class="md-error">不允许为空</span>
            </md-input-container>

          </md-layout>
          <md-layout md-flex="30" md-flex-offset="5">
            <md-input-container :class="{'md-input-invalid':$v.form.prod_count.$error}">
              <label>产品数量</label>
              <md-input v-model.number="form.prod_count" @input="$v.form.prod_count.$touch()" type="number"></md-input>
              <md-icon class="font">只</md-icon>
              <span class="md-error" v-if="!$v.form.prod_count.required">不允许为空</span>
              <span class="md-error" v-if="!$v.form.prod_count.numeric">输入必须为数值</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.prod_scale.$error}">
              <label>产品规模</label>
              <md-input v-model.number="form.prod_scale" @input="$v.form.prod_scale.$touch()" type="number"></md-input>
              <md-icon class="font">万</md-icon>
              <span class="md-error" v-if="!$v.form.prod_scale.required">不允许为空</span>
              <span class="md-error" v-if="!$v.form.prod_scale.numeric">输入必须为数值</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.avg_turn_over_rate.$error}">
              <label>平均年华换手率</label>
              <md-input v-model.number="form.avg_turn_over_rate" @input="$v.form.avg_turn_over_rate.$touch()" type="number"></md-input>
              <md-icon class="font">%</md-icon>
              <span class="md-error" v-if="!$v.form.avg_turn_over_rate.required">不允许为空</span>
              <span class="md-error" v-if="!$v.form.avg_turn_over_rate.numeric">输入必须为数值</span>
            </md-input-container>
            <md-input-container :class="{'md-input-invalid':$v.form.avg_win_holding_period.$error}">
              <label>盈利股票平均持仓</label>
              <md-input v-model.number="form.avg_win_holding_period" @input="$v.form.avg_win_holding_period.$touch()" type="number"></md-input>
              <md-icon class="font">天</md-icon>
              <span class="md-error" v-if="!$v.form.avg_win_holding_period.required">不允许为空</span>
              <span class="md-error" v-if="!$v.form.avg_win_holding_period.numeric">输入必须为数值</span>
            </md-input-container>
            <md-input-container>
              <label for="status">运行状态</label>
              <md-select name="status" v-model="form.status" style="width:100%">
                <md-option value="0">未发行</md-option>
                <md-option value="1">运行中</md-option>
                <md-option value="2">已清盘</md-option>
              </md-select>
            </md-input-container>
            <div class="inputCon">
              <md-checkbox name="my-test1" v-model="form.is_auto_trading">是否程序化交易</md-checkbox>
              <md-checkbox name="my-test1" v-model="form.is_intraday_trading">是否日内交易</md-checkbox>
              <md-checkbox name="my-test1" v-model="form.is_struct">是否结构化</md-checkbox>
            </div>

          </md-layout>
        </md-layout>

      </form>

      <md-layout md-align="center">
        <md-button class="md-primary md-raised" @click="submitForm">提交</md-button>
        <md-button class="md-dense md-raised" @click="cancelForm">取消</md-button>
      </md-layout>
    </md-card-content>
  </md-card>
</template>

<script>
  import {required,numeric} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        staff: [],
        list: [],
        states: [],
        form: this.$route.query
      }
    },
    validations: {
      form: {
        full_name: {
          required
        },
        short_name: {
          required
        },
        prod_count: {
          required,
          numeric
        },
        prod_scale: {
          required,
          numeric
        },
        warning_line: {
          required,
          numeric
        },
        winding_line: {
          required,
          numeric
        },
        desc_struct: {
          required
        },
        status: {
          required
        },
        date_establishment: {
          required
        },
        avg_turn_over_rate: {
          required,
          numeric
        },
        avg_win_holding_period: {
          required,
          numeric
        },
        prod_mgr_id: {
          required
        }
      }
    },
    mounted() {
      this.api.getStaff(50, 1).then(response => {
        this.states = response.data.items;
        this.list = this.states.map(item => {
          return {value: item.id, label: item.name};
        });
      }).catch((err) => {
      })
    },
    methods: {
      submitForm() {
        this.$v.form.$touch();
        if (!this.$v.$error) {                        
          this.form.prod_count = Number(this.form.prod_count);
          this.form.prod_scale = Number(this.form.prod_scale);
          this.form.warning_line = Number(this.form.warning_line);
          this.form.winding_line = Number(this.form.winding_line);
          this.form.status = Number(this.form.status);
          this.form.avg_turn_over_rate = Number(this.form.avg_turn_over_rate);
          this.form.avg_win_holding_period = Number(this.form.avg_win_holding_period);
          this.form.prod_mgr_id = Number(this.form.prod_mgr_id);
          let id = this.form.id;
          let opt = JSON.parse(JSON.stringify(this.form));
          delete opt.id;
          opt.status = Number(opt.status);
          this.api.setProduct(id, opt)
            .then(response => {
              this.$store.dispatch('Message', {msg: true,message:"添加成功"});
              this.$router.push('/home/product');
            }).catch((err) => {
          })
        }
      },
      cancelForm(formName) {
        this.$store.dispatch('Message', {msg: true,message:"取消"});
        this.$router.push('/home/product');
      }
    }
  }
</script>

<style scoped>
  .font{
    font-size: 14px;
  }
</style>




