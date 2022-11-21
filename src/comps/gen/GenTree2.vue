<template>
  <div class="bg-white m-4 mr-0 overflow-hidden zdept">
    <div class="flex px-2 py-1.5 items-center basic-tree-header">
      <div class="flex flex-1 justify-self-stretch items-center cursor-pointer">
        <vxe-input v-model="demo1.filterName" placeholder="搜索" style="width: 120px" type="type" @keyup="searchEvent"></vxe-input>
<!--        <vxe-button @click="rootClick">根目录</vxe-button>-->
        <vxe-button icon="vxe-icon--refresh" title="刷新" circle @click="refreshClick" style="margin-left: 4px;margin-right: 2px"></vxe-button>
        <vxe-button icon="vxe-icon--dot" title="根目录"  circle @click="rootClick" style="margin-left: 2px;margin-right: 2px"></vxe-button>
        <vxe-button icon="vxe-icon--caret-bottom" title="展开" circle @click="$refs.xDept.setAllTreeExpand(true)" style="margin-left: 2px;margin-right: 2px"></vxe-button>
        <vxe-button icon="vxe-icon--caret-top" title="折叠" circle @click="$refs.xDept.clearTreeExpand()" style="margin-left: 2px;margin-right: 2px"></vxe-button>
<!--        <i class="vxe-icon&#45;&#45;arrow-bottom" @click="$refs.xDept.setAllTreeExpand(true)"></i>-->
<!--        <vxe-button @click="$refs.xDept.setAllTreeExpand(true)">展开</vxe-button>-->
<!--        <vxe-button @click="$refs.xDept.clearTreeExpand()">折叠</vxe-button>-->
      </div>
    </div>

    <!--    <div style="padding: 8px;">-->
    <!--     -->
    <!--&lt;!&ndash;      <vxe-button @click="$refs.xDept.clearTreeExpand()">关闭所有</vxe-button>&ndash;&gt;-->
    <!--    </div>-->
    <hr/>
    <vxe-table
        ref="xDept"
        resizable
        show-overflow
        row-key
        border="none"
        size="mini"
        height="auto"
        highlight-current-row
        highlight-hover-row
        :show-header="false"
        @cell-click="cellClickEvent"
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
<script lang="ts" setup>
import {onMounted, reactive, ref, nextTick} from 'vue'
import {VxeTableEvents, VxeTableInstance} from 'vxe-table'
import {defHttp} from "@/utils/http/axios";
import XEUtils from 'xe-utils'

const emit = defineEmits(['select']);

const xDept = ref({} as VxeTableInstance)
const cellClickEvent: VxeTableEvents.CellClick = ({column, row, triggerTreeNode}) => {
  if (!triggerTreeNode) {
    xDept.value.toggleTreeExpand(row);
    emit('select', {id: row.id, name: row.name});
  }
}

function rootClick(){
  emit('select', null);
}

function refreshClick(){
  fetch();
}

const depna = ref('');

const demo1 = reactive({
  filterName: '',
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
      const $table = xDept.value
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
  demo1.originData = await defHttp.get({url: '/gen/org/dept/tree'});
  handleSearch()
}

onMounted(() => {
  fetch();
})

</script>
<style>
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
