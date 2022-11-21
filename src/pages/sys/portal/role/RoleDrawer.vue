<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="角色信息" width="70%"
               @ok="handleSubmit($refs.xForm,$refs.xMenuTree)" @register="registerDrawer">
    <vxe-form custom-layout title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">
      <Tabs type="card">
        <TabPane key="1" class="vxe-row">
          <template #tab>
            <span>基本信息</span>
          </template>

          <vxe-form-item title="角色名称" field="name" :item-render="{}" span="12" title-width="150">
            <template #default="{ data }">
              <vxe-input v-model="data.name" clearable style="width: 100%"></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item title="指派用户" field="orgs" :item-render="{}" span="24" title-width="150">
            <template #default="{ data }">
              <vxe-textarea v-model="orgsName" placeholder="请选择成员" :autosize="{minRows: 4, maxRows: 6}" @click="orgsSelect" readonly></vxe-textarea>
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
          <vxe-form-item title="角色备注" field="notes" :item-render="{}" span="24" title-width="150">
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

        </TabPane>

        <TabPane key="2" class="vxe-row">
          <template #tab>
            <span>菜单分配</span>
          </template>
          <MenuTree ref="xMenuTree" :menuArr="vform.menuArr"/>
        </TabPane>
      </Tabs>
    </vxe-form>
  </BasicDrawer>
  <OrgModal @register="registerModal" @closeModal="closeOrgModal"/>
</template>
<script lang="ts" setup>
import {ref, computed, reactive, toRaw} from 'vue';
import {Tabs, TabPane} from 'ant-design-vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {useModal} from '@/components/Modal';
import {defHttp} from '@/utils/http/axios';
import OrgModal from '@/comps/org/OrgModal.vue';
import {VxeFormPropTypes, VxeFormInstance, VXETable, VxeGridInstance} from 'vxe-table'
import MenuTree from './MenuTree.vue';

const emit = defineEmits(['success', 'register']);

const [registerModal, {openModal}] = useModal();

const vform = reactive({
  menuArr: [],
  loadingText: '',
  url: '/sys/portal/role',
  data: {} as any,
  rules: {
    name: [
      {required: true, message: '请输入名称'},
      {min: 1, max: 20, message: '长度在 1 到 20 个字符'}
    ],
    sex: [
      {required: true, message: '请选择性别'}
    ],
  } as VxeFormPropTypes.Rules
})

// const menuArr = reactive([]);


const xMenuTree = ref({});

const [registerDrawer, {setDrawerProps, changeLoading, closeDrawer}] = useDrawerInner(async (data) => {
  vform.loadingText = "加载中";
  changeLoading(true);
  if (data.record.id) {
    data.record = await defHttp.get({url: vform.url + '/one/' + data.record.id});
  }else{
    data.record.avtag=true;
  }
  vform.menuArr.splice(0, vform.menuArr.length);
  if (data.record.menus) {
    for (const menu of data.record.menus) {
      vform.menuArr.push(menu.id);
    }
  }
  vform.data = data.record;
  if (xMenuTree && xMenuTree.value && xMenuTree.value.reloadTree) {
    xMenuTree.value.reloadTree();
  }
  changeLoading(false);
});

//成员列表
function orgsSelect() {
  openModal(true, {
    opener: 'orgs',
    orgType: 10,
    selectMode: 2,
    orgs: vform.data.orgs ? [...toRaw(vform.data.orgs)] : [],
  });
}

const orgsName = computed(() => {
  let names = '';
  if (vform.data.orgs && vform.data.orgs.length > 0) {
    for (const org of vform.data.orgs) {
      names += org.name + '；';
    }
  }
  return names;
});


function closeOrgModal(data) {
  if (data.opener == 'orgs') {
    vform.data.orgs = data.orgs;
  }
}


function handleSubmit($form, $menuTree) {
  $form.validate(async function (data) {
    if (data == undefined) {
      try {
        setDrawerProps({confirmLoading: true});
        vform.loadingText = "保存中";
        if ($menuTree != null) {
          vform.data.menus = $menuTree.getMenus();
        }
        changeLoading(true);
        vform.data.porid="sys";
        if (vform.data['id']) {
          await defHttp.put({url: vform.url, data: vform.data});
        } else {
          await defHttp.post({url: vform.url, data: vform.data});
        }
        closeDrawer();
        emit('success');
      } finally {
        setDrawerProps({confirmLoading: false});
        changeLoading(false);
      }
    } else {
      VXETable.modal.message({content: '校验异常请修改', status: 'warning'})
    }
  });
}
</script>
