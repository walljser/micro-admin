<template>
  <PageWrapper class="ztable" contentFullHeight>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #tbtns>
        <vxe-input v-model="formData.name" placeholder="输入名称查询"></vxe-input>
        <vxe-button @click="searchEvent" status="primary">查 询</vxe-button>
        <vxe-button @click="openLog" status="success">日 志</vxe-button>
        <vxe-button @click="addEvent({},openDrawer)">新 增</vxe-button>
        <vxe-button @click="deleteEvent($refs.xGrid)">删 除</vxe-button>
        <vxe-button @click="startEvent($refs.xGrid)">启 用</vxe-button>
        <vxe-button @click="stopEvent($refs.xGrid)">禁 用</vxe-button>
      </template>
      <template #name_default="{ row }">
          <span style="cursor:pointer;color: #3e9ece"
                @click="editEvent({id:row.id},openDrawer)">{{ row.name }}</span>
      </template>
      <template #avtag_default="{ row }">
        <span v-show="row.avtag===true" class="ant-tag ant-tag-success">启用</span>
        <span v-show="row.avtag===false" class="ant-tag ant-tag-warning">禁用</span>
      </template>
      <template #operate="{ row }">
        <RightSquareTwoTone @click="doOnce(row.id)" style="font-size: 15px;" title="立即执行一次" />
      </template>
    </vxe-grid>
    <JobMainDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
export default { name: "SysJobMain", inheritAttrs: false };
</script>
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { reactive, ref } from "vue";
import { RightSquareTwoTone } from "@ant-design/icons-vue";
import { VxeGridInstance, VxeGridProps, VXETable } from "vxe-table";
import JobMainDrawer from "./JobMainDrawer.vue";
import { useDrawer } from "@/components/Drawer";
import { deleteEvent, addEvent, editEvent } from "@/comps/vxe/list";
import { useGo } from "@/hooks/web/usePage";
import { defHttp } from "@/utils/http/axios";
import { buildUUID } from "@/utils/uuid";

const xGrid = ref({} as VxeGridInstance);
const formData = reactive({ name: "" });
const go = useGo();

const gridOptions = reactive<VxeGridProps>(
  {
    id: "/mon/job/main", highlightHoverRow: true, checkboxConfig: {}, height: "auto",
    pagerConfig: { pageSize: window.innerHeight < 610 ? 8 : window.innerHeight > 900 ? 16 : 10 },
    toolbarConfig: {
      slots: { buttons: "tbtns" }
      // refresh: true, import: true, export: true, print: true, zoom: true, custom: true
    },
    proxyConfig: {
      ajax: {
        query: ({ page }) => {
          const qparams: any = Object.assign({}, formData);
          qparams.page = `${page.currentPage}`;
          qparams.pageSize = `${page.pageSize}`;
          return defHttp.get({
            url: "/mon/job/main",
            params: qparams
          });
        }
      }
    },
    columns: [
      { type: "checkbox", align: "center", width: 42, fixed: "left" },
      { type: "seq", align: "center", width: 50, fixed: "left" },
      { field: "name", title: "任务名称", width: 200, fixed: "left", slots: { default: "name_default" } },
      { field: "code", title: "任务代码", width: 200 },
      { field: "reurl", title: "请求地址", width: 200 },
      { field: "cron", title: "执行表达式", width: 200 },
      { field: "crtim", title: "创建时间", width: 140 },
      { field: "avtag", title: "状态", width: 60, align: "center", slots: { default: "avtag_default" } },
      { field: "notes", title: "备注" },
      { title: "操作", width: 60, align: "center", slots: { default: "operate" } }
    ]
  }
);

const searchEvent = () => {
  xGrid.value.commitProxy("query");
};

const doOnce = async (id) => {
  const ask = await VXETable.modal.confirm("确定立即执行一次吗？");
  if (ask === "confirm") {
    await defHttp.post({ url: "/mon/job/main/once?id=" + id });
  }
};

const startEvent = async ($grid) => {
  let url = $grid.id;
  if ($grid.params && $grid.params.url) {
    url = $grid.params.url;
  }
  const selectRecords = $grid.getCheckboxRecords();
  if (selectRecords.length == 0) {
    await VXETable.modal.message({ content: "请选择后再进行启动", status: "warning" });
    return;
  }
  let ids = "";
  for (const selectRecord of selectRecords) {
    ids += selectRecord.id + ",";
  }
  const type = await VXETable.modal.confirm("您确定要启动吗？");
  if (type === "confirm") {
    await defHttp.post({ url: url + "/start?ids=" + ids.substr(0, ids.length - 1) });
    await $grid.commitProxy("query");
  }
};

const stopEvent = async ($grid) => {
  let url = $grid.id;
  if ($grid.params && $grid.params.url) {
    url = $grid.params.url;
  }
  const selectRecords = $grid.getCheckboxRecords();
  if (selectRecords.length == 0) {
    await VXETable.modal.message({ content: "请选择后再进行禁用", status: "warning" });
    return;
  }
  let ids = "";
  for (const selectRecord of selectRecords) {
    ids += selectRecord.id + ",";
  }
  const type = await VXETable.modal.confirm("您确定要禁用吗？");
  if (type === "confirm") {
    await defHttp.post({ url: url + "/stop?ids=" + ids.substr(0, ids.length - 1) });
    await $grid.commitProxy("query");
  }
};

//--------------------------------------------------------------------------------------------------
const [registerDrawer, { openDrawer }] = useDrawer();

function handleSuccess() {
  searchEvent();
}

const openLog=()=>{
  go('/mon/job/log');
}
</script>

