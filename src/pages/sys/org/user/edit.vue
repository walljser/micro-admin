<template>
  <div class="v-edit">
    <div class="v-edit-head">
      <div class='zjustify'>
        <div>
          <div style='line-height: 32px'>用户编辑</div>
        </div>
        <div>
          <a-button @click="tabSave(state,$refs.formRef,closeCurrent)" class="v-btn-success" style="margin-right: 8px;">保存</a-button>
          <a-button @click="closeCurrent">关闭</a-button>
        </div>
      </div>
    </div>
    <div class="v-edit-body">
      <div class="zform-div">
        <a-form ref="formRef" :model="form" class='zform' layout="inline" :label-col="{style: {width: '160px'}}">
          <a-form-item label="姓名" name="name" style="width: 50%" :rules="[{ required: true, message: '姓名不能为空' }]">
            <a-input v-model:value="form.name"/>
          </a-form-item>
          <a-form-item label="昵称" style="width: 50%">
            <a-input v-model:value="form.ninam"/>
          </a-form-item>
          <a-form-item label="所属部门" style="width: 50%">
            <a-input v-model:value="depna" readonly @click="deptSelect"/>
          </a-form-item>
          <a-form-item label="登录名" style="width: 50%">
            <a-input v-model:value="form.usnam"/>
          </a-form-item>
          <a-form-item label="密码" style="width: 50%">
            <a-input-password v-model:value="form.pacod"/>
          </a-form-item>
          <a-form-item label="职务" style="width: 50%">
            <a-input v-model:value="form.job"/>
          </a-form-item>
          <a-form-item label="手机号" style="width: 50%">
            <a-input v-model:value="form.monum"/>
          </a-form-item>
          <a-form-item label="邮箱" style="width: 50%">
            <a-input v-model:value="form.email"/>
          </a-form-item>
          <a-form-item label="是否可用" style="width: 50%">
            <a-switch v-model:checked="form.avtag"/>
          </a-form-item>
          <a-form-item label="排序号" style="width: 50%">
            <a-input-number v-model:value="form.ornum" style="width: 100%;min-width: 20px"/>
          </a-form-item>
          <a-form-item label="备注" style="width: 100%">
            <a-textarea v-model:value="form.notes" :rows="6"/>
          </a-form-item>
          <a-form-item label="创建时间" style="width: 50%">
            {{ form.crtim }}
          </a-form-item>
          <a-form-item label="更新时间" style="width: 50%">
            {{ form.uptim }}
          </a-form-item>
        </a-form>
      </div>
    </div>
    <OrgModal @register="registerModal" @closeModal="closeOrgModal"/>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, toRefs, ref, computed, toRaw} from 'vue'
import {useTabs} from "@/hooks/web/useTabs";
import {editInit, tabSave} from '@/comps/page/edit';
import {useModal} from "@/components/Modal";
import OrgModal from '@/comps/org/OrgModal.vue';

const {closeCurrent} = useTabs();

const state = reactive({
  url: '/sys/org/user',
  form: {} as any,
});

const {form} = toRefs(state);

onMounted(() => {
  editInit(state);
});

const [registerModal, {openModal}] = useModal();

//所属部门
const depna = computed(() => {
  return form.value.dept ? form.value.dept.name : '';
});

function deptSelect() {
  openModal(true, {
    opener: 'dept', orgType: 2, selectMode: 1,
    orgs: form.value.dept && form.value.dept.id ? [toRaw(form.value.dept)] : [],
  });
}

function closeOrgModal(data) {
  if (data.opener == 'dept') {
    form.value.dept = data.orgs[0];
  }
}
</script>


