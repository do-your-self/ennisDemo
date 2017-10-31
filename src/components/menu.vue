<template>
  <md-list style="width:100%;background:#eee;">
    <md-list-item @click="routerLink('/home/company')" :class="{'active': active=='/home/company'?true:false}">
      <md-icon class="md-primary">business</md-icon>
      <span>公司信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/staff')" :class="{'active': active=='/home/staff'?true:false}">
      <md-icon class="md-primary">group</md-icon>
      <span>职工信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/stg')" :class="{'active': active=='/home/stg'?true:false}">
      <md-icon class="md-primary">short_text</md-icon>
      <span>策略信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/product')" :class="{'active': active=='/home/product'?true:false}">
      <md-icon class="md-primary">show_chart</md-icon>
      <span>产品信息</span>
    </md-list-item>
    <md-list-item @click="routerLink('/home/prodStg')" :class="{'active': active=='/home/prodStg'?true:false}">
      <md-icon class="md-primary">shuffle</md-icon>
      <span>产品策略信息</span>
    </md-list-item>
  </md-list>
</template>

<script>
  export default {
    data(){
      return {
        active: this.$router.currentRoute.fullPath
      }
    },
    methods: {
      routerLink(path) {
        console.log(this.$router.currentRoute.fullPath)
        this.$router.push(path)
        this.active = path;
      }
    }
  }
</script>

<style>
  .active {
    background: #3f51b5!important;
    border-bottom: 2px solid #3f51b5;
    color: #fff;
  }
  .active .md-icon {
    color: #fff!important;
  }
</style>


