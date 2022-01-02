<template>
  <div class="about">
    <h1>This is an about page{{hel}}</h1>
    <router-link :to="{name:'Home'}">homoe</router-link>
  </div>
</template>

<script>
export default{
  data(){
    return {
      hel:0,
    }
  }
}
</script>
