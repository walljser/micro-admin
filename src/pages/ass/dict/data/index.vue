<template>
  <PageWrapper class="ztable" contentFullHeight>
    <vxe-grid ref='xGrid' v-bind="gridOptions">
      <template #tbtns>
        <vxe-input v-model="formData.name" placeholder="输入名称查询"></vxe-input>
        <vxe-button @click="searchEvent" status="primary">查 询</vxe-button>
        <vxe-button @click="addEvent({cateid:cateid},openDrawer)">新 增</vxe-button>
        <vxe-button @click="deleteEvent($refs.xGrid)">删 除</vxe-button>
      </template>
      <template #name_default="{ row }">
          <span style="cursor:pointer;color: #3e9ece"
                @click="editEvent({id:row.id},openDrawer)">{{ row.name }}</span>
      </template>
    </vxe-grid>
    <DictDataDrawer @register="registerDrawer" @success="handleSuccess"/>
  </PageWrapper>
</template>
<script lang="ts">
export default {name: 'AssDictCate', inheritAttrs: false}
</script>
<script lang="ts" setup>
import {PageWrapper} from '@/components/Page';
import {reactive, ref} from 'vue'
import {VxeGridInstance, VxeGridProps} from 'vxe-table'
import DictDataDrawer from './DictDataDrawer.vue';
import {useDrawer} from '@/components/Drawer';
import {deleteEvent, addEvent, editEvent, createOption} from '@/comps/vxe/list';
import { useRoute } from 'vue-router';
const route = useRoute();
const cateid = ref(route.params?.id);

const xGrid = ref({} as VxeGridInstance)
const formData = reactive({name: '',cateid:cateid})

const gridOptions = reactive<VxeGridProps>(createOption('/ass/dict/data', {}, formData, [
  {type: 'checkbox', align: 'center', width: 42, fixed: 'left'},
  {type: 'seq', align: 'center', width: 50, fixed: 'left'},
  {field: 'name', title: '字典选项名称', width: 300, fixed: 'left', slots: {default: 'name_default'}},
  {field: 'code', title: '字典选项编码', width: 300},
  {field: 'notes', title: '备注'},
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

