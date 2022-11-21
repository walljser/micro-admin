<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="定时任务" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">
    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">
      <vxe-form-item title="任务名称" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="任务代码" field="code" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.code" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="请求类型" field="retyp" :item-render="{}" span="12" title-width="150">
        <template #default="params">
          <vxe-radio-group v-model="params.data.retyp">
            <vxe-radio :label="0" content="Run"></vxe-radio>
            <vxe-radio :label="1" content="Get"></vxe-radio>
            <vxe-radio :label="2" content="Post"></vxe-radio>
            <vxe-radio :label="3" content="Put"></vxe-radio>
            <vxe-radio :label="4" content="Delete"></vxe-radio>
          </vxe-radio-group>
        </template>
      </vxe-form-item>

      <vxe-form-item title="任务表达式" field="cron" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.cron" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="请求地址" field="reurl" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.reurl" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="请求头" field="rehea" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.rehea" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="请求参数" field="repar" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea v-model="data.repar" :autosize="{minRows: 4, maxRows: 6}" clearable></vxe-textarea>
        </template>
      </vxe-form-item>

      <vxe-form-item title="执行类型" field="extyp" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-select v-model="data.extyp">
            <vxe-option :value="0" label="并行执行"></vxe-option>
            <vxe-option :value="1" label="串行执行"></vxe-option>
          </vxe-select>
        </template>
      </vxe-form-item>


      <vxe-form-item title="任务备注" field="notes" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea v-model="data.notes" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 6}" clearable></vxe-textarea>
        </template>
      </vxe-form-item>
      <vxe-form-item title="是否可用" field="avtag" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-switch v-model="data.avtag" open-label="是" close-label="否"></vxe-switch>
        </template>
      </vxe-form-item>
      <vxe-form-item title="排序号" field="ornum" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.ornum" type="number"></vxe-input>
        </template>
      </vxe-form-item>
    </vxe-form>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { ref, computed, reactive, toRaw } from "vue";
import { BasicDrawer, useDrawerInner } from "@/components/Drawer";
import { defHttp } from "@/utils/http/axios";
import { VxeFormPropTypes, VxeFormInstance } from "vxe-table";
import { handleSubmit } from "@/comps/vxe/edit";

const emit = defineEmits(["success", "register"]);


const vform = reactive({
  loadingText: "",
  url: "/mon/job/main",
  data: {} as any,
  rules: {
    name: [{ required: true, message: "请输入名称" }]
  } as VxeFormPropTypes.Rules
});

const [registerDrawer, { setDrawerProps, changeLoading, closeDrawer }] = useDrawerInner(async (data) => {
  vform.loadingText = "加载中";
  changeLoading(true);
  if (data.record.id) {
    vform.data = await defHttp.get({ url: vform.url + "/one/" + data.record.id });
  } else {
    vform.data = data.record;
    vform.data.avtag = true;
  }
  changeLoading(false);
});

</script>
