<template>
  <div class="v-list">
    <div class="v-list-head">
      <div class='zjustify'>
        <div>
          <a-input @keyup.enter="listQuery($refs.gridRef)" v-model:value="state.form.name" placeholder="输入名称回车查询" class='list-search'/>
          <a-button @click="listQuery($refs.gridRef)" class="v-btn-primary">查询</a-button>
        </div>
        <div>
          <a-button @click="listDelete(state.url,$refs.gridRef)" class="v-btn-danger" >删除</a-button>
        </div>
      </div>
    </div>
    <div class="v-list-body" :style='{ height: `calc(100vh - 141px`}'>
      <vxe-grid ref='gridRef' v-bind="gridOptions">
        <template #name_default="{ row }">
          <span @click="operView.open(row.id)" style="cursor:pointer;color: #3e9ece">
            {{ row.name }}
          </span>
        </template>
      </vxe-grid>
    </div>
    <OperView ref="operView"/>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, toRefs,ref} from 'vue'
import {VxeGridProps} from 'vxe-table'
import {listInit, listQuery,listDelete,tabEdit} from '@/comps/page/index';
import {useGo} from "@/hooks/web/usePage";
import OperView from "./view.vue";

const go = useGo();

const state = reactive({
  url: '/mon/log/oper',moreParams: false,
  form: {},
});

const operView=ref();

const {form} = toRefs(state);

const gridOptions = reactive<VxeGridProps>({
  columns: [
    {type: 'checkbox', align: 'center', width: 42, fixed: 'left'},
    {type: 'seq', align: 'center', width: 50, fixed: 'left'},
    {field: 'name', title: '操作名称', width: 160, fixed: 'left', slots: {default: 'name_default'}},
    {field: 'usena', title: '用户姓名', width: 100},
    {field: 'usnam', title: '用户账号', width: 100},
    {field: 'time', title: '请求耗时', width: 80},
    {field: 'ip', title: 'IP', width: 120},
    {field: 'addre', title: 'IP来源', width: 160},
    {field: 'ageos', title: '操作系统', width: 150},
    {field: 'agbro', title: '浏览器'},
  ],
});

onMounted(() => {
  listInit(state, gridOptions);
});


</script>

