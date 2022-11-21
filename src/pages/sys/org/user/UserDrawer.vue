<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="用户信息" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">
    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">
      <vxe-form-item title="姓名" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="昵称" field="ninam" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.ninam" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="登录名" field="usnam" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.usnam" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="密码" field="pacod" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.pacod" type="password" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="所属部门" field="dept" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="deptName" suffix-icon="vxe-icon--search" readonly @click="deptSelect"></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="职务" field="job" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.job" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="手机号" field="monum" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.monum" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="邮箱" field="email" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.email" clearable></vxe-input>
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
      <vxe-form-item title="用户备注" field="notes" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea v-model="data.notes" placeholder="请输入备注" :autosize="{minRows: 4, maxRows: 6}" clearable></vxe-textarea>
        </template>
      </vxe-form-item>
      <vxe-form-item title="创建时间" field="crtim" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          {{ data.crtim }}
        </template>
      </vxe-form-item>
      <vxe-form-item title="更新时间" field="uptim" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          {{ data.uptim }}
        </template>
      </vxe-form-item>
    </vxe-form>
  </BasicDrawer>
  <OrgModal @register="registerModal" @closeModal="closeOrgModal"/>
</template>
<script lang="ts" setup>
import {ref, computed, reactive, toRaw} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {useModal} from '@/components/Modal';
import {defHttp} from '@/utils/http/axios';
import OrgModal from '@/comps/org/OrgModal.vue';
import {VxeFormPropTypes, VxeFormInstance} from 'vxe-table'
import {handleSubmit} from '@/comps/vxe/edit';

const emit = defineEmits(['success', 'register']);

const [registerModal, {openModal}] = useModal();

const vform = reactive({
  loadingText: '',
  url: '/sys/org/user',
  data: {} as any,
  rules: {
    name: [
      {required: true, message: '请输入名称'},
    ]
  } as VxeFormPropTypes.Rules
})


const [registerDrawer, {setDrawerProps, changeLoading, closeDrawer}] = useDrawerInner(async (data) => {
  vform.loadingText = "加载中";
  changeLoading(true);
  if (data.record.id) {
    vform.data = await defHttp.get({url: vform.url + '/one/' + data.record.id});
  }else{
    vform.data = data.record;
    if (vform.data.dept && vform.data.dept.id === '') {
      vform.data.dept = null;
    }
    vform.data.avtag = true;
  }
  changeLoading(false);
});

//所属部门
const deptName = computed(() => {
  return vform.data.dept ? vform.data.dept.name : '';
});

function deptSelect() {
  openModal(true, {
    opener: 'dept', orgType: 2, selectMode: 1,
    orgs: vform.data.dept && vform.data.dept.id ? [toRaw(vform.data.dept)] : [],
  });
}

function closeOrgModal(data) {
  if (data.opener == 'dept') {
    vform.data.dept = data.orgs[0];
  }
}
</script>
