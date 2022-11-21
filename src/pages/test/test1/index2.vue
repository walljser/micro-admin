<template>
  <div class="bg-white m-4 mr-0 overflow-hidden">
    <BasicTree
        title="部门列表"
        toolbar
        search
        height="600"
        :treeData="treeData"
        :replaceFields="{ key: 'id', title: 'name' }"
        @select="handleSelect"
    >
      <template #switcherIcon><down-outlined/></template>
    </BasicTree>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {BasicTree, TreeItem} from '@/components/Tree';
import {defHttp} from "@/utils/http/axios";
import { DownOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['select']);

const treeData = ref<TreeItem[]>([]);

async function fetch() {
  treeData.value = (await defHttp.get({url: '/gen/org/dept/tree'})) as unknown as TreeItem[];
}

function handleSelect(keys,node) {
  if(keys.length>0){
    emit('select',{id:keys[0],name:node.selectedNodes[0].props.name} );
  }
}

onMounted(() => {
  fetch();
});
</script>

<style scoped>
/*.vxe-toolbar.size--small{*/
/*  height: 45px;*/
/*}*/
.vxe-pager .size--small{
  height: 36px;
}

.basic-tree-header{
  line-height: 2.5;
}
</style>
