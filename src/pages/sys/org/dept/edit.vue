<template>
  <div class="v-edit">
    <div class="v-edit-head">
      <div class='zjustify'>
        <div>
          <div style='line-height: 32px'>部门编辑</div>
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
          <a-form-item label="部门名称" name="name" style="width: 50%" :rules="[{ required: true, message: '名称不能为空' }]">
            <a-input v-model:value="form.name"/>
          </a-form-item>
          <a-form-item label="上级部门" style="width: 50%">
            <a-input v-model:value="parentName" readonly @click="parentSelect"/>
          </a-form-item>
          <a-form-item label="部门类型" style="width: 50%">
            <a-select v-model:value="form.type">
              <a-select-option :value="1">机构</a-select-option>
              <a-select-option :value="2">部门</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="是否可用" style="width: 25%">
            <a-switch v-model:checked="form.avtag"/>
          </a-form-item>
          <a-form-item label="排序号" style="width: 25%">
            <a-input-number v-model:value="form.ornum" style="width: 100%;min-width: 20px"/>
          </a-form-item>
          <a-form-item label="部门备注" style="width: 100%">
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
  url: '/sys/org/dept',
  form: {} as any,
});

const {form} = toRefs(state);

onMounted(() => {
  editInit(state);
});

const [registerModal, {openModal}] = useModal();

//商机部门
const parentName = computed(() => {
  return form.value.parent ? form.value.parent.name : '';
});

function parentSelect() {
  openModal(true, {
    opener: 'parent', orgType: 2, selectMode: 1,
    orgs: form.value.parent && form.value.parent.id ? [toRaw(form.value.parent)] : [],
  });
}

function closeOrgModal(data) {
  if (data.opener == 'parent') {
    form.value.parent = data.orgs[0];
  }
  console.log(data);
}

</script>


