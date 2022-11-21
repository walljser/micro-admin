<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="流程分类" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">

    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">

      <vxe-form-item title="分类名称" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="上级分类" field="pname" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <MenuPulldown @select="parentSelect" :pname="data.pname"/>
        </template>
      </vxe-form-item>

      <vxe-form-item title="排序号" field="ornum" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.ornum" placeholder="数值类型" type="number"></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item  title="是否启用" field="avtag" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-switch v-model="data.avtag" open-label="是" close-label="否"></vxe-switch>
        </template>
      </vxe-form-item>


    </vxe-form>

  </BasicDrawer>
</template>
<script lang="ts" setup>
import {ref, computed, reactive, toRaw, nextTick} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {useModal} from '@/components/Modal';
import {defHttp} from '@/utils/http/axios';
import {VxeFormPropTypes, VxeFormInstance, VxePulldownInstance} from 'vxe-table'
import {handleSubmit} from '@/comps/vxe/edit';
import MenuPulldown from './MenuPulldown.vue';


const emit = defineEmits(['success', 'register']);

const [registerModal, {openModal}] = useModal();

const vform = reactive({
  loadingText: '',
  url: '/oa/flow/cate',
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
    if(vform.data.parent){
      vform.data.pid = vform.data.parent.id;
      vform.data.pname =vform.data.parent.name;
    }
  }else{
    vform.data = data.record;
    vform.data.avtag=true;
    vform.data.shtag=true;
  }
  changeLoading(false);
});

function parentSelect(node) {
  vform.data.pid = node.id;
  vform.data.pname = node.name;
  vform.data.parent = node;
  console.log(vform.data.pname);
  // xDown3.value.hidePanel()
}

</script>
