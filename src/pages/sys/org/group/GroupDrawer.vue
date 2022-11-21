<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="群组名称" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">
    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">
      <vxe-form-item title="群组名称" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item title="成员列表" field="members" :item-render="{}" span="24" title-width="150">
        <template #default="{ data }">
          <vxe-textarea v-model="membersName" placeholder="请选择成员" :autosize="{minRows: 4, maxRows: 6}" @click="membersSelect" readonly></vxe-textarea>
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
      <vxe-form-item title="群组备注" field="notes" :item-render="{}" span="24" title-width="150">
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
  url: '/sys/org/group',
  data: {} as any,
  rules: {
    name: [{required: true, message: '请输入名称'},],
    members: [{required: true, message: '请选择成员x'},],
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

//成员列表
function membersSelect() {
  openModal(true, {
    opener: 'members',
    orgType: 10,
    selectMode: 2,
    orgs: vform.data.members ? [...toRaw(vform.data.members)] : [],
  });
}

const membersName = computed(() => {
  let names = '';
  if (vform.data.members && vform.data.members.length > 0) {
    for (const member of vform.data.members) {
      names += member.name + '；';
    }
  }
  return names;
});


function closeOrgModal(data) {
  if (data.opener == 'members') {
    vform.data.members = data.orgs;
  }
  console.log(data);
}
</script>
