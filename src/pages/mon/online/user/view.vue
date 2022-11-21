<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="在线用户" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">
    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">
      <vxe-form-item title="用户姓名" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <span>{{data.name}}</span>
        </template>
      </vxe-form-item>
      <vxe-form-item title="用户账号" field="usnam" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <span>{{data.usnam}}</span>
        </template>
      </vxe-form-item>
      <vxe-form-item title="登录时间" field="crtim" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <span>{{data.crtim}}</span>
        </template>
      </vxe-form-item>
      <vxe-form-item title="IP地址" field="ip" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <span>{{data.ip}}</span>
        </template>
      </vxe-form-item>
      <vxe-form-item title="登录地点" field="addre" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <span>{{data.addre}}</span>
        </template>
      </vxe-form-item>
      <vxe-form-item title="操作系统" field="ageos" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <span>{{data.ageos}}</span>
        </template>
      </vxe-form-item>
      <vxe-form-item title="浏览器" field="agbro" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <span>{{data.agbro}}</span>
        </template>
      </vxe-form-item>
      <vxe-form-item title="客户端详情" field="agdet" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea readonly v-model="data.agdet"  :autosize="{minRows: 3, maxRows: 6}" ></vxe-textarea>
        </template>
      </vxe-form-item>
    </vxe-form>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {defHttp} from '@/utils/http/axios';
import {handleSubmit} from '@/comps/vxe/edit';

const emit = defineEmits(['success', 'register']);


const vform = reactive({
  loadingText: '',
  url: '/mon/online/user',
  data: {} as any
})

const [registerDrawer, {setDrawerProps, changeLoading, closeDrawer}] = useDrawerInner(async (data) => {
  vform.loadingText = "加载中";
  changeLoading(true);
  if (data.record.id) {
    vform.data = await defHttp.get({url: vform.url + '/one/' + data.record.id});
  } else {
    vform.data = data.record;
  }
  changeLoading(false);
});

</script>
