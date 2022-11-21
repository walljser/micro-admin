<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="字典数据" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">
    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">
      <vxe-form-item title="字典数据名称" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="字典数据编码" field="code" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.code" clearable></vxe-input>
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
      <vxe-form-item title="字典数据备注" field="notes" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea v-model="data.notes" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 6}" clearable></vxe-textarea>
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
  url: '/ass/dict/data',
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
