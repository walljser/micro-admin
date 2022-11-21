<template>
  <BasicDrawer v-bind="$attrs" :loadingText="vform.loadingText" showFooter title="菜单名称" width="70%"
               @ok="handleSubmit($refs.xForm, vform, emit, setDrawerProps, changeLoading, closeDrawer)" @register="registerDrawer">

    <vxe-form title-colon ref="xForm" title-align="right" title-width="100" :data="vform.data" :rules="vform.rules">

      <vxe-form-item title="菜单类型" field="type" :item-render="{}" span="24" title-width="150">
        <template #default="params">
<!--          <vxe-radio-group v-model="data.type" @change="typeChange">-->
<!--          <vxe-radio-group v-model="params.data.type" @change="$refs.xForm.reset()">-->
<!--          <vxe-radio-group v-model="params.data.type" @change="params.data.name='xxx'">-->
          <vxe-radio-group v-model="params.data.type" >
<!--          <vxe-radio-group v-model="params.data.type" >-->
            <vxe-radio-button label="D" content="目录"></vxe-radio-button>
            <vxe-radio-button label="M" content="菜单"></vxe-radio-button>
            <vxe-radio-button label="B" content="按钮"></vxe-radio-button>
          </vxe-radio-group>

<!--          <RadioGroup v-model:value="params.data.type" button-style="solid">-->
<!--            <RadioButton value="D">目录</RadioButton>-->
<!--            <RadioButton value="M">菜单</RadioButton>-->
<!--            <RadioButton value="B">按钮</RadioButton>-->
<!--          </RadioGroup>-->


<!--          <vxe-radio-group v-model="data.type">-->
<!--            <vxe-radio label="D" content="目录"></vxe-radio>-->
<!--            <vxe-radio label="M" content="菜单"></vxe-radio>-->
<!--            <vxe-radio label="B" content="按钮"></vxe-radio>-->
<!--          </vxe-radio-group>-->
        </template>
      </vxe-form-item>

      <vxe-form-item title="菜单名称" field="name" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.name" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="上级菜单" field="pname" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <MenuPulldown @select="menuSelect" :pname="data.pname"/>
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

      <vxe-form-item title="菜单代码" v-if="vform.data.type === 'M'||vform.data.type === 'D'" field="code" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.code" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="路由地址" v-if="vform.data.type === 'M'||vform.data.type === 'D'" field="path" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.path" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="权限标识" field="perm" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-input v-model="data.perm" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item ref="xItem" v-if="vform.data.type === 'M'" title="组件路径" field="comp" :item-render="{}" span="12" title-width="150">
<!--      <vxe-form-item ref="xItem" v-if="vform.data.type === 'M'" :visible="vform.data.type === 'M'" title="组件路径" field="comp" :item-render="{}" span="12" title-width="150">-->
        <template #default="{ data }">
          <vxe-input v-model="data.comp" clearable></vxe-input>
        </template>
      </vxe-form-item>

      <vxe-form-item title="图标" v-if="vform.data.type === 'M'||vform.data.type === 'D'" field="icon" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <IconPicker :value="data.icon" @change="iconChange"/>
        </template>
      </vxe-form-item>

      <vxe-form-item title="是否显示" v-if="vform.data.type === 'M'||vform.data.type === 'D'" field="shtag" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-switch v-model="data.shtag" open-label="是" close-label="否"></vxe-switch>
        </template>
      </vxe-form-item>

      <vxe-form-item title="是否外链" v-if="vform.data.type === 'M'||vform.data.type === 'D'" field="extag" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-switch v-model="data.extag" open-label="是" close-label="否"></vxe-switch>
        </template>
      </vxe-form-item>

      <vxe-form-item title="是否缓存" v-if="vform.data.type === 'M'||vform.data.type === 'D'" field="catag" :item-render="{}" span="12" title-width="150">
        <template #default="{ data }">
          <vxe-switch v-model="data.catag" open-label="是" close-label="否"></vxe-switch>
        </template>
      </vxe-form-item>


    </vxe-form>

  </BasicDrawer>
</template>
<script lang="ts" setup>
import {IconPicker} from '@/components/Icon';
import {RadioGroup, RadioButton} from 'ant-design-vue';
import {ref, computed, reactive, toRaw, nextTick} from 'vue';
import {BasicDrawer, useDrawerInner} from '@/components/Drawer';
import {useModal} from '@/components/Modal';
import {defHttp} from '@/utils/http/axios';
import OrgModal from '@/comps/org/OrgModal.vue';
import {VxeFormPropTypes, VxeFormInstance, VxePulldownInstance} from 'vxe-table'
import {handleSubmit} from '@/comps/vxe/edit';
import MenuPulldown from './MenuPulldown.vue';
import XEUtils from "xe-utils";


// const compShow = computed(() => {
//   console.log('11111111x')
//   return vform.data.type === 'M';
// });

const emit = defineEmits(['success', 'register']);

const [registerModal, {openModal}] = useModal();

const vform = reactive({
  loadingText: '',
  url: '/sys/perm/menu',
  data: {} as any,
  rules: {
    name: [{required: true, message: '请输入名称'},],
    type: [{required: true, message: '请选择类型'},],
  } as VxeFormPropTypes.Rules
})


const [registerDrawer, {setDrawerProps, changeLoading, closeDrawer}] = useDrawerInner(async (data) => {
  vform.loadingText = "加载中";
  changeLoading(true);
  if (data.record.id) {
    vform.data = await defHttp.get({url: vform.url + '/one/' + data.record.id});
  }else{
    vform.data = data.record;
    vform.data.avtag=true;
    vform.data.shtag=true;
  }
  changeLoading(false);
});

function iconChange(value){
  vform.data.icon=value;
}

// async function  typeChange(params){
//   console.log(params.label);
//   vform.data.type=params.label;
//   await nextTick(function (){
//     console.log("更新DOM")
//   });
// }

const demo3 = reactive({
  tableData3: [
    {name: 'Test1', role: '前端', sex: '男'},
    {name: 'Test2', role: '后端', sex: '男'},
    {name: 'Test3', role: '测试', sex: '男'},
    {name: 'Test4', role: '设计师', sex: '女'}
  ]
})

// const keyupEvent1 = () => {
//   demo3.tableData3 = demo3.tableData3 ? data1.filter((item) => item.label.indexOf(demo1.value1) > -1) : data1
// }

function menuSelect(node) {
  vform.data.pid = node.id;
  vform.data.pname = node.name;
  console.log(vform.data.pname);
  // xDown3.value.hidePanel()
}


</script>
