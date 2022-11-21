<template>
  <vxe-modal ref="xModal" show-footer title="弹框选择" width="400" height="560"
             mask-closable show-zoom resize remember>
    <template #default>
      <div class="zdept" style="height: 450px">
        <div class="flex px-2 py-1.5 items-center basic-tree-header">
          <div class="flex flex-1 justify-self-stretch items-center cursor-pointer">
            <vxe-input v-model="demo1.filterName" placeholder="搜索" style="width: 200px" type="type" @keyup="searchEvent"></vxe-input>
            <vxe-button icon="vxe-icon--refresh" title="刷新" circle @click="refreshClick" style="margin-left: 4px;margin-right: 2px"></vxe-button>
<!--            <vxe-button icon="vxe-icon&#45;&#45;dot" title="根目录" circle @click="rootClick" style="margin-left: 2px;margin-right: 2px"></vxe-button>-->
<!--            <vxe-button icon="vxe-icon&#45;&#45;caret-bottom" title="展开" circle @click="$refs.xTree.setAllTreeExpand(true)" style="margin-left: 2px;margin-right: 2px"></vxe-button>-->
<!--            <vxe-button icon="vxe-icon&#45;&#45;caret-top" title="折叠" circle @click="$refs.xTree.clearTreeExpand()" style="margin-left: 2px;margin-right: 2px"></vxe-button>-->
          </div>
        </div>
        <hr/>
        <vxe-table
            ref="xTree"
            resizable
            show-overflow
            row-key
            border="none"
            size="mini"
            height="400px"
            highlight-current-row
            highlight-hover-row
            :show-header="false"
            @cell-click="cellClickEvent"
            @cell-dblclick="cellDblClickEvent"
            :row-config="{height: 26}"
            :tree-config="demo1.tableTreeConfig"
            :data="demo1.tableData">
          <vxe-column field="name" title="Name" tree-node>
            <template #default="{ row }">
              <span>{{ row.name }}</span>
            </template>
          </vxe-column>
        </vxe-table>
      </div>
    </template>
    <template #footer>
      <vxe-button status="primary" @click="confirm">提交</vxe-button>
      <vxe-button @click="close">关闭</vxe-button>
      <vxe-button @click="cancel">取消选择</vxe-button>
    </template>
  </vxe-modal>
</template>


<script lang="ts" setup>
import {VxeModalInstance} from "vxe-table";
import {onMounted, reactive, ref, nextTick} from 'vue'
import {VxeTableEvents, VxeTableInstance} from 'vxe-table'
import {defHttp} from "@/utils/http/axios";
import XEUtils from 'xe-utils'

let url="";
const emit = defineEmits(['select']);
const xTree = ref({} as VxeTableInstance)
const cellClickEvent: VxeTableEvents.CellClick = ({column, row, triggerTreeNode}) => {
  if (!triggerTreeNode) {
    xTree.value.toggleTreeExpand(row);
  }
}
const cellDblClickEvent: VxeTableEvents.CellDblclick = () => {
  const $modal = xModal.value;
  const $tree = xTree.value;
  const record=$tree.getCurrentRecord();
  emit('select', {id: record.id, name: record.name,type:record.type});
  $modal.close();
}


function refreshClick() {
  fetch();
}

const depna = ref('');

const demo1 = reactive({
  filterName: '',
  value8: false,
  tableData: [] as any[],
  originData: [] as any[],
  tableTreeConfig: {
    children: 'children',
    rowKey: 'id',
    indent: 15,
    parentKey: 'pid',
    iconOpen: 'vxe-icon--arrow-bottom',
    iconClose: 'vxe-icon--arrow-right'
  }
})

const handleSearch = () => {
  const filterName = XEUtils.toValueString(demo1.filterName).trim()
  if (filterName) {
    const options = {children: 'children'}
    const searchProps = ['name']
    demo1.tableData = XEUtils.searchTree(demo1.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
    // 搜索之后默认展开所有子节点
    nextTick(() => {
      const $table = xTree.value
      $table.setAllTreeExpand(true)
    })
  } else {
    demo1.tableData = demo1.originData
  }
}

// 创建一个防防抖函数，调用频率间隔 500 毫秒
const searchEvent = XEUtils.debounce(function () {
  handleSearch()
}, 500, {leading: false, trailing: true})


async function fetch() {
  demo1.originData = await defHttp.get({url: url});
  handleSearch()
}
//
// onMounted(() => {
//   fetch();
// })

const xModal = ref({} as VxeModalInstance);

function open(zdata:any) {
  url=zdata.url;
  const $modal = xModal.value;
  fetch();
  $modal.open();
}

function close(){
  const $modal = xModal.value;
  $modal.close();
}

function cancel(){
  const $modal = xModal.value;
  const $tree = xTree.value;
  const record=$tree.getCurrentRecord();
  emit('select', null);
  $modal.close();
}

function confirm(){
  const $modal = xModal.value;
  const $tree = xTree.value;
  const record=$tree.getCurrentRecord();
  emit('select', {id: record.id, name: record.name,type:record.type});
  $modal.close();
}


defineExpose({open});


</script>

<style lang="less">
.zdept .vxe-body--row {
  cursor: pointer;
}

.zdept ::-webkit-scrollbar-track {
  background-color: #FFFFFF !important;
}

.zdept .vxe-table--render-default.size--mini .vxe-body--column.col--ellipsis{
  height: 28px;
}
</style>
