<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="定时任务日志" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">
    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">
      <vxe-form-item title="任务名称" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input readonly v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="执行结果" field="ret" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input readonly v-model="data.ret" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="开始时间" field="sttim" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input readonly v-model="data.sttim" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="结束时间" field="code" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input readonly v-model="data.entim" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="返回信息" field="msg" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea readonly v-model="data.msg" placeholder="请输入备注" :autosize="{minRows: 6, maxRows: 10}" clearable></vxe-textarea>
        </template>
      </vxe-form-item>
    </vxe-form>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {ref, computed, reactive, toRaw} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {defHttp} from '@/utils/http/axios';
import {VxeFormPropTypes, VxeFormInstance} from 'vxe-table'
import {handleSubmit} from '@/comps/vxe/edit';

const emit = defineEmits(['success', 'register']);


const vform = reactive({
  loadingText: '',
  url: '/mon/job/log',
  data: {} as any,
  rules: {
    name: [{required: true, message: '请输入名称'},],
  } as VxeFormPropTypes.Rules
})

const [registerDrawer, {setDrawerProps, changeLoading, closeDrawer}] = useDrawerInner(async (data) => {
  vform.loadingText = "加载中";
  changeLoading(true);
  if (data.record.id) {
    vform.data = await defHttp.get({url: vform.url + '/one/' + data.record.id});
  } else {
    vform.data = data.record;
    vform.data.avtag = true;
  }
  changeLoading(false);
});

</script>
