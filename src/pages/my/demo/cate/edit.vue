<template>
  <vxe-modal ref="xModal" show-footer title="DEMO分类" width="600" height="560"
             mask-closable show-zoom resize remember>
    <template #default>
      <div class="v-edit">
        <div class="zform-div">
          <a-form ref="formRef" :model="form" class="zform" layout="inline"
                  :label-col="{style: {width: '120px'}}">
            <a-form-item label="分类名称" name="name" style="width: 100%"
                         :rules="[{ required: true, message: '名称不能为空' }]">
              <a-input v-model:value="form.name" />
            </a-form-item>
            <a-form-item label="上级分类" style="width: 100%">
              <TreeSelect v-model:value="form.pid" style="width: 100%"
                          show-search placeholder="Please select" allow-clear
                          :tree-data="state.cates" :fieldNames="{value:'id',label:'name'}" />
            </a-form-item>
            <a-form-item label="是否可用" style="width: 100%">
              <a-switch v-model:checked="form.avtag" />
            </a-form-item>
            <a-form-item label="排序号" style="width: 100%">
              <a-input-number v-model:value="form.ornum" style="width: 100%;min-width: 20px" />
            </a-form-item>
            <a-form-item label="备注" style="width: 100%">
              <a-textarea v-model:value="form.notes" :rows="6" />
            </a-form-item>
          </a-form>
        </div>
      </div>
    </template>
    <template #footer>
      <vxe-button status="primary" @click="confirm">提交</vxe-button>
      <vxe-button @click="close">关闭</vxe-button>
    </template>
  </vxe-modal>
</template>


<script lang="ts" setup>
import { VxeModalInstance } from "vxe-table";
import { TreeSelect } from "ant-design-vue";
import { reactive, ref, toRefs } from "vue";
import { defHttp } from "@/utils/http/axios";
import { message } from "ant-design-vue";

const state = reactive({
  url: "/my/demo/cate", cates: [] as any,
  form: { avtag: true } as any
});

const { form } = toRefs(state);

const xModal = ref({} as VxeModalInstance);

async function open(data: any) {
  if (data && data.id) {
    state.form = await defHttp.get({
      url: state.url + "/one/" + data.id
    });
    if (state.form.parent) {
      state.form.pid = state.form.parent.id;
    }
  } else {
    state.form = { avtag: true };
    if (data && data.pid) {
      form.value.parent = { id: data.pid, name: data.pname };
      form.value.pid = data.pid;
    }
  }
  await catesInit();
  await xModal.value.open();
}

function close() {
  xModal.value.close();
}

function cancel() {
  xModal.value.close();
}

const formRef = ref() as any;
const confirm = async () => {
  if (form.value.pid) {
    form.value.parent = { id: form.value.pid };
  } else {
    form.value.parent = null;
  }
  try {
    const values = await formRef.value.validateFields();
    console.log("Success:", values);
  } catch (errorInfo: any) {
    let errors = "";
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      errors += errorInfo.errorFields[i].errors + ";";
    }
    console.log(errors);
    message.warning("校验错误：" + errors);
    return false;
  }
  if (!state.form.crtim) {
    await defHttp.post({ url: state.url, data: state.form });
  } else {
    await defHttp.put({ url: state.url, data: state.form });
  }
  xModal.value.close();
  emits("close");
};


const catesInit = async () => {
  state.cates = await defHttp.get({ url: "/my/demo/cate/treez", params: { id: form.value.id } });
};

const emits = defineEmits(["close"]);

defineExpose({ open });

</script>

<style lang="less">

</style>
