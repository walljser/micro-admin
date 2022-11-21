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
      <template #operate="{ row }">
        <OrderedListOutlined  @click="editData(row.id)" style="font-size: 15px;"/>
      </template>
    </vxe-grid>
    <DictMainDrawer @register="registerDrawer" @success="handleSuccess"/>
  </PageWrapper>
</template>
<script lang="ts">
export default {name: 'AssDictMain', inheritAttrs: false}
</script>
<script lang="ts" setup>
import {PageWrapper} from '@/components/Page';
import {reactive, ref} from 'vue'
import {OrderedListOutlined} from '@ant-design/icons-vue';
import {VxeGridInstance, VxeGridProps} from 'vxe-table'
import DictMainDrawer from './DictMainDrawer.vue';
import {useDrawer} from '@/components/Drawer';
import {deleteEvent, addEvent, editEvent, createOption} from '@/comps/vxe/list';
import { useGo } from '@/hooks/web/usePage';

const xGrid = ref({} as VxeGridInstance)
const formData = reactive({name: ''})
const go = useGo();

const gridOptions = reactive<VxeGridProps>(createOption('/ass/dict/main', {}, formData, [
  {type: 'checkbox', align: 'center', width: 42, fixed: 'left'},
  {type: 'seq', align: 'center', width: 50, fixed: 'left'},
  {field: 'name', title: '字典名称', width: 300, fixed: 'left', slots: {default: 'name_default'}},
  {field: 'code', title: '字典代码', width: 300},
  {field: 'crtim', title: '创建时间', width: 160},
  {field: 'notes', title: '备注'},
  { title: '操作', width: 60, align: 'center', slots: { default: 'operate' } }
]));

const searchEvent = () => {
  xGrid.value.commitProxy('query')
}

const editData= (id)=>{
  console.log(id)
  go('/ass/dict/data/'+id);
}

//--------------------------------------------------------------------------------------------------
const [registerDrawer, {openDrawer}] = useDrawer();

function handleSuccess() {
  searchEvent();
}
</script>

