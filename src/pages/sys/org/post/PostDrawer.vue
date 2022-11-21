<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="岗位信息" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">
    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules" :loading="vform.loading">
      <vxe-form-item title="岗位名称" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="所属部门" field="dept" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <!--          <vxe-input :value="data.dept?data.dept.name:''" suffix-icon="fa fa-search" readonly @click="deptSelect"></vxe-input>-->
          <vxe-input v-model="depna" suffix-icon="fa fa-search" readonly @click="deptSelect"></vxe-input>
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
      <vxe-form-item title="员工成员" field="users" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea v-model="usersName" placeholder="请选择成员" :autosize="{minRows: 4, maxRows: 6}" @click="userSelect" readonly></vxe-textarea>
        </template>
      </vxe-form-item>
      <vxe-form-item title="岗位备注" field="notes" :item-render="{}" span="24" title-width="150">
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
  <OrgModal @register="registerModal" @closeModal="closeModal"/>
</template>
<script lang="ts" setup>
import {ref, computed, unref, reactive, toRaw} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {useModal} from '@/components/Modal';
import {defHttp} from '@/utils/http/axios';
import OrgModal from '@/comps/org/OrgModal.vue';
import {VxeFormPropTypes} from 'vxe-table'
import {handleSubmit} from '@/comps/vxe/edit';

const emit = defineEmits(['success', 'register']);

const [registerModal, {openModal}] = useModal();

const vform = reactive({
  loadingText: '',
  url: '/sys/org/post',
  data: {} as any,
  rules: {
    name: [
      {required: true, message: '请输入名称'},
    ]
  } as VxeFormPropTypes.Rules
})

const usersName = computed(() => {
  let names = '';
  if (vform.data.users && vform.data.users.length > 0) {
    for (const user of vform.data.users) {
      names += user.name + '；';
    }
  }
  return names;
});

const depna = computed(() => {
  return vform.data.dept ? vform.data.dept.name : '';
});

const [registerDrawer, {setDrawerProps,changeLoading, closeDrawer}] = useDrawerInner(async (data) => {
  vform.loadingText = "加载中";
  changeLoading(true);
  if (data.record.id) {
    vform.data = await defHttp.get({url: vform.url + '/one/' + data.record.id});
  } else {
    vform.data = data.record;
    if (vform.data.dept && vform.data.dept.id === '') {
      vform.data.dept = null;
    }
    vform.data.avtag = true;
  }
  changeLoading(false);
});

function userSelect() {
  openModal(true, {
    opener: 'users',
    orgType: 8,
    selectMode: 2,
    orgs: vform.data.users ? [...toRaw(vform.data.users)] : [],
  });
}

function deptSelect() {
  openModal(true, {
    opener: 'dept',
    orgType: 2,
    selectMode: 1,
    orgs: vform.data.dept && vform.data.dept.id ? [toRaw(vform.data.dept)] : [],
  });
}

function closeModal(data) {
  if (data.opener == 'users') {
    vform.data.users = data.orgs;
  } else if (data.opener == 'dept') {
    vform.data.dept = data.orgs[0];
  }
}


</script>

<style>
/*.vxe-input .type--text .is--readonly input{*/
/*  cursor:pointer !important;*/
/*}*/
</style>
