<template>
  <PageWrapper class="ztable" contentFullHeight>

    <vxe-toolbar ref="xToolbar" custom>
      <template #buttons>
        <vxe-input v-model="tdata.filterName" placeholder="请输入名称" @keyup="searchEvent"></vxe-input>
        <vxe-button status="primary">查 询</vxe-button>
        <vxe-button @click="addEvent({},openDrawer)">新 增</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展 开</vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">折 叠</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table ref="xTree" max-height="600" :loading="tdata.loading" :data="tdata.tableData" :tree-config="{children: 'children'}">
      <vxe-column field="name" title="名称" tree-node>
        <template #default="{ row }">
          <span style="cursor:pointer;color: #972fcb"
                @click="$refs.xTree.toggleTreeExpand(row)">{{ row.name }}</span>
        </template>
      </vxe-column>

      <vxe-column field="date" title="修改日期" width="260">

      </vxe-column>

      <vxe-column title="操作" width="100" show-overflow header-align="center" align="right">
        <template #default="{ row }">
          <PlusSquareOutlined @click="addEvent({pid:row.id,pname:row.name},openDrawer)" style="font-size: 15px;margin-left: 10px;color: #52C41A"/>
          <FormOutlined @click="editEvent({id:row.id},openDrawer)" style="font-size: 15px;margin-left: 11px;color: #2874C5"/>
          <DeleteOutlined  @click="removeEvent(row.id)" style="font-size: 15px;margin-left: 10px;color: #ED6F6F"/>
        </template>
      </vxe-column>

    </vxe-table>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess"/>
  </PageWrapper>
</template>
<script lang="ts">
export default {name: 'SysPermMenu', inheritAttrs: false, customOptions: {}}
</script>
<script lang="ts" setup>
import {DeleteOutlined, FormOutlined, PlusSquareOutlined} from '@ant-design/icons-vue';
import {PageWrapper} from '@/components/Page';
import {nextTick, onMounted, reactive, ref} from 'vue'
import {VXETable, VxeTableInstance, VxeToolbarInstance} from 'vxe-table'
import MenuDrawer from './MenuDrawer.vue';
import {useDrawer} from '@/components/Drawer';
import {defHttp} from "@/utils/http/axios";
import XEUtils from 'xe-utils'
import {addEvent, editEvent} from '@/comps/vxe/list';


const xTree = ref({} as VxeTableInstance)
const xToolbar = ref({} as VxeToolbarInstance);

const tdata = reactive({
  filterName: '',
  loading: false,
  originData: [] as any[],
  tableData: [] as any[],
  formData: {
    name: '',
    sex: ''
  },
})

const handleSearch = () => {
  const filterName = XEUtils.toValueString(tdata.filterName).trim()
  if (filterName) {
    const options = {children: 'children'}
    const searchProps = ['name']
    tdata.tableData = XEUtils.searchTree(tdata.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
    nextTick(() => {
      const $table = xTree.value
      $table.setAllTreeExpand(true)
    })
  } else {
    tdata.tableData = tdata.originData
  }
}

const searchEvent = XEUtils.debounce(function () {
  handleSearch()
}, 500, {leading: false, trailing: true})

async function fetch() {
  tdata.originData = await defHttp.get({url: '/oa/flow/cate/tree'});
  handleSearch()
}

 onMounted(async () => {
  await fetch();
  nextTick(() => {
    const $table = xTree.value
    const $toolbar = xToolbar.value
    $table.connect($toolbar)
  })
})

async function removeEvent(id){
  const type = await VXETable.modal.confirm('您确定要删除吗？');
  if (type === 'confirm') {
    await defHttp.delete({url: '/oa/flow/cate/' + id});
    await fetch();
  }
}

//--------------------------------------------------------------------------------------------------
const [registerDrawer, {openDrawer}] = useDrawer();

function handleSuccess() {
  fetch();
}
</script>

