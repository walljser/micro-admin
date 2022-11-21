<template>
  <div class="bg-white overflow-hidden ztree">
    <div style="margin-bottom: 4px">
      <vxe-input v-model="tdata.filterName" placeholder="搜索" type="type" @keyup="searchEvent"></vxe-input>
      <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开</vxe-button>
      <vxe-button @click="$refs.xTree.clearTreeExpand()">折叠</vxe-button>
      <vxe-button @click="getMenus">测试</vxe-button>

    </div>

    <div style="border: 1px solid #ddd">
      <vxe-table
          ref="xTree"
          resizable
          show-overflow
          row-key
          row-id="id"
          border="none"
          size="mini"
          height="600px"
          highlight-current-row
          highlight-hover-row
          :show-header="false"
          :checkbox-config="{labelField: 'name',checkRowKeys: menuArr,checkStrictly: true}"
          :row-config="{height: 26}"
          :tree-config="tdata.tableTreeConfig"
          :data="tdata.tableData">
        <vxe-column type="checkbox" tree-node></vxe-column>
      </vxe-table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref, nextTick, computed, watch} from 'vue'
import {VXETable, VxeTableEvents, VxeTableInstance} from 'vxe-table'
import {defHttp} from "@/utils/http/axios";
import XEUtils from 'xe-utils'

const emit = defineEmits(['select']);

const xTree = ref({} as VxeTableInstance);
const cellClickEvent: VxeTableEvents.CellClick = ({column, row, triggerTreeNode}) => {
  if (!triggerTreeNode) {
    xTree.value.toggleTreeExpand(row);
    emit('select', {id: row.id, name: row.name});
  }
}

const props = defineProps({
  menuArr: { type: Array },
});

// watch(props.menuArr, (ovalue, nvalue) => {
//   console.log(ovalue);
//   console.log(nvalue);
//   xTree.value.reloadData(tdata.originData);
// });


const tdata = reactive({
  filterName: '',
  tableData: [] as any[],
  originData: [] as any[],
  tableTreeConfig: {
    children: 'children',
    rowKey: 'id',
    indent: 15,
    parentKey: 'pid',
    iconOpen: 'vxe-icon--arrow-bottom',
    iconClose: 'vxe-icon--arrow-right',
  }
})

const handleSearch = () => {
  const filterName = XEUtils.toValueString(tdata.filterName).trim()
  if (filterName) {
    const options = {children: 'children'}
    const searchProps = ['name']
    tdata.tableData = XEUtils.searchTree(tdata.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
    nextTick(() => {
      xTree.value.setAllTreeExpand(true)
    })
  } else {
    // console.log(tdata.originData)
    tdata.tableData = tdata.originData
  }
}

const searchEvent = XEUtils.debounce(function () {
  handleSearch()
}, 500, {leading: false, trailing: true})


async function fetch() {
  tdata.originData = await defHttp.get({url: '/sys/perm/menu/tree'});
  handleSearch();
  // const { menus } = props;
  // if (menus && menus.length > 0) {
  //   for (const menu of menus) {
  //     menuArr.value.push(menu.id);
  //   }
  // }
}

onMounted(() => {
  // console.log("创建");
  fetch();
})


function getMenus() {
  const $tree = xTree.value;
  const selectRecords = $tree.getCheckboxRecords();
  const selectRecord2s = $tree.getCheckboxIndeterminateRecords();//半选的
  console.log(selectRecords);
  const menus = [] as any;
  // for (const selectRecord2 of selectRecord2s) {
  //   menus.push({id: selectRecord2.id, name: selectRecord2.name});
  // }

  for (const selectRecord of selectRecords) {
    menus.push({id: selectRecord.id, name: selectRecord.name});
  }
  return menus;
}

function reloadTree() {
  xTree.value.reloadData(tdata.originData);
}

// 重点！！这里需要使用defineExpose暴露出去
defineExpose({
  getMenus,reloadTree
})


</script>
<style>

</style>
