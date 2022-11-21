<template>
  <div class="v-list">
    <div class="v-list-head">
      <div class='zjustify'>
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
          <a-button @click="pageAdd()" class="v-btn-success" style="margin-right: 8px;">新增</a-button>
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
          <span @click="pageEdit(row.id)" style="cursor: pointer;color: #3e9ece">
            {{ row.name }}
          </span>
        </template>
        <template #state_default="{ row }">
          <span v-show="row.state==='30'" class="ant-tag ant-tag-success">结束</span>
          <span v-show="row.state==='20'" class="ant-tag ant-tag-warning">待审</span>
          <span v-show="row.state==='11'" class="ant-tag ant-tag-error">驳回</span>
          <span v-show="row.state==='00'" class="ant-tag ant-tag-warning">草稿</span>
        </template>
      </vxe-grid>
    </div>
    <TempModal ref="tempModalRef" @select="tempSelect" />
  </div>
</template>
<script lang="ts" setup>
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import { VxeGridProps } from "vxe-table";
import { listInit, listQuery, listDelete, tabAdd, tabEdit } from "@/comps/page/index";
import { useGo } from "@/hooks/web/usePage";
import { message } from "ant-design-vue";
import TempModal from "@/comps/gen/GenModal.vue";

const go = useGo();

const state = reactive({
  url: "/oa/flow/main", moreParams: false,
  form: {}
});

const { form } = toRefs(state);

const gridOptions = reactive<VxeGridProps>({
  columns: [
    { type: "checkbox", align: "center", width: 42, fixed: "left" },
    { type: "seq", align: "center", width: 50, fixed: "left" },
    { field: "name", title: "流程主题", width: 200, fixed: "left", slots: { default: "name_default" } },
    { field: "temna", title: "模板名称" },
    { field: "crman", title: "申请人", width: 76 },
    { field: "crtim", title: "申请时间", width: 150 },
    { field: "uptim", title: "送审时间", width: 150 },
    { field: "state", title: "状态", width: 60, slots: { default: "state_default" } },
    { field: "facno", title: "当前环节", width: 160 },
    { field: "exmen", title: "当前处理人", width: 160 },
    { field: "notes", title: "备注" }
  ]
});

const pageEdit = (id) => {
  //vben的暂未开发好
  window.open("http://zsvg.gitee.io/vue#/page/ofmv?id=" +id);
};


onMounted(() => {
  listInit(state, gridOptions);
});


//region -----模板选择逻辑-----
const tempModalRef = ref();

const pageAdd = () => {
  tempModalRef.value.open({ url: "/oa/flow/tmpl/list" });
};

const tempSelect = (data) => {
  if (data != null) {
    //vben的暂未开发好
    window.open("http://zsvg.gitee.io/vue#/page/ofme?tmpid=" + data.id);
  } else {
    message.warning("请选择流程模板后发起流程");
  }
};
//endregion

</script>

