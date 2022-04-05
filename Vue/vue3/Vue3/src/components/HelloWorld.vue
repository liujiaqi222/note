<template>
  <div>你好啊 {{ msg }}</div>
  <button @click="handle1Click">+1</button>
  <button @click="handle2Click">-1</button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, defineExpose, reactive } from "vue";
// 使用defineEmits创建名称，接受一个数组
let myEmits = defineEmits(["myAdd", "myDel"]);
defineProps({
  msg: {
    type: String,
    default: "---",
  },
});

let a = ref(0);

let handle1Click = (): void => {
  a.value++;
  myEmits("myAdd", a.value);
};
let handle2Click = (): void => {
  a.value--;
  myEmits("myDel", a.value);
};

let info = reactive({
  name: "jaiqi",
  age: 23,
});

defineExpose({info})

let color='red';
</script>

<style scoped>
div{
  color:v-bind('color');
}
</style>
