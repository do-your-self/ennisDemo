<template>
  <md-layout md-align="center" md-gutter="35" style="min-height: 600px;margin-top:220px;">
    <md-layout md-flex="30">
      <form style="width:100%;">
        <md-input-container :class="{'md-input-invalid':$v.email.$error}">
          <md-icon>email</md-icon>
          <label>邮箱</label>
          <md-input type="email" required v-model="email" @input="$v.email.$touch()"></md-input>
          <span class="md-error" v-if="$v.email.$error&&$v.email.email">不允许为空</span>
          <span class="md-error" v-if="!$v.email.email">请填写正确的邮箱格式</span>
        </md-input-container>
        <md-button class="md-raised md-primary" @click="submit">提交</md-button>
      </form>
    </md-layout>
  </md-layout>
</template>

<script>
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        email: ""
      }
    }, //验证注册登录
    validations: {
      email: {
        required,
        email
      }
    },
    methods: {
      submit() {
        this.$v.email.$touch();
        if (!this.$v.$error) { //验证通过
          this.api.sendMail({"email": this.email}).then(({data}) => {
            if (data.Success) {
              this.$store.dispatch('Message', {msg: true,message:"已发送"});
            } else {
              this.$store.dispatch('Message', {msg: true,message:data.statusText});
            }
          });
        } else { //验证不通过
          return false;
        }
      }
    }
  }
</script>

<style scoped>

  .md-input-container {
    margin: 2px 0 23px !important;
    float: left;
  }
</style>
