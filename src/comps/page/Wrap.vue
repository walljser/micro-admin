<template>
  <div class='p-flex' :style='{ height: `calc(100vh - ${initTagViewHeight}`,backgroundColor:"#f8f8f8"}'>
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
//设置高度为100%
import {computed} from 'vue';

const initTagViewHeight = computed(() => {
  return '92px'
});

</script>
