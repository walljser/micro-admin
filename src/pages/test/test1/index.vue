<template>
 <div style="margin: 20px">
   <vxe-button @click="$refs.xTable1.setAllTreeExpand(true)">展开所有</vxe-button>
   <vxe-button @click="$refs.xTable1.clearTreeExpand()">关闭所有</vxe-button>

   <vxe-table
     ref="xTable1"
     resizable
     show-overflow
     row-key
     border="none"
     size="mini"
     height="600"
     highlight-current-row
     highlight-hover-row
     :show-header="false"
     @cell-click="cellClickEvent"
     :row-config="{height: 200}"
     :tree-config="demo1.tableTreeConfig"
     :data="demo1.tableData">
     <vxe-column field="name" title="Name" tree-node>
       <template #default="{ row }">
         <span >{{ row.name }}</span>
       </template>
     </vxe-column>
<!--     <vxe-column field="size" title="Size"></vxe-column>-->
<!--     <vxe-column field="type" title="Type"></vxe-column>-->
<!--     <vxe-column field="date" title="Date"></vxe-column>-->
   </vxe-table>


 </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {VxeTableEvents, VxeTableInstance} from 'vxe-table'
import {defHttp} from "@/utils/http/axios";

const xTable1 = ref({} as VxeTableInstance)
const cellClickEvent: VxeTableEvents.CellClick = ({ column,row,triggerTreeNode}) => {
  console.log(row)
  if(!triggerTreeNode){
    xTable1.value.toggleTreeExpand(row);
  }
}



const demo1 = reactive({
  tableData:[],
  // tableData: [
  //   { id: 10000, parentId: null, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
  //   { id: 432155, parentId: 10000, name: 'vxe-table xx', type: 'mp3', size: 1024, date: '2020-08-01' },
  //   { id: 43432121, parentId: 10000, name: 'vxe-table ff', type: 'mp3', size: 1024, date: '2020-08-01' },
  //   { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
  //   { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
  //   { id: 20045, parentId: 24300, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
  //   { id: 10053, parentId: 24300, name: 'vxe-table 从入门到放弃96', type: 'avi', size: null, date: '2021-04-01' },
  //   { id: 24330, parentId: 10053, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
  //   { id: 21011, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
  //   { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
  //   { id: 23677, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 23671, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 23672, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 23681, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 23682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 24555, parentId: null, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' },
  //   { id: 24566, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 1, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 2, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 3, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 4, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 5, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 6, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 7, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 8, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 9, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 10, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 11, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 12, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 13, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 14, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 15, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 16, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 17, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 18, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 19, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 20, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 21, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 22, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 23, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 24, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 25, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 26, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 27, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 28, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 29, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 30, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 31, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 131, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 132, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 133, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 134, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 135, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 136, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 137, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 138, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 139, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 140, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 141, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 142, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 143, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 144, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 145, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 146, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 147, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 148, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 149, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 150, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 151, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 152, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  //   { id: 153, parentId: 31, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  // ],
  tableTreeConfig: {
    children: 'children',
    // transform: true,
    rowKey: 'id',
    // line: true,
    indent:15,
    // parentKey: 'parentId',
    parentKey: 'pid',
    iconOpen: 'vxe-icon--arrow-bottom ',
    iconClose: 'vxe-icon--arrow-right '
  }
})


async function  fetch(){
  demo1.tableData=await defHttp.get({url: '/gen/org/dept/tree'});
}

onMounted(() => {
  fetch();
})


//  :tree-config="{transform: true, rowKey: 'id', parentKey: 'parentId'}"
</script>
<style>
.vxe-body--row{
  cursor:pointer;
}
</style>
