<template>
  <div >
    <TextInput :num.sync = 'num'/>
  </div>
</template>

<script>
import TextInput from './components/textInput.vue';

export default {
  components:{
    TextInput,
  },
  data(){
    return {
      num:0,
    }
  }
}
</script>

