<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" style="margin: 6px 0 6px 6px;"/>
    <div class="w-3/4 xl:w-4/5 ztable">
      <vxe-grid ref='xGrid' v-bind="gridOptions">
        <template #tbtns>
          <vxe-input v-model="formData.name" placeholder="输入名称查询"></vxe-input>
          <vxe-button @click="searchEvent" status="primary">查 询</vxe-button>
          <vxe-button @click="addEvent({ dept:{id:formData.depid,name:formData.depna}},openDrawer)">新 增</vxe-button>
          <vxe-button @click="deleteEvent($refs.xGrid)">删 除</vxe-button>
        </template>
        <template #name_default="{ row }">
          <span style="cursor:pointer;color: #3e9ece"
                @click="editEvent({id:row.id},openDrawer)">{{ row.name }}</span>
        </template>
      </vxe-grid>
    </div>
    <PostDrawer @register="registerDrawer" @success="handleSuccess"/>
  </PageWrapper>
</template>
<script lang="ts">
export default {name: 'SysOrgPost', inheritAttrs: false, customOptions: {}}
</script>
<script lang="ts" setup>
import {PageWrapper} from '@/components/Page';
import DeptTree from '@/comps/org/DeptTree.vue';
import {reactive, ref} from 'vue'
import {VxeGridInstance, VxeGridProps} from 'vxe-table'
import PostDrawer from './PostDrawer.vue';
import {useDrawer} from '@/components/Drawer';
import {deleteEvent, addEvent, editEvent, createOption} from '@/comps/vxe/list';

const xGrid = ref({} as VxeGridInstance)
const formData = reactive({
  name: '',
  depid: '',
  depna: '',
})

const gridOptions = reactive<VxeGridProps>(createOption('/sys/org/post', {}, formData, [
  {type: 'checkbox', align: 'center', width: 42, fixed: 'left'},
  {type: 'seq', align: 'center', width: 50, fixed: 'left'},
  {field: 'name', title: '岗位名称', width: 300, fixed: 'left', slots: {default: 'name_default'}},
  {field: 'notes', title: '备注'},
  {field: 'crtim', title: '创建时间', width: 140},
  {field: 'uptim', title: '更新时间', width: 140},
]));

const searchEvent = () => {
  xGrid.value.commitProxy('query')
}

function handleSelect(node) {
  if(node!=null){
    formData.depid = node.id;
    formData.depna = node.name;
  }else{
    formData.depid = '';
    formData.depna = '';
  }
  searchEvent();
}

//--------------------------------------------------------------------------------------------------
const [registerDrawer, {openDrawer}] = useDrawer();

function handleSuccess() {
  searchEvent();
}
</script>

