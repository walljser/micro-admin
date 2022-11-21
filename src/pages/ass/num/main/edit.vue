<template>
  <vxe-modal ref="xModal" show-footer title="流水号策略" width="800" height="560"
             mask-closable show-zoom resize remember>
    <template #default>
      <div class="v-edit">
        <div class="zform-div">
          <a-form ref="formRef" :model="form" class="zform" layout="inline"
                  :label-col="{style: {width: '120px'}}">
            <a-form-item label="策略代码" name="id" style="width: 50%"
                         :rules="[{ required: true, message: '代码不能为空' }]">
              <a-input :disabled="form.crtim" v-model:value="form.id" />
            </a-form-item>
            <a-form-item label="策略名称" name="name" style="width: 50%" :rules="[{ required: true, message: '名称不能为空' }]">
              <a-input v-model:value="form.name" />
            </a-form-item>
            <a-form-item label="编号生成模式" style="width: 50%" name="numod" :rules="[{ required: true, message: '模式不能为空' }]">
              <a-select v-model:value="form.numod">
                <a-select-option :value="'nodate'">无日期，纯流水号</a-select-option>
                <a-select-option :value="'yyyymmdd'">年月日YYYYMMDD+流水号</a-select-option>
                <a-select-option :value="'yymmdd'">年月日YYMMDD+流水号</a-select-option>
                <a-select-option :value="'yyyymm'">年月YYYYMM+流水号</a-select-option>
                <a-select-option :value="'yymm'">年月YYMM+流水号</a-select-option>
                <a-select-option :value="'yy'">年YY+流水号</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="编号前缀" style="width: 50%">
              <a-input v-model:value="form.nupre" />
            </a-form-item>
            <a-form-item label="编号长度" style="width: 50%" name="nulen" :rules="[{ required: true, message: '长度不能为空' }]">
              <a-input-number v-model:value="form.nulen" style="width: 100%;min-width: 20px" />
            </a-form-item>
            <a-form-item label="下一个编号" style="width: 50%">
              <a-input v-model:value="form.nunex" />
            </a-form-item>
            <a-form-item label="是否可用" style="width: 50%">
              <a-switch v-model:checked="form.avtag" />
            </a-form-item>
            <a-form-item label="排序号" style="width: 50%">
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
import { reactive, ref, toRefs } from "vue";
import { defHttp } from "@/utils/http/axios";
import { message } from "ant-design-vue";

const state = reactive({
  url: "/ass/num/main",
  form: { avtag: true } as any
});

const { form } = toRefs(state);

const xModal = ref({} as VxeModalInstance);

async function open(id: string) {
  if (id) {
    state.form = await defHttp.get({
      url: state.url + "/one/" + id
    });
  } else {
    state.form = { avtag: true };
  }
  await xModal.value.open();
}

function close() {
  xModal.value.close();
}

function cancel() {
  xModal.value.close();
}

const formRef=ref() as any;
const confirm=async ()=>{
  console.log(11);
  try {
    const values = await formRef.value.validateFields();
    console.log('Success:', values);
  } catch (errorInfo:any) {
    let errors='';
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      errors+=errorInfo.errorFields[i].errors+";"
    }
    console.log(errors);
    message.warning('校验错误：'+errors);
    return false;
  }
  if (!state.form.crtim) {
    await defHttp.post({url: state.url, data: state.form});
  } else {
    await defHttp.put({url:state.url, data: state.form});
  }
  xModal.value.close();
  emits('close');
}

const emits = defineEmits(['close']);

defineExpose({ open });

</script>

<style lang="less">

</style>
