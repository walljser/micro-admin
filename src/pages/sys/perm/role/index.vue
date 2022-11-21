<template>
  <PageWrapper class="ztable" contentFullHeight>
    <vxe-grid ref='xGrid' v-bind="gridOptions">
      <template #tbtns>
        <vxe-input v-model="formData.name" placeholder="输入名称查询"></vxe-input>
        <vxe-button @click="searchEvent" status="primary">查 询</vxe-button>
        <vxe-button @click="addEvent({},openDrawer)">新 增</vxe-button>
        <vxe-button @click="deleteEvent($refs.xGrid)">删 除</vxe-button>
      </template>
      <template #name_default="{ row }">
          <span style="cursor:pointer;color: #3e9ece"
                @click="editEvent({id:row.id},openDrawer)">{{ row.name }}</span>
      </template>
    </vxe-grid>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess"/>
  </PageWrapper>
</template>
<script lang="ts">
export default {name: 'SysOrgRole', inheritAttrs: false, customOptions: {}}
</script>
<script lang="ts" setup>
import {PageWrapper} from '@/components/Page';
import {reactive, ref} from 'vue'
import {VxeGridInstance, VxeGridProps} from 'vxe-table'
import RoleDrawer from './RoleDrawer.vue';
import {useDrawer} from '@/components/Drawer';
import {deleteEvent, addEvent, editEvent, createOption} from '@/comps/vxe/list';

const xGrid = ref({} as VxeGridInstance)
const formData = reactive({name: ''})

const gridOptions = reactive<VxeGridProps>(createOption('/sys/perm/role', {}, formData, [
  {type: 'checkbox', align: 'center', width: 42, fixed: 'left'},
  {type: 'seq', align: 'center', width: 50, fixed: 'left'},
  {field: 'name', title: '角色名称', width: 300, fixed: 'left', slots: {default: 'name_default'}},
  {field: 'notes', title: '备注'},
  {field: 'crtim', title: '创建时间', width: 140},
  {field: 'uptim', title: '更新时间', width: 140},
]));

const searchEvent = () => {
  xGrid.value.commitProxy('query')
}

//--------------------------------------------------------------------------------------------------
const [registerDrawer, {openDrawer}] = useDrawer();

function handleSuccess() {
  searchEvent();
}
</script>

