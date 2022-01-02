<template>
  <div id="app">
    <ul>
      <li v-for="item in arr" :key='item'>{{item}}</li>
      {{obj.hello}}
    </ul>
    <router-view></router-view>
    <router-link to='about'>222</router-link>
    <AboutVue ref="ab"/>
  </div>
</template>
<script>
import AboutVue from "./views/About.vue";
export default{
  components:{AboutVue},
  data(){
    return {
      msg:100,
      arr:[1,2,3,4],
      obj:{
        hello:'嘉琪',
      }

    }
  },
  mounted() {
    this.arr.length=3;
    delete this.obj.hello;
    console.log(this.$refs.ab.$data);
    console.log(this.$root);
  },
  beforeRouteEnter (to, from, next) {
    console.log(222);
    console.log(to,from,this);
    next();
  },
  beforeRouteLeave (to, from, next) {
    console.log(222);
    console.log(to,from,this);
    next();
  }
 
}
</script>

<style lang="scss">



</style>
