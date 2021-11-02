<template>
  <div id="app" :class="{hidden:$route.name !== 'ScreenPage'}" >
    <!-- 路由占位符 -->
    <!-- 如果是总览页，则不显示goBack的图标 -->
    <i class="fas fa-backspace" v-show="$route.name !== 'ScreenPage'" @click='goBack'></i>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  },
}

</script>

<style lang="scss" scoped>

.hidden{
  overflow: hidden;
}

  i.fas.fa-backspace{
    position: absolute;
    color:white;
    z-index: 100000;
    top: -10px;
    right: 0px;
    cursor: pointer;
    font-size: 4rem;
    font-weight: bold;
  }

 
</style>
