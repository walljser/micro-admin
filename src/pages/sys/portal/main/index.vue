<template>
  <div class="v-list">
    <div class="v-list-head">
      <div class='zjustify'>
        <div>
          <a-input @keyup.enter="listQuery($refs.gridRef)" v-model:value="state.form.name"
                   placeholder="输入名称回车查询" class="list-search" />
          <a-button @click="listQuery($refs.gridRef)" class="v-btn-primary">查询</a-button>
        </div>
        <div>
          <a-button @click="tabAdd(go,state.url)" class="v-btn-success" style="margin-right: 8px;">
            新增
          </a-button>
          <a-button @click="listDelete(state.url,$refs.gridRef)" class="v-btn-danger">删除</a-button>
        </div>
      </div>
    </div>
    <div class="v-list-body" :style="{ height: `calc(100vh - 141px`}">
      <vxe-grid ref="gridRef" v-bind="gridOptions">
        <template #name_default="{ row }">
          <span @click="tabEdit(go,state.url,'?id='+row.id)" style="cursor: pointer;color: #3e9ece">
            {{ row.name }}
          </span>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs } from "vue";
import { VxeGridProps } from "vxe-table";
import { listInit, listQuery, listDelete, tabAdd, tabEdit } from "@/comps/page/index";
import { useGo } from "@/hooks/web/usePage";

const go = useGo();

const state = reactive({
  url: "/sys/portal/main", moreParams: false,
  form: {}
});

const { form } = toRefs(state);

const gridOptions = reactive<VxeGridProps>({
  columns: [
    { type: "checkbox", align: "center", width: 42, fixed: "left" },
    { type: "seq", align: "center", width: 50, fixed: "left" },
    {
      field: "name", title: "门户名称", width: 300,
      fixed: "left", slots: { default: "name_default" }
    },
    { field: "crtim", title: "创建时间", width: 160 },
    { field: "notes", title: "备注" }
  ]
});

onMounted(() => {
  listInit(state, gridOptions);
});


</script>

