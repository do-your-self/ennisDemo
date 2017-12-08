<template>
  <div id="app">
    <!-- 消息提示框 -->
    <div class="md-snackbar md-theme-default md-active md-position-top-center">
      <transition name="fade">
        <div class="md-snackbar-container" v-show="$store.state.msg">
          <div class="md-snackbar-content">
            <span><md-icon class="md-primary">info</md-icon>{{ $store.state.message }}</span> 
            <button type="button" class="md-button md-accent md-theme-light-blue" @click="close">关闭</button>
          </div>
        </div>
      </transition>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    close() {
      this.$store.state.msg=false;
    }
  }
}
</script>

<style>
  /* fallback */
  /* material icon */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(./assets/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
  html,body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  } 

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }

</style>
