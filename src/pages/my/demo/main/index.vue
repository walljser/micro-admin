<template>
  <div class="v-list">
    <div class="v-list-head">
      <div class="zjustify">
        <div>
          <a-input @keyup.enter="listQuery($refs.gridRef)" v-model:value="state.form.name"
                   placeholder="输入名称回车查询" class="list-search" />
          <a-button @click="listQuery($refs.gridRef)" class="v-btn-primary">查询</a-button>
          <a-button class="v-btn-primary more-button" @click="state.moreParams=!state.moreParams">
            <DownOutlined v-if="!state.moreParams" />
            <UpOutlined v-if="state.moreParams" />
          </a-button>
        </div>
        <div>
          <a-button @click="tabAdd(go,state.url)" class="v-btn-success" style="margin-right: 8px;">
            新增
          </a-button>
          <a-button @click="listDelete(state.url,$refs.gridRef)" class="v-btn-danger">删除</a-button>
        </div>
      </div>
      <div v-show="state.moreParams" class="more-params" ref="moreParamsRef">
        <a-form ref="formRef" :model="form" layout="inline" :label-col="{style: {width: '80px'}}">
          <a-form-item label="更多参数1" style="margin-bottom: 10px">
            <a-input v-model:value="form.test1" />
          </a-form-item>
          <a-form-item label="更多参数2" style="margin-bottom: 10px">
            <a-input v-model:value="form.test2" />
          </a-form-item>
          <a-form-item label="更多参数3" style="margin-bottom: 10px">
            <a-input v-model:value="form.test3" />
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="v-list-body" :style="{ height: `calc(100vh - 141px`}">
      <vxe-grid ref="gridRef" v-bind="gridOptions">
        <template #name_default="{ row }">
          <span @click="tabEdit(go,state.url,'?id='+row.id)" style="cursor:pointer;color: #3e9ece">
            {{ row.name }}
          </span>
        </template>
      </vxe-grid>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { onMounted, reactive, toRefs } from "vue";
import { VxeGridProps } from "vxe-table";
import { listInit, listQuery, listDelete, tabAdd, tabEdit } from "@/comps/page/index";
import { useGo } from "@/hooks/web/usePage";

const go = useGo();

const state = reactive({
  url: "/my/demo/main", moreParams: false,
  form: {}
});

const { form } = toRefs(state);

const gridOptions = reactive<VxeGridProps>({
  columns: [
    { type: "checkbox", align: "center", width: 42, fixed: "left" },
    { type: "seq", align: "center", width: 50, fixed: "left" },
    {
      field: "name",
      title: "DEMO名称",
      width: 300,
      fixed: "left",
      slots: { default: "name_default" }
    },
    { field: "crtim", title: "创建时间", width: 160 },
    { field: "notes", title: "备注" }
  ]
});

onMounted(() => {
  listInit(state, gridOptions);
});


</script>

