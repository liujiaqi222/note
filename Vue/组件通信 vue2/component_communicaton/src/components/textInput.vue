<template>
  <div>
    <input type="text" v-model.number='input'>
    <span>{{input}} + {{num}} = {{input+num}}</span> 
    <button @click = 'add'>加数+10</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      input:null,
    }
  },
  methods: {
    add(){
      this.$emit('update:num',this.num+10);
    }
  },
  props:['num']
}
</script>

<style lang="less">
div {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap:10px;
  align-items: center;
  color:white;
  background-color: rgb(89, 31, 247);
  input{
    color:white;
    background-color: transparent;
    border:1px solid white;
    padding: 5px 6px;
    border-radius: 5px;
  }
  button{
    color:white;
    background-color: transparent;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>