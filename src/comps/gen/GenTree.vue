<template>
  <div class="v-tree" style="height: 100%;overflow: hidden;">
    <div class="v-tree-head">
      <div class='v-tree-head-flex'>
        <div class='v-tree-head-left'>
          <a-input v-model:value="demo1.filterName" placeholder="输入名称查询" @keyup="handleSearch"/>
        </div>
        <div class='v-tree-head-right'>
          <Dropdown>
            <template #overlay>
              <Menu @click="handleMenuClick">
                <MenuItem key="1">
                  全部展开
                </MenuItem>
                <MenuItem key="2">
                  全部折叠
                </MenuItem>
                <MenuItem key="3">
                  根目录
                </MenuItem>
                <MenuItem key="4">
                  刷新
                </MenuItem>
              </Menu>
            </template>
            <a-button class="v-tree-more">
              <EllipsisOutlined :style="{fontSize: '18px'}"/>
            </a-button>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="v-tree-body" :style='{ height: `calc(100vh - 141px`}'>
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
  </div>
</template>
<script lang="ts" setup>
import {EllipsisOutlined} from '@ant-design/icons-vue';
import {Dropdown, Menu, MenuItem} from 'ant-design-vue';

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


const props = defineProps({
  url: String,
  maInit: Boolean,
});



async function fetch() {
  demo1.originData = await defHttp.get({url: props.url});
  handleSearch()
}

onMounted(() => {
  fetch();
})

const handleMenuClick=(item)=>{
  if(item.key=='1'){
    xDept.value.setAllTreeExpand(true);
  }else if(item.key=='2'){
    xDept.value.clearTreeExpand();
  }else if(item.key=='3'){
    emit('select', null);
  }else if(item.key=='4'){
    fetch();
  }
}


</script>
<style>
.v-tree {
  background-color: white;
  margin: 6px 0 6px 6px;
}

.v-tree .v-tree-head {
  border-left: 1px solid #e4e7ed;
  border-right: 1px solid #e4e7ed;
  border-top: 1px solid #e4e7ed;
  height: 49px;
  padding: 8px;
}

.v-tree .v-tree-body {
  border: 1px solid #e4e7ed;
  padding: 8px;
}

.v-tree .v-tree-head-flex {
  display: flex;
}

.v-tree .v-tree-head-left {
  flex: 1;
  width: 100%;
}

.v-tree .v-tree-head-right {
  width: 42px;
  min-width: 42px;
}

.v-tree .v-tree-more {
  margin-left: 8px;
  width: 34px;
  text-align: center;
  padding-left: 8px;
  border-radius: 4px;
}

.v-tree .v-tree-more:hover {
  background: #ebf5ff
}


.v-tree .v-tree-body {
  overflow: hidden;
  padding: 0;
}

.v-tree-body .vxe-body--row {
  cursor: pointer;
}

.v-tree-body ::-webkit-scrollbar-track {
  background-color: #FFFFFF !important;
}

.v-tree-body .vxe-table--render-default.size--mini .vxe-body--column.col--ellipsis {
  height: 28px;
}

</style>
