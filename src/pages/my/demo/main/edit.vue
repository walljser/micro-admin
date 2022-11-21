<template>
  <div class="v-edit">
    <div class="v-edit-head">
      <div class='zjustify'>
        <div>
          <div style="line-height: 32px">DEMO编辑</div>
        </div>
        <div>
          <a-button @click="save()" class="v-btn-success"
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
              <a-form-item label="DEMO名称" name="name" style="width: 50%"
                           :rules="[{ required: true, message: '名称不能为空' }]">
                <a-input v-model:value="form.name" />
              </a-form-item>
              <a-form-item label="DEMO分类" style="width: 25%" name="catid"
                           :rules="[{ required: true, message: '分类不能为空' }]">

                <TreeSelect v-model:value="form.catid" style="width: 100%"
                            placeholder="Please select" allow-clear
                            :tree-data="state.cates" :fieldNames="{value:'id',label:'name'}" />

<!--                <a-select v-model:value="form.catid" allowClear>-->
<!--                  <a-select-option v-for="item in state.cates" :key="item.id" :value="item.id">-->
<!--                    {{ item.name }}-->
<!--                  </a-select-option>-->
<!--                </a-select>-->


              </a-form-item>
              <a-form-item label="DEMO编号" style="width: 25%">
                <span class="zinput" v-show="form.id"
                      style="margin-left: 5px;color: green">{{ form.senum }}</span>
                <span class="zinput" v-show="!form.id" style="margin-left: 5px;color: #b9abab">提交后自动生成</span>
              </a-form-item>
              <a-form-item label="DEMO地址" style="width: 100%">
                <a-input v-model:value="form.addre" />
              </a-form-item>
              <a-form-item label="DEMO等级" style="width: 50%">
                <a-select v-model:value="form.grade" allowClear>
                  <a-select-option v-for="item in state.grades" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="经办人" style="width: 50%">
                <a-input v-model:value="opmanName" readonly @click="openOpmanModal" />
              </a-form-item>
              <a-form-item label="明细行" style="width: 100%">
                <div style="margin-bottom: 6px;margin-top: 6px">
                  <vxe-table keep-source
                             border show-overflow ref="xTable" max-height="400"
                             :data="form.items"
                             :edit-config="{trigger: 'click', mode: 'row', icon: 'fa fa-pencil'}">
                    <vxe-column type="seq" width="50" align="center"
                                header-align="center"></vxe-column>
                    <vxe-column field="name" title="姓名" sortable
                                :edit-render="{autofocus: '.vxe-input--inner', defaultValue: ''}">
                      <template #edit="{ row }">
                        <vxe-input v-model="row.name" type="text"></vxe-input>
                      </template>
                    </vxe-column>
                    <vxe-column field="monum" title="手机号"
                                :edit-render="{autofocus: '.vxe-input--inner'}">
                      <template #edit="{ row }">
                        <vxe-input v-model="row.monum" type="text"></vxe-input>
                      </template>
                    </vxe-column>
                    <vxe-column field="email" title="邮箱" :edit-render="{}">
                      <template #edit="{ row }">
                        <vxe-input v-model="row.email" type="text"></vxe-input>
                      </template>
                    </vxe-column>
                    <vxe-column field="gender" title="性别" :edit-render="{}">
                      <template #default="{ row }">
                        <span>{{ formatGender(row.gender) }}</span>
                      </template>
                      <template #edit="{ row }">
                        <vxe-select v-model="row.gender" transfer>
                          <vxe-option v-for="item in genderList" :key="item.value"
                                      :value="item.value" :label="item.label"></vxe-option>
                        </vxe-select>
                      </template>
                    </vxe-column>
                    <vxe-column field="post" title="职务" :edit-render="{}">
                      <template #edit="{ row }">
                        <vxe-input v-model="row.post" type="text"></vxe-input>
                      </template>
                    </vxe-column>
                    <vxe-column field="notes" title="备注" :edit-render="{}">
                      <template #edit="{ row }">
                        <vxe-input v-model="row.notes"></vxe-input>
                      </template>
                    </vxe-column>
                    <vxe-column title="操作" width="50" show-overflow header-align="center"
                                align="center">
                      <template #header="{ row }">
                        <PlusCircleOutlined @click="insertEvent(-1)" style="font-size: 17px;" />
                      </template>
                      <template #default="{ row }">
                        <CloseCircleOutlined @click="delRow(row)" style="font-size: 17px;" />
                      </template>
                    </vxe-column>
                  </vxe-table>
                </div>
              </a-form-item>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="权限信息">
            <div class="zform-tab">
              <a-form-item label="备注：" style="width: 100%">
                <a-textarea :rows="4" v-model:value="form.notes" />
              </a-form-item>
              <a-form-item label="可查看者：" style="width: 50%">
                <a-textarea :rows="4" v-model:value="viewersName" readonly
                            @click="openViewersModal" />
              </a-form-item>
              <a-form-item label="可编辑者：" style="width: 50%">
                <a-textarea :rows="4" v-model:value="editorsName" readonly
                            @click="openEditorsModal" />
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
    <OrgModal @register="registerModal" @closeModal="closeOrgModal" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs, ref, computed, toRaw } from "vue";
import { useTabs } from "@/hooks/web/useTabs";
import { editInit, tabSave } from "@/comps/page/edit";
import { defHttp } from "@/utils/http/axios";
import OrgModal from "@/comps/org/OrgModal.vue";
import { useModal } from "@/components/Modal";
import { VxeTableInstance } from "vxe-table";
import { TreeSelect } from "ant-design-vue";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import { buildUUID } from "@/utils/uuid";

const { closeCurrent } = useTabs();

const [registerModal, { openModal }] = useModal();


const state = reactive({
  url: "/my/demo/main", cates: [] as any, grades: [] as any,
  form: { items: [] as any,viewers:[] as any, editors:[] as any,} as any
});

const { form } = toRefs(state);

onMounted(async () => {
  await editInit(state);
  state.cates = await defHttp.get({ url: "/my/demo/cate/treea" });
  state.grades = await defHttp.get({ url: "/ass/dict/data/list?maiid=DE_GRADE" });

});

const formRef = ref();

const save = async () => {
  form.value.items = xTable.value.getTableData().tableData;
  await tabSave(state, formRef.value, closeCurrent);
};


//region -----组织架构逻辑-----
const orgModal = ref();

const openOpmanModal = () => {
  openModal(true, {
    opener: "opman",
    orgType: 8
  });
};

const openViewersModal = () => {
  openModal(true, {
    opener: "viewers",
    orgType: 11,
    selectMode: 2,
    orgs: toRaw(form.value.viewers)
  });
};

const openEditorsModal = () => {
  openModal(true, {
    opener: "editors",
    orgType: 11,
    selectMode: 2,
    orgs: toRaw(form.value.editors)
  });
};

const closeOrgModal = (data: any) => {
  if (data.opener == "viewers") {
    if (data.orgs && data.orgs.length > 0) {
      form.value.viewers = data.orgs;
    } else {
      form.value.viewers = null;
    }
  } else if (data.opener == "editors") {
    if (data.orgs && data.orgs.length > 0) {
      form.value.editors = data.orgs;
    } else {
      form.value.editors = null;
    }
  } else if (data.opener == "opman") {
    console.log(111);
    if (data.orgs && data.orgs.length > 0) {
      form.value.opman = {};
      form.value.opman = { id: data.orgs[0].id, name: data.orgs[0].name };
      form.value.opmid = data.orgs[0].id;
    } else {
      form.value.opman = null;
      form.value.opmid = null;
    }
  }
};

const opmanName = computed(() => {
  return form.value.opman ? form.value.opman.name : "";
});

const viewersName = computed(() => {
  let names = "";
  if (form.value.viewers && form.value.viewers.length > 0) {
    for (const user of form.value.viewers) {
      names += user.name + "；";
    }
  }
  return names;
});

const editorsName = computed(() => {
  let names = "";
  if (form.value.editors && form.value.editors.length > 0) {
    for (const user of form.value.editors) {
      names += user.name + "；";
    }
  }
  return names;
});
//endregion

//region-----明细行逻辑-----
const xTable = ref({} as VxeTableInstance);
const genderList = ref([
  { label: "男", value: "m" },
  { label: "女", value: "f" }
]);

const formatGender = (value: any) => {
  if (value === "m") {
    return "男";
  }
  if (value === "f") {
    return "女";
  }
  return "";
};

const insertEvent = async (row: any) => {
  const $table = xTable.value;
  const record = { id: buildUUID() };
  const { row: newRow } = await $table.insertAt(record, row);
  await $table.setActiveCell(newRow, "name");
};
const delRow = (row: any) => {
  xTable.value.remove(row);
};
//endregion

</script>


