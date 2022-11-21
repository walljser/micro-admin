<template>
  <div class="v-list">
    <div class="v-list-head" style="padding-top: 0;padding-bottom: 0;">
      <vxe-toolbar ref="xToolbar" custom style="">
        <template #buttons>
          <vxe-input v-model="tdata.filterName" placeholder="请输入名称"
                     @keyup="searchEvent"></vxe-input>
          <vxe-button status="primary">查 询</vxe-button>
          <vxe-button @click="editRef.open({})">新 增</vxe-button>
          <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展 开</vxe-button>
          <vxe-button @click="$refs.xTree.clearTreeExpand()">折 叠</vxe-button>
        </template>
      </vxe-toolbar>
    </div>
    <div class="v-list-body" :style="{ height: `calc(100vh - 141px`}">
      <vxe-table ref="xTree" max-height="600" :loading="tdata.loading" :data="tdata.tableData"
                 :tree-config="{children: 'children'}">
        <vxe-column field="name" title="名称" tree-node>
          <template #default="{ row }">
          <span style="cursor:pointer;color: #3e9ece"
                @click="$refs.xTree.toggleTreeExpand(row)">{{ row.name }}</span>
          </template>
        </vxe-column>

        <vxe-column field="notes" title="备注" width="260"/>

        <vxe-column field="crtim" title="创建时间" width="140"/>

        <vxe-column title="操作" width="100" show-overflow header-align="center" align="right">
          <template #default="{ row }">
            <PlusSquareOutlined @click="editRef.open({pid:row.id})"
                                style="font-size: 15px;margin-left: 10px;color: #52C41A" />
            <FormOutlined @click="editRef.open({id:row.id})"
                          style="font-size: 15px;margin-left: 11px;color: #2874C5" />
            <DeleteOutlined @click="removeEvent(row.id)"
                            style="font-size: 15px;margin-left: 10px;color: #ED6F6F" />
          </template>
        </vxe-column>

      </vxe-table>
    </div>
    <Edit ref="editRef" @close="fetch" />
  </div>
</template>
<script lang="ts" setup>
import { DeleteOutlined, FormOutlined, PlusSquareOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive, ref, nextTick } from "vue";
import { VXETable, VxeTableInstance, VxeToolbarInstance } from "vxe-table";
import { useGo } from "@/hooks/web/usePage";
import Edit from "./edit.vue";
import XEUtils from "xe-utils";
import { defHttp } from "@/utils/http/axios";

const go = useGo();

const editRef = ref();

const xTree = ref({} as VxeTableInstance);
const xToolbar = ref({} as VxeToolbarInstance);

const tdata = reactive({
  filterName: "",
  loading: false,
  originData: [] as any[],
  tableData: [] as any[],
  formData: {
    name: "",
    sex: ""
  }
});

const handleSearch = () => {
  const filterName = XEUtils.toValueString(tdata.filterName).trim();
  if (filterName) {
    const options = { children: "children" };
    const searchProps = ["name"];
    tdata.tableData = XEUtils.searchTree(tdata.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options);
    nextTick(() => {
      const $table = xTree.value;
      $table.setAllTreeExpand(true);
    });
  } else {
    tdata.tableData = tdata.originData;
  }
};

const searchEvent = XEUtils.debounce(function() {
  handleSearch();
}, 500, { leading: false, trailing: true });

async function fetch() {
  tdata.originData = await defHttp.get({ url: "/my/demo/cate/tree" });
  handleSearch();
}

onMounted(async () => {
  await fetch();
  nextTick(() => {
    const $table = xTree.value;
    const $toolbar = xToolbar.value;
    $table.connect($toolbar);
  });
});


async function removeEvent(id) {
  const type = await VXETable.modal.confirm("您确定要删除吗？");
  if (type === "confirm") {
    await defHttp.delete({ url: "/my/demo/cate/" + id });
    await fetch();
  }
}

</script>

