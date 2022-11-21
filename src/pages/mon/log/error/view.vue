<template>
  <vxe-modal ref="xModal" show-footer title="操作日志详情" width="90%" height="560"
             mask-closable show-zoom resize remember>
    <template #default>
      <vxe-form title-colon ref="xForm" title-align="right" title-width="120" :data="form">
        <vxe-form-item title="操作名称" field="name" :item-render="{}" span="24">
          <template #default="{ data }">
            {{ data.name }}
          </template>
        </vxe-form-item>
        <vxe-form-item title="请求时间" field="crtim" :item-render="{}" span="24">
          <template #default="{ data }">
            {{ data.crtim }}
          </template>
        </vxe-form-item>
        <vxe-form-item title="请求参数" field="params" :item-render="{}" span="24">
          <template #default="{ data }">
            {{ data.params }}
          </template>
        </vxe-form-item>
        <vxe-form-item title="异常详情" field="error" :item-render="{}" span="24">
          <template #default="{ data }">
            {{ data.error }}
          </template>
        </vxe-form-item>
      </vxe-form>
    </template>
    <template #footer>
      <vxe-button @click="close">关闭</vxe-button>
    </template>
  </vxe-modal>
</template>


<script lang="ts" setup>
import { VxeModalInstance } from "vxe-table";
import { reactive, ref, toRefs } from "vue";
import { defHttp } from "@/utils/http/axios";

const state = reactive({
  url: "/mon/log/error",
  form: { avtag: true } as any
});

const { form } = toRefs(state);

const xModal = ref({} as VxeModalInstance);

async function open(id: string) {
  state.form = await defHttp.get({
    url: state.url + "/one/" + id
  });
  await xModal.value.open();
}

function close() {
  xModal.value.close();
}

function cancel() {
  xModal.value.close();
}

defineExpose({ open });

</script>

<style lang="less">

</style>
