<template>
  <div class="v-list">
    <div class="v-list-head">
      <div class='zjustify'>
        <div>
          <a-input @keyup.enter="listQuery()" v-model:value="state.form.name" placeholder="输入名称回车查询"
                   class="list-search" />
          <a-button @click="listQuery()" class="v-btn-primary">查询</a-button>
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="v-list-body" :style="{ height: `calc(100vh - 141px`}">
      <vxe-grid ref="gridRef" v-bind="gridOptions">
        <template #operate="{ row }">
          <LogoutOutlined @click="kickOut(row.onkey)" style="font-size: 15px;color: green" />
        </template>
      </vxe-grid>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs, ref } from "vue";
import { LogoutOutlined  } from "@ant-design/icons-vue";
import { VxeGridProps, VXETable } from "vxe-table";
import { useGo } from "@/hooks/web/usePage";
import { defHttp } from "@/utils/http/axios";

const go = useGo();

const state = reactive({
  url: "/mon/online/user", form: {}
});

const { form } = toRefs(state);

const gridOptions = reactive<VxeGridProps>({
  pagerConfig: {
    pageSize: 10
  },
  columns: [
    { type: "checkbox", align: "center", width: 42, fixed: "left" },
    { type: "seq", align: "center", width: 50, fixed: "left" },
    { field: "name", title: "用户姓名", width: 100, fixed: "left" },
    { field: "usnam", title: "用户账号", width: 100, fixed: "left" },
    { field: "crtim", title: "登录时间", width: 150 },
    { field: "ip", title: "登录IP", width: 160 },
    { field: "addre", title: "登录地点", width: 160 },
    { field: "ageos", title: "操作系统", width: 120 },
    { field: "agbro", title: "浏览器" },
    { title: "操作", width: 60, align: "center", slots: { default: "operate" } }
  ]
});

let list = [];

onMounted(async () => {
  list = await defHttp.get({
    url: state.url + "/list"
  });
  gridOptions.proxyConfig = {
    seq: true, props: { result: "result", total: "page.total" },
    ajax: {
      query: ({ page }) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              page: {
                total: list.length
              },
              result: list.slice((page.currentPage - 1) * page.pageSize, page.currentPage * page.pageSize)
            });
          }, 100);
        });
      }
    }
  };
});

const gridRef = ref() as any;

const listQuery = () => {
  gridRef.value.commitProxy("query");
};

const kickOut = async (onkey: string) => {
  const type = await VXETable.modal.confirm('确定要强退用户吗？');
  if (type === 'confirm') {
    await defHttp.post({
      url: state.url + "/close?onkey="+onkey,
    });
    list = await defHttp.get({
      url: state.url + "/list"
    });
    listQuery();
  }
};

</script>

