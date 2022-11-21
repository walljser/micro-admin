<template>

  <vxe-pulldown ref="xDown3" destroy-on-close style="width: 100%">
    <template #default>
      <vxe-input v-model="pname" placeholder="可搜索的下拉框" suffix-icon="vxe-icon--caret-bottom"
                 @click="clickEvent3" @keyup="searchEvent"></vxe-input>
    </template>
    <template #dropdown>
      <div class="my-dropdown3" style="padding-right: 3px">
        <div style="border: 1px solid #DADCE0;" class="zmenu">
          <vxe-table ref="xTree" resizable show-overflow row-key
                     border="none" size="mini" height="300px" highlight-current-row highlight-hover-row
                     :show-header="false" @cell-click="cellClickEvent" :row-config="{height: 26}"
                     :tree-config="demo1.tableTreeConfig" :data="demo1.tableData">
            <vxe-column field="name" title="Name" tree-node>
              <template #default="{ row }">
                <span>{{ row.name }}</span>
              </template>
            </vxe-column>
          </vxe-table>
        </div>
      </div>
    </template>
  </vxe-pulldown>


</template>
<script lang="ts" setup>
import {onMounted, reactive, ref, nextTick} from 'vue'
import {VxePulldownInstance, VxeTableEvents, VxeTableInstance} from 'vxe-table'
import {defHttp} from "@/utils/http/axios";
import XEUtils from 'xe-utils'

const props = defineProps({
  pname: String,
});

const emit = defineEmits(['select']);

const xTree = ref({} as VxeTableInstance)
const cellClickEvent: VxeTableEvents.CellClick = ({row, triggerTreeNode}) => {
  if (!triggerTreeNode) {
    xDown3.value.hidePanel();
    emit('select', {id: row.id, name: row.name});
  }
}

const demo1 = reactive({
  filterName: '',
  tableData: [] as any[],
  originData: [] as any[],
  tableTreeConfig: {
    children: 'children',
    rowKey: 'id',
    // indent: 15,
    parentKey: 'pid',
    iconOpen: 'vxe-icon--arrow-bottom',
    iconClose: 'vxe-icon--arrow-right'
  }
})

const xDown3 = ref({} as VxePulldownInstance)

const clickEvent3 = () => {
  const $pulldown3 = xDown3.value;
  $pulldown3.togglePanel();
}


const searchEvent = XEUtils.debounce(function () {
  handleSearch()
}, 500, {leading: false, trailing: true})


const handleSearch = () => {
  const filterName = XEUtils.toValueString(props.pname).trim()
  if (filterName) {
    const options = {children: 'children'}
    const searchProps = ['name']
    demo1.tableData = XEUtils.searchTree(demo1.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
    nextTick(() => {
      const $table = xTree.value
      $table.setAllTreeExpand(true)
    })
  } else {
    demo1.tableData = demo1.originData
  }
}


async function fetch() {
  demo1.originData = await defHttp.get({url: '/sys/portal/menu/tree?type=DM'});
  handleSearch()
}

onMounted(() => {
 // console.log("创建了")
  fetch();
})

</script>
<style>
.zmenu .vxe-body--row {
  cursor: pointer;
}

.zmenu ::-webkit-scrollbar-track {
  background-color: #FFFFFF !important;
}

.zmenu .vxe-table--render-default.size--mini .vxe-body--column.col--ellipsis {
  height: 28px;
}
</style>
