<template>
  <div class="fixed h-full w-full">
    <div class="v-edit">
      <div class="v-edit-head">
        <div class='zjustify'>
          <div>
            <div style="line-height: 32px">流程模板编辑</div>
          </div>
          <div>
            <a-button @click="pageSave()" class="v-btn-success"
                      style="margin-right: 8px;">保存
            </a-button>
            <a-button @click="closeCurrent">关闭</a-button>
          </div>
        </div>
      </div>
      <div class="v-edit-body">
        <a-form ref="formRef" :model="form" class="zform" layout="inline"
                :label-col="{style: {width: '160px'}}">
          <a-tabs type="card" style="width: 100%">
            <a-tab-pane key="1" tab="基本信息">
              <div class="zform-tab">
                <a-form-item label="模板名称" name="name" style="width: 50%"
                             :rules="[{ required: true, message: '名称不能为空' }]">
                  <a-input v-model:value="form.name" />
                </a-form-item>
                <a-form-item label="所属分类" name="cate" :rules="[{ required: true, message: '分类不能为空' }]" style="width: 50%" >
                  <a-input v-model:value="catna" readonly @click="selectCate" />
                </a-form-item>
                <a-form-item label="排序号" style="width: 50%">
                  <a-input-number v-model:value="form.ornum" style="width: 100%;min-width: 20px" />
                </a-form-item>
                <a-form-item label="是否可用" style="width: 50%">
                  <a-switch v-model:checked="form.avtag" />
                </a-form-item>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="表单配置">
              暂未找到解决方案
            </a-tab-pane>
            <a-tab-pane key="3" tab="流程配置">
              <div style="width: 100%;height: 720px;position: relative">
                <Modeler @bpmnMounted="bpmnMounted" />
                <Panel />
                <BpmnActions />
              </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="权限配置">
              <div class="zform-tab">
                <a-form-item label="备注1" style="width: 100%">
                  <a-textarea v-model:value="form.notes" :rows="6" />
                </a-form-item>
              </div>
            </a-tab-pane>
            <a-tab-pane key="5" tab="其他信息">
              <div class="zform-tab">
                <a-form-item label="备注2" style="width: 100%">
                  <a-textarea v-model:value="form.notes" :rows="6" />
                </a-form-item>
              </div>
            </a-tab-pane>

          </a-tabs>
        </a-form>
      </div>
      <CateModal ref="cateModalRef" @select="cateSelect" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs, computed, toRaw, ref } from "vue";
import { useTabs } from "@/hooks/web/useTabs";
import { tabSave } from "@/comps/page/edit";
import { useModal } from "@/components/Modal";
import CateModal from "@/comps/gen/GenModal.vue";
import Modeler from "@/comps/Activiti/Modeler";
import Panel from "@/comps/Activiti/panel";
import BpmnActions from "@/comps/Activiti/bpmn-actions";
import { BpmnStore } from "@/comps/Activiti/Bpmn/store";
import { useRoute } from "vue-router";
import { defHttp } from "@/utils/http/axios";
import { message } from "ant-design-vue";

const { closeCurrent } = useTabs();

const state = reactive({
  url: "/oa/flow/tmpl",
  form: { job: "" ,catna:''} as any
});

const { form } = toRefs(state);

onMounted(async () => {
  const route = useRoute();
  const id = route.query?.id;
  if (id) {
    state.form = await defHttp.get({ url: state.url + "/one/" + id });
  } else {
    state.form.avtag = true;
  }
});

async function bpmnMounted() {
  if (form.value.id) {
    await BpmnStore.importXML(form.value.prxml);
  } else {
    await BpmnStore.importXML(defxml);
  }
}

const formRef = ref(null);
const pageSave = async () => {
  try {
    const values = await formRef.value.validateFields();
    console.log("Success:", values);
  } catch (errorInfo) {
    let errors = "";
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      errors += errorInfo.errorFields[i].errors + ";";
    }
    message.warning("校验错误：" + errors);
    return false;
  }
  if(BpmnStore&&BpmnStore.modeler!=null){
    console.log(BpmnStore);
    const bpmn = await BpmnStore.getXML();
    form.value.prxml = bpmn.xml;
  }
  if(!form.value.prxml){
    form.value.prxml=defxml;
  }
  if (!state.form.crtim) {
    await defHttp.post({ url: state.url, data: state.form });
  } else {
    await defHttp.put({ url: state.url, data: state.form });
  }
  message.success("保存成功，1秒后页面按自动关闭");
  setTimeout(() => {
    window.close();
  }, 1000);
};




const defxml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
  "<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:activiti=\"http://activiti.org/bpmn\" id=\"sample-diagram\" targetNamespace=\"http://activiti.org/bpmn\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\">\n" +
  "  <bpmn2:process id=\"Process_1\" name=\"1\" isExecutable=\"true\">\n" +
  "    <bpmn2:startEvent id=\"N1\" name=\"开始节点\">\n" +
  "      <bpmn2:outgoing>L1</bpmn2:outgoing>\n" +
  "    </bpmn2:startEvent>\n" +
  "    <bpmn2:sequenceFlow id=\"L1\" sourceRef=\"N1\" targetRef=\"N2\" />\n" +
  "    <bpmn2:exclusiveGateway id=\"N9\" name=\"条件分支\">\n" +
  "      <bpmn2:documentation>判断审批金额是否大于100</bpmn2:documentation>\n" +
  "      <bpmn2:incoming>L4</bpmn2:incoming>\n" +
  "      <bpmn2:outgoing>L6</bpmn2:outgoing>\n" +
  "      <bpmn2:outgoing>L5</bpmn2:outgoing>\n" +
  "    </bpmn2:exclusiveGateway>\n" +
  "    <bpmn2:sequenceFlow id=\"L4\" sourceRef=\"N4\" targetRef=\"N9\" />\n" +
  "    <bpmn2:sequenceFlow id=\"L6\" name=\"王五分支线\" sourceRef=\"N9\" targetRef=\"N6\">\n" +
  "      <bpmn2:extensionElements>\n" +
  "        <activiti:executionListener expression=\"money&#60;=100\" event=\"take\" />\n" +
  "      </bpmn2:extensionElements>\n" +
  "    </bpmn2:sequenceFlow>\n" +
  "    <bpmn2:sequenceFlow id=\"L5\" name=\"李四分支线\" sourceRef=\"N9\" targetRef=\"N5\">\n" +
  "      <bpmn2:extensionElements>\n" +
  "        <activiti:executionListener expression=\"money&#62;100\" event=\"take\" />\n" +
  "      </bpmn2:extensionElements>\n" +
  "    </bpmn2:sequenceFlow>\n" +
  "    <bpmn2:sequenceFlow id=\"L7\" sourceRef=\"N5\" targetRef=\"N7\" />\n" +
  "    <bpmn2:sequenceFlow id=\"L8\" sourceRef=\"N6\" targetRef=\"N7\" />\n" +
  "    <bpmn2:endEvent id=\"N3\" name=\"结束节点\">\n" +
  "      <bpmn2:incoming>L2</bpmn2:incoming>\n" +
  "    </bpmn2:endEvent>\n" +
  "    <bpmn2:sequenceFlow id=\"L2\" sourceRef=\"N7\" targetRef=\"N3\" />\n" +
  "    <bpmn2:sequenceFlow id=\"L3\" sourceRef=\"N2\" targetRef=\"N4\" />\n" +
  "    <bpmn2:userTask id=\"N2\" name=\"起草节点\" activiti:assignee=\"z3\" activiti:candidateUsers=\"\">\n" +
  "      <bpmn2:documentation>起草节点，表单数据一般从绑定的表单提取</bpmn2:documentation>\n" +
  "      <bpmn2:extensionElements>\n" +
  "        <activiti:formProperty id=\"userid\" type=\"string\" />\n" +
  "        <activiti:formProperty id=\"money\" type=\"int\" />\n" +
  "        <activiti:properties>\n" +
  "          <activiti:property name=\"编辑\" value=\"edit\" />\n" +
  "          <activiti:property name=\"撤回\" value=\"back\" />\n" +
  "          <activiti:property name=\"提交\" value=\"commit\" />\n" +
  "        </activiti:properties>\n" +
  "      </bpmn2:extensionElements>\n" +
  "      <bpmn2:incoming>L1</bpmn2:incoming>\n" +
  "      <bpmn2:outgoing>L3</bpmn2:outgoing>\n" +
  "    </bpmn2:userTask>\n" +
  "    <bpmn2:userTask id=\"N4\" name=\"张三审批\" activiti:assignee=\"z3\" activiti:candidateUsers=\"\">\n" +
  "      <bpmn2:documentation>审批节点</bpmn2:documentation>\n" +
  "      <bpmn2:extensionElements>\n" +
  "        <activiti:properties>\n" +
  "          <activiti:property name=\"审批\" value=\"approve\" />\n" +
  "          <activiti:property name=\"驳回\" value=\"reject\" />\n" +
  "        </activiti:properties>\n" +
  "      </bpmn2:extensionElements>\n" +
  "      <bpmn2:incoming>L3</bpmn2:incoming>\n" +
  "      <bpmn2:outgoing>L4</bpmn2:outgoing>\n" +
  "    </bpmn2:userTask>\n" +
  "    <bpmn2:userTask id=\"N5\" name=\"李四审批\" activiti:assignee=\"l4\" activiti:candidateUsers=\"\">\n" +
  "      <bpmn2:extensionElements>\n" +
  "        <activiti:properties>\n" +
  "          <activiti:property name=\"审批\" value=\"approve\" />\n" +
  "          <activiti:property name=\"驳回\" value=\"reject\" />\n" +
  "        </activiti:properties>\n" +
  "      </bpmn2:extensionElements>\n" +
  "      <bpmn2:incoming>L5</bpmn2:incoming>\n" +
  "      <bpmn2:outgoing>L7</bpmn2:outgoing>\n" +
  "    </bpmn2:userTask>\n" +
  "    <bpmn2:userTask id=\"N6\" name=\"王五审批\" activiti:assignee=\"w5\" activiti:candidateUsers=\"\">\n" +
  "      <bpmn2:extensionElements>\n" +
  "        <activiti:properties>\n" +
  "          <activiti:property name=\"审批\" value=\"approve\" />\n" +
  "          <activiti:property name=\"驳回\" value=\"reject\" />\n" +
  "        </activiti:properties>\n" +
  "      </bpmn2:extensionElements>\n" +
  "      <bpmn2:incoming>L6</bpmn2:incoming>\n" +
  "      <bpmn2:outgoing>L8</bpmn2:outgoing>\n" +
  "    </bpmn2:userTask>\n" +
  "    <bpmn2:userTask id=\"N7\" name=\"赵六审批\" activiti:assignee=\"zhao6\" activiti:candidateUsers=\"\">\n" +
  "      <bpmn2:extensionElements>\n" +
  "        <activiti:formProperty id=\"userid\" type=\"string\" />\n" +
  "        <activiti:taskListener class=\"do some thing\" event=\"complete\" />\n" +
  "        <activiti:properties>\n" +
  "          <activiti:property name=\"审批\" value=\"approve\" />\n" +
  "        </activiti:properties>\n" +
  "      </bpmn2:extensionElements>\n" +
  "      <bpmn2:incoming>L7</bpmn2:incoming>\n" +
  "      <bpmn2:incoming>L8</bpmn2:incoming>\n" +
  "      <bpmn2:outgoing>L2</bpmn2:outgoing>\n" +
  "    </bpmn2:userTask>\n" +
  "  </bpmn2:process>\n" +
  "  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n" +
  "    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_0uh8wmt_di\" bpmnElement=\"L3\">\n" +
  "        <di:waypoint x=\"560\" y=\"200\" />\n" +
  "        <di:waypoint x=\"560\" y=\"250\" />\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_01hb865_di\" bpmnElement=\"L2\">\n" +
  "        <di:waypoint x=\"560\" y=\"670\" />\n" +
  "        <di:waypoint x=\"560\" y=\"732\" />\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_1t81399_di\" bpmnElement=\"L8\">\n" +
  "        <di:waypoint x=\"690\" y=\"550\" />\n" +
  "        <di:waypoint x=\"690\" y=\"630\" />\n" +
  "        <di:waypoint x=\"610\" y=\"630\" />\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_00vdr2t_di\" bpmnElement=\"L7\">\n" +
  "        <di:waypoint x=\"430\" y=\"550\" />\n" +
  "        <di:waypoint x=\"430\" y=\"630\" />\n" +
  "        <di:waypoint x=\"510\" y=\"630\" />\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_1bnjbaa_di\" bpmnElement=\"L5\">\n" +
  "        <di:waypoint x=\"535\" y=\"400\" />\n" +
  "        <di:waypoint x=\"430\" y=\"400\" />\n" +
  "        <di:waypoint x=\"430\" y=\"470\" />\n" +
  "        <bpmndi:BPMNLabel>\n" +
  "          <dc:Bounds x=\"456\" y=\"382\" width=\"55\" height=\"14\" />\n" +
  "        </bpmndi:BPMNLabel>\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_12ug1tp_di\" bpmnElement=\"L6\">\n" +
  "        <di:waypoint x=\"585\" y=\"400\" />\n" +
  "        <di:waypoint x=\"690\" y=\"400\" />\n" +
  "        <di:waypoint x=\"690\" y=\"470\" />\n" +
  "        <bpmndi:BPMNLabel>\n" +
  "          <dc:Bounds x=\"611\" y=\"382\" width=\"56\" height=\"14\" />\n" +
  "        </bpmndi:BPMNLabel>\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_1miguqf_di\" bpmnElement=\"L4\">\n" +
  "        <di:waypoint x=\"560\" y=\"330\" />\n" +
  "        <di:waypoint x=\"560\" y=\"375\" />\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNEdge id=\"Flow_1u6pmzo_di\" bpmnElement=\"L1\">\n" +
  "        <di:waypoint x=\"560\" y=\"68\" />\n" +
  "        <di:waypoint x=\"560\" y=\"120\" />\n" +
  "      </bpmndi:BPMNEdge>\n" +
  "      <bpmndi:BPMNShape id=\"Event_0byql27_di\" bpmnElement=\"N1\">\n" +
  "        <dc:Bounds x=\"542\" y=\"32\" width=\"36\" height=\"36\" />\n" +
  "        <bpmndi:BPMNLabel>\n" +
  "          <dc:Bounds x=\"539\" y=\"2\" width=\"43\" height=\"14\" />\n" +
  "        </bpmndi:BPMNLabel>\n" +
  "      </bpmndi:BPMNShape>\n" +
  "      <bpmndi:BPMNShape id=\"Gateway_0qd58o6_di\" bpmnElement=\"N9\" isMarkerVisible=\"true\">\n" +
  "        <dc:Bounds x=\"535\" y=\"375\" width=\"50\" height=\"50\" />\n" +
  "        <bpmndi:BPMNLabel>\n" +
  "          <dc:Bounds x=\"538\" y=\"432\" width=\"44\" height=\"14\" />\n" +
  "        </bpmndi:BPMNLabel>\n" +
  "      </bpmndi:BPMNShape>\n" +
  "      <bpmndi:BPMNShape id=\"Event_1h4oob7_di\" bpmnElement=\"N3\">\n" +
  "        <dc:Bounds x=\"542\" y=\"732\" width=\"36\" height=\"36\" />\n" +
  "        <bpmndi:BPMNLabel>\n" +
  "          <dc:Bounds x=\"539\" y=\"775\" width=\"43\" height=\"14\" />\n" +
  "        </bpmndi:BPMNLabel>\n" +
  "      </bpmndi:BPMNShape>\n" +
  "      <bpmndi:BPMNShape id=\"Activity_0g48n8q_di\" bpmnElement=\"N2\">\n" +
  "        <dc:Bounds x=\"510\" y=\"120\" width=\"100\" height=\"80\" />\n" +
  "      </bpmndi:BPMNShape>\n" +
  "      <bpmndi:BPMNShape id=\"Activity_04wpn1b_di\" bpmnElement=\"N4\">\n" +
  "        <dc:Bounds x=\"510\" y=\"250\" width=\"100\" height=\"80\" />\n" +
  "      </bpmndi:BPMNShape>\n" +
  "      <bpmndi:BPMNShape id=\"Activity_0j8meci_di\" bpmnElement=\"N5\">\n" +
  "        <dc:Bounds x=\"380\" y=\"470\" width=\"100\" height=\"80\" />\n" +
  "      </bpmndi:BPMNShape>\n" +
  "      <bpmndi:BPMNShape id=\"Activity_0pa1f64_di\" bpmnElement=\"N6\">\n" +
  "        <dc:Bounds x=\"640\" y=\"470\" width=\"100\" height=\"80\" />\n" +
  "      </bpmndi:BPMNShape>\n" +
  "      <bpmndi:BPMNShape id=\"Activity_0qmb4lo_di\" bpmnElement=\"N7\">\n" +
  "        <dc:Bounds x=\"510\" y=\"590\" width=\"100\" height=\"80\" />\n" +
  "      </bpmndi:BPMNShape>\n" +
  "    </bpmndi:BPMNPlane>\n" +
  "  </bpmndi:BPMNDiagram>\n" +
  "</bpmn2:definitions>\n";

//region -----分类弹框逻辑-----
const cateModalRef = ref();

const catna = computed(() => {
  return form.value.cate ? form.value.cate.name : "";
});

function selectCate() {
  cateModalRef.value.open({ url: "/oa/flow/cate/tree" });
}

function cateSelect(data) {
  console.log(data);
  form.value.cate = data;
  if (data != null) {
    form.value.catna = data.name;
    form.value.catid = data.id;
  } else {
    form.value.catna = null;
    form.value.catid = null;
  }
}
//endregion

</script>


