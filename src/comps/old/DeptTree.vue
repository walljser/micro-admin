<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表" toolbar search :clickRowToExpand="false"
      :treeData="treeData" :fieldNames="{ key: 'id', title: 'name' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree } from '@/components/Tree';
  import { defHttp } from "@/utils/http/axios";

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<any[]>([]);

      async function fetch() {
        treeData.value =(await defHttp.get({url: '/gen/org/dept/tree'})) as any;
      }

      // function handleSelect(keys) {
      //   emit('select', keys[0]);
      // }

      function handleSelect(keys, node) {
        if (keys.length > 0) {
          emit('select', {id: keys[0], name: node.selectedNodes[0].name});
        }
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
