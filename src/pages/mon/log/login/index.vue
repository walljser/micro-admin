<template>
  <PageWrapper class="ztable" contentFullHeight>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <template #tbtns>
        <vxe-input v-model="formData.name" placeholder="输入名称查询"></vxe-input>
        <vxe-button @click="searchEvent" status="primary">查 询</vxe-button>
        <vxe-button @click="deleteEvent($refs.xGrid)">删 除</vxe-button>
        <vxe-button @click="deleteAllEvent($refs.xGrid)">清 空</vxe-button>
      </template>
      <template #name_default="{ row }">
          <span style="cursor:pointer;color: #3e9ece"
                @click="editEvent({id:row.id},openDrawer)">{{ row.name }}</span>
      </template>
    </vxe-grid>
    <View @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { PageWrapper } from "@/components/Page";
import { reactive, ref } from "vue";
import { VxeGridInstance, VxeGridProps } from "vxe-table";
import View from "./view.vue";
import { useDrawer } from "@/components/Drawer";
import { deleteEvent, deleteAllEvent, editEvent, createOption } from "@/comps/vxe/list";
import { useGo } from "@/hooks/web/usePage";

const xGrid = ref({} as VxeGridInstance);
const formData = reactive({ name: "" });
const go = useGo();

const gridOptions = reactive<VxeGridProps>(createOption("/mon/log/login", {}, formData, [
  { type: "checkbox", align: "center", width: 42, fixed: "left" },
  { type: "seq", align: "center", width: 50, fixed: "left" },
  { field: "name", title: "用户姓名", width: 100, fixed: "left", slots: { default: "name_default" } },
  { field: "usnam", title: "用户账号", width: 100, fixed: "left" },
  { field: "crtim", title: "登录时间", width: 150 },
  { field: "ip", title: "登录IP", width: 160 },
  { field: "addre", title: "登录地点", width: 160 },
  { field: "ageos", title: "操作系统", width: 120 },
  { field: "agbro", title: "浏览器", width: 120 },
  { field: "agdet", title: "客户端详情" }
]));

const searchEvent = () => {
  xGrid.value.commitProxy("query");
};

//--------------------------------------------------------------------------------------------------
const [registerDrawer, { openDrawer }] = useDrawer();

function handleSuccess() {
  searchEvent();
}
</script>

