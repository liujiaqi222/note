<template>
  <div class="home">
    显示的值{{ flag }}
    <button @click="changeHander">改变值</button>
    <HelloWorld msg="hello" @my-add="handle" @my-del="handle" ref="hello"></HelloWorld>
    <button @click="getSonHandler">click</button>
  </div>
</template>

<script lang="ts" setup>
// 组件也不需要被注册了
import HelloWorld from "./components/HelloWorld.vue";

import { ref } from "vue";
// flag变量不需要return出去了
let flag = ref("hello vue3.2");

// 函数也是同样
let changeHander = (): void => {
  flag.value = "hahaha";
};
function handle(value: number) {
  console.log(value);
}

const hello = ref();

function getSonHandler(){
  console.log(hello.value.info);
}

</script>
