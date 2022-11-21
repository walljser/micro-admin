<template>
  <div class="v-edit">
    <div class="v-edit-head">
      <div class='zjustify'>
        <div>
          <div style="line-height: 32px">门户编辑</div>
        </div>
        <div>
          <a-button @click="tabSave(state, $refs.formRef, closeCurrent)" class="v-btn-success"
                    style="margin-right: 8px;">保存
          </a-button>
          <a-button @click="closeCurrent">关闭</a-button>
        </div>
      </div>
    </div>
    <div class="v-edit-body">

      <a-form ref="formRef" :model="form" class="zform" layout="inline"
              :label-col="{style: {width: '180px'}}">
        <a-tabs type="card" style="width: 100%">
          <a-tab-pane key="1" tab="基本信息">
            <div class="zform-tab">
              <a-form-item label="门户名称" name="name" style="width: 100%"
                           :rules="[{ required: true, message: '名称不能为空' }]">
                <a-input v-model:value="form.name" />
              </a-form-item>
              <a-form-item label="是否可用" style="width: 50%">
                <a-switch v-model:checked="form.avtag" />
              </a-form-item>
              <a-form-item label="排序号" style="width: 50%">
                <a-input-number v-model:value="form.ornum" style="width: 100%;min-width: 20px" />
              </a-form-item>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="其他信息">
            <div class="zform-tab">
              <a-form-item label="备注：" style="width: 100%">
                <a-textarea :rows="4" v-model:value="form.notes" />
              </a-form-item>
              <a-form-item label="创建人：" style="width: 25%">
                {{ form.crman ? form.crman.name : "" }}
              </a-form-item>
              <a-form-item label="创建时间：" style="width: 25%">
                <div class="zinput"> {{ form.crtim }}</div>
              </a-form-item>
              <a-form-item label="更新人：" style="width: 25%">
                {{ form.upman ? form.upman.name : "" }}
              </a-form-item>
              <a-form-item label="更新时间：" style="width: 25%">
                <div class="zinput"> {{ form.uptim }}</div>
              </a-form-item>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs} from "vue";
import { useTabs } from "@/hooks/web/useTabs";
import { editInit, tabSave } from "@/comps/page/edit";

const { closeCurrent } = useTabs();

const state = reactive({
  url: "/sys/portal/main",
  form: {} as any
});

const { form } = toRefs(state);

onMounted(async () => {
  await editInit(state);
});
</script>


