<!-- 通过子组件注册的方式，显示Seller.vue -->
<template>
  <div class="com-page">
      <seller></seller>
  </div>
</template>

<script>
import Seller from '../components/Seller.vue';
export default {
    components:{
        Seller
    }
}
</script>

<style>

</style>