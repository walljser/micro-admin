<template>
  <vxe-modal  ref="xModal" v-model="demo1.value8" title="记忆功能的窗口" width="1000" height="560" mask-closable  show-zoom resize remember>
    <template #default>


      <Tabs type="card">
        <TabPane key="1" tab="组织架构">
          <PageWrapper dense contentClass="flex">
            <div class="w-1/3 xl:w-1/3" style="height: 340px;border: 1px solid #ccc">
              <BasicTree
                title="部门列表"
                toolbar
                search
                :treeData="treeData"
                :replaceFields="{ key: 'id', title: 'name' }"
                @select="handleSelect"
              />
            </div>
            <div class="w-2/3 xl:w-2/3" style="height: 340px;margin-left: 5px;border: 1px solid #ccc">
              <!--        <BasicTable @register="registerTable" >-->
              <!--          <template #toolbar>-->
              <!--            <a-button type="primary" @click="handleCreate">新增岗位</a-button>-->
              <!--          </template>-->
              <!--        </BasicTable>-->
            </div>
          </PageWrapper>
        </TabPane>
        <TabPane key="2" tab="Tab 2">Content of Tab Pane 2</TabPane>
        <TabPane key="3" tab="Tab 3">Content of Tab Pane 3</TabPane>
      </Tabs>





<!--      <vxe-form :data="demo1.formData3" :rules="demo1.formRules3" title-align="right" title-width="60">-->
<!--        <vxe-form-item title="基本信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-address-card-o'}"></vxe-form-item>-->
<!--        <vxe-form-item title="名称" field="name" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入名称'}}"></vxe-form-item>-->
<!--        <vxe-form-item title="昵称" field="nickname" span="12" :item-render="{name: 'input', attrs: {placeholder: '请输入昵称'}}"></vxe-form-item>-->
<!--        <vxe-form-item title="性别" field="sex" span="12" :item-render="{name: '$select', options: demo1.sexList}"></vxe-form-item>-->
<!--        <vxe-form-item title="年龄" field="age" span="12" :item-render="{name: 'input', attrs: {type: 'number', placeholder: '请输入年龄'}}"></vxe-form-item>-->
<!--        <vxe-form-item title="其他信息" span="24" title-align="left" title-width="200px" :title-prefix="{icon: 'fa fa-info-circle'}"></vxe-form-item>-->
<!--        <vxe-form-item title="地址" field="address" span="24" :item-render="{name: 'textarea', attrs: {placeholder: '请输入地址'}}"></vxe-form-item>-->
<!--        <vxe-form-item align="center" span="24">-->
<!--          <template #default>-->
<!--            <vxe-button type="submit" status="primary">提交</vxe-button>-->
<!--            <vxe-button type="reset">重置</vxe-button>-->
<!--          </template>-->
<!--        </vxe-form-item>-->
<!--      </vxe-form>-->
    </template>
  </vxe-modal>
</template>


<script lang="ts" setup>
import {Tabs, TabPane} from 'ant-design-vue';
import {PageWrapper} from '@/components/Page';
import {reactive, ref} from "vue";
import {VxeModalInstance} from "vxe-table";
import {BasicTree, TreeItem} from '@/components/Tree';
import {defHttp} from "@/utils/http/axios";

const test = defineProps({
  show: { type: Boolean },
});


const treeData = ref<TreeItem[]>([]);
// treeData.value = (await getDeptList()) as unknown as TreeItem[];

const getDeptList = (params?: any) =>defHttp.get({url: '/sys/org/dept/tree', params});
const modalOrg = ref("");
// const [registerModal, {setModalProps, closeModal}] = useModalInner((data) => {
//   console.log("orgModal接收：" + data);
//
//   // modalOrg.value = data;
// });

async function fetch() {
  treeData.value = (await getDeptList()) as unknown as TreeItem[];
}










const xModal = ref({} as VxeModalInstance)

function add(zdata){
  console.log(zdata);
  const $modal=xModal.value;
  fetch();
  // console.log(111);
  // demo1.value8=true;
  $modal.open();
}
defineExpose({ add });














const demo1 = reactive({
  value1: false,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: false,
  value7: false,
  value8: false,
  value9: false,
  value10: false,
  value11: false,
  sexList: [
    { label: '', value: '' },
    { label: '女', value: '0' },
    { label: '男', value: '1' }
  ],
  formData3: {
    name: '',
    nickname: '',
    sex: '',
    age: 26,
    address: null
  },
  formRules3: {
    name: [
      { required: true, message: '请输入名称' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ],
    nickname: [
      { required: true, message: '请输入昵称' }
    ],
    sex: [
      { required: true, message: '请选择性别' }
    ]
  },
  tablePage: {
    pageSize: 10
  },
  tableToolbar: {
    buttons: [
      { code: 'myBtn1', name: '按钮1' },
      { code: 'myBtn2', name: '按钮2' }
    ],
    refresh: true,
    custom: true
  },
  tableData: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  tableColumn: [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 60 },
    { field: 'name', title: 'Name' },
    { field: 'nickname', title: 'Nickname' },
    {
      field: 'role',
      title: 'Role',
      filters: [
        { label: '前端', value: '前端' },
        { label: '后端', value: '后端' },
        { label: '设计师', value: '设计师' },
        { label: '管理员', value: '管理员' },
        { label: '项目经理', value: '项目经理' },
        { label: '测试', value: '测试' },
        { label: '美工', value: '美工' },
        { label: '数据库', value: '数据库' }
      ]
    },
    { field: 'describe', title: 'Describe' }
  ]
})

</script>

<style scoped lang="less">
.vxe-modal--wrapper .vxe-modal--content{
  padding: .44em .55em !important;
}
</style>
