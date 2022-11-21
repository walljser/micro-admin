<template>
  <div class="fixed h-full w-full">
    <div class="v-edit">
      <div class="v-edit-head">
        <div class="zjustify">
          <div>
            <div style="line-height: 32px">流程实例</div>
          </div>
          <div>
            <a-button @click="tabSave(state,$refs.formRef,closeCurrent)" class="v-btn-success"
                      style="margin-right: 8px;">保存
            </a-button>
            <a-button @click="closeCurrent">关闭</a-button>
          </div>
        </div>
      </div>
      <div class="v-edit-body">
        <div class="zform-div">
          <a-form ref="formRef" :model="form" class="zform" layout="inline"
                  :label-col="{style: {width: '180px'}}">
            <a-form-item label="流程主题" name="name" style="width: 50%"
                         :rules="[{ required: true, message: '主题不能为空' }]">
              <a-input v-model:value="form.name" />
            </a-form-item>
            <a-form-item label="Activity form" style="width: 50%">
              <a-input v-model:value="form.desc" />
            </a-form-item>
            <a-form-item label="Activity form" style="width: 50%">
              <a-input v-model:value="form.desc" />
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs, ref } from "vue";
import { useTabs } from "@/hooks/web/useTabs";
import { editInit, tabSave } from "@/comps/page/edit";

const { closeCurrent } = useTabs();

const state = reactive({
  url: "/oa/flow/main",
  form: {} as any
});

const { form } = toRefs(state);

onMounted(() => {
  editInit(state);
});

</script>


