<template>
  <div class="v-list">
    <div class="v-list-head">
      <div class='zjustify'>
        <div>
          <a-input @keyup.enter="listQuery($refs.gridRef)" v-model:value="state.form.name" placeholder="输入名称回车查询" class='list-search'/>
          <a-button @click="listQuery($refs.gridRef)" class="v-btn-primary">查询</a-button>
        </div>
        <div>
          <a-button @click="editRef.open()" class="v-btn-success" style="margin-right: 8px;">新增</a-button>
          <a-button @click="listDelete(state.url,$refs.gridRef)" class="v-btn-danger" >删除</a-button>
        </div>
      </div>
    </div>
    <div class="v-list-body" :style='{ height: `calc(100vh - 141px`}'>
      <vxe-grid ref='gridRef' v-bind="gridOptions">
        <template #name_default="{ row }">
          <span @click="editRef.open(row.id)" style="cursor:pointer;color: #3e9ece">
            {{ row.id }}
          </span>
        </template>
      </vxe-grid>
    </div>
    <Edit ref="editRef" @close="listQuery($refs.gridRef)"/>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, toRefs,ref} from 'vue'
import {VxeGridProps} from 'vxe-table'
import {listInit, listQuery,listDelete} from '@/comps/page/index';
import {useGo} from "@/hooks/web/usePage";
import Edit from "./edit.vue";

const go = useGo();

const state = reactive({
  url: '/ass/num/main',moreParams: false,
  form: {},
});

const editRef=ref();

const {form} = toRefs(state);

const gridOptions = reactive<VxeGridProps>({
  columns: [
    {type: 'checkbox', align: 'center', width: 42, fixed: 'left'},
    {type: 'seq', align: 'center', width: 50, fixed: 'left'},
    {field: 'id', title: '编号策略代码', width: 160, fixed: 'left', slots: {default: 'name_default'}},
    {field: 'name', title: '编号策略名称', width: 180},
    {field: 'nupre', title: '前缀', width: 160},
    {field: 'numod', title: '生成模式', width: 160},
    {field: 'nunex', title: '下一个编号', width: 160},
    {field: 'notes', title: '备注'},
  ],
});

onMounted(() => {
  listInit(state, gridOptions);
});


</script>

