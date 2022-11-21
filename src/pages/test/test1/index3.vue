<template>
  <div style="margin: 20px">

    {{demo2.formData2.sex}}

    <vxe-form
        title-colon
        ref="xForm"
        title-align="right"
        title-width="100"
        :data="demo2.formData2"
        :rules="demo2.formRules2"
        :loading="demo2.loading2"
        @submit="submitEvent2"
        @reset="resetEvent">
      <vxe-form-gather span="12">
        <vxe-form-item title="名称" field="name" span="24"></vxe-form-item>
        <vxe-form-item title="昵称" span="24">
          <template #title>
            <span style="color: red;">自定义标题</span>
          </template>
          <template #default="{ data }">
            <span>自定义 {{ data.nickname }}</span>
          </template>
        </vxe-form-item>
        <vxe-form-item title="标题貌似有点长呢" field="sex" span="24" :item-render="{}" title-overflow>
            <vxe-select v-model="demo2.formData2.sex" placeholder="请选择性别" clearable @change="$refs.xForm.updateStatus('date')">
              <vxe-option value="1" label="女"></vxe-option>
              <vxe-option value="2" label="男"></vxe-option>
            </vxe-select>
        </vxe-form-item>
        <vxe-form-item title="标题貌似有点长呢" field="age" span="24" :item-render="{}" title-overflow="title">
          <template #default="params">
            <vxe-input v-model="params.data.age" type="integer" placeholder="请输入年龄" clearable @change="$refs.xForm.updateStatus(params)"></vxe-input>
          </template>
        </vxe-form-item>
        <vxe-form-item :title="demo2.formData2.sex" field="date" span="24" :item-render="{}" title-overflow="ellipsis">
          <template #default="{ data }">
            <vxe-input v-model="data.date" type="date" placeholder="请选择日期" clearable></vxe-input>
          </template>
        </vxe-form-item>
      </vxe-form-gather>
      <vxe-form-gather span="12">
        <vxe-form-item title="标题貌似有点长呢标题貌似有点长呢" field="address" span="24" :item-render="{}">
          <template #default="{ data }">
            <vxe-textarea v-model="data.address" placeholder="请输入地址" :autosize="{minRows: 6, maxRows: 10}" clearable></vxe-textarea>
          </template>
        </vxe-form-item>
      </vxe-form-gather>
      <vxe-form-item align="center" span="24">
        <template #default>
          <vxe-button type="submit" status="primary" content="基本表单"></vxe-button>
          <vxe-button type="reset" content="重置"></vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>




  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive } from 'vue'
import { VXETable, VxeFormEvents, VxeFormPropTypes } from 'vxe-table'



const demo2 = reactive({
  loading2: false,
  formData2: {
    name: 'test1',
    nickname: 'Testing',
    sex: '',
    age: 26,
    date: null,
    address: '左右布局'
  },
  formRules2: {
    name: [
      { required: true, message: '请输入名称' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ],
    sex: [
      { required: true, message: '请选择性别' }
    ],
    age: [
      { required: true, message: '请输入年龄' },
      {
        validator ({ itemValue }) {
          // 自定义校验
          if (Number(itemValue) > 35 || Number(itemValue) < 18) {
            return new Error('年龄在 18 ~ 35 之间')
          }
        }
      }
    ]
  } as VxeFormPropTypes.Rules
})

const submitEvent2: VxeFormEvents.Submit = () => {
  demo2.loading2 = true
  setTimeout(() => {
    demo2.loading2 = false
    VXETable.modal.message({ content: '保存成功', status: 'success' })
  }, 1000)
}

const searchEvent: VxeFormEvents.Submit = () => {
  VXETable.modal.message({ content: '查询事件', status: 'info' })
}

const resetEvent: VxeFormEvents.Reset = () => {
  VXETable.modal.message({ content: '重置事件', status: 'info' })
}




</script>
<style>


</style>
