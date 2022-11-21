<template>
  <!--  <BasicModal v-bind="$attrs" @register="registerModal" title="组织架构选择" width="1000px" :height="440" :dialog-style="{ top: dialogTop }" @ok="closeOrgModal">-->
  <BasicModal v-bind="$attrs" @register="registerModal" title="组织架构选择" width="1000px" :height="440" @ok="closeOrgModal">
    <PageWrapper dense contentClass="flex">
      <Tabs type="card" class="w-2/3 xl:w-2/3" @change="tabChange">
        <!--region 1.最近使用-->
        <TabPane key="1">
          <template #tab>
            <span><HistoryOutlined/>快捷搜索</span>
          </template>
          <div>
            <a-input-search @search="onSearch" v-model:value="receSearch" placeholder="请输入关键字查询" style="width: 200px;"/>
            <a-button type="primary" style="margin-left: 10px" @click="onSearch">查询</a-button>
          </div>
          <div style="margin-top: 5px;overflow: auto;height:353px;border: 1px solid #ccc">
            <ul class="z-org-search" id="zOrgSearch" style="padding: 2px">
              <li v-for="item in receItems" :key="item.id" class="f-user" @click="receItemClick(item)">
                <Checkbox v-model:checked="item.checked"/>
                <img class="vben-header-user-dropdown__header" src="https://zsvg.gitee.io/vboot-vue/public/xiaoyoutai.png">
                <span class="layui-elip f-user-name">{{ item.name }}</span>
                <span class="layui-elip f-user-dept">{{ item.dept }}</span>
              </li>
            </ul>
          </div>
        </TabPane>
        <!--endregion-->

        <!--region 2.层级架构-->
        <TabPane key="2">
          <template #tab>
            <span><ApartmentOutlined/>层级架构</span>
          </template>
          <Row>
            <Col :span="12">
              <div style="height: 390px;border: 1px solid #ccc">
                <BasicTree title="部门列表" toolbar search :treeData="treeData" :fieldNames="{ key: 'id', title: 'name' }" @select="handleSelect"/>
              </div>
            </Col>
            <Col :span="12">
              <div style="border: 1px solid #ccc;height: 390px;margin-left: 5px;overflow: auto">
                <ul class="z-org-tree">

                  <li v-for="item in tierItems" :key="item.id" class="f-user" title="444444444" @click="tierItemClick(item)">
                    <Checkbox v-model:checked="item.checked"/>
                    <img class="vben-header-user-dropdown__header" src="https://zsvg.gitee.io/vboot-vue/public/xiaoyoutai.png">
                    <span class="layui-elip f-user-name">{{ item.name }}</span>
                    <span class="layui-elip f-user-dept">{{ item.dept }}</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
        <!--endregion-->

        <!--region 3.常用群组-->
        <TabPane key="3">
          <template #tab>
            <span><TeamOutlined/>常用群组</span>
          </template>
          暂不支持，待开发
        </TabPane>
        <!--endregion-->

        <!--region 4.我的收藏-->
        <TabPane key="4">
          <template #tab>
            <span><HeartOutlined/>我的收藏</span>
          </template>
          这个也暂不支持，待开发
        </TabPane>

        <!--endregion-->
      </Tabs>

      <!--region 已选结构-->
      <div class="w-1/3 xl:w-1/3" style="margin-left: 5px;">
        <div style="height: 30px;">
          <div style="margin-top: 16px">已 选</div>
        </div>
        <div style="border: 1px solid #ccc;height: 390px;overflow: auto;">
          <ul class="z-org-selected" style="position: relative">
            <li v-for="item in selectedItems" :key="item.id" class="f-user" style="overflow: hidden;">
              <CloseCircleOutlined @click="selectedItemClick(item)"/>
              <img class="vben-header-user-dropdown__header" src="https://zsvg.gitee.io/vboot-vue/public/xiaoyoutai.png">
              <span class="layui-elip f-user-name2">{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!--endregion-->

    </PageWrapper>


  </BasicModal>
</template>
<script lang="ts" setup>
import {CloseCircleOutlined, ApartmentOutlined, HistoryOutlined, HeartOutlined, TeamOutlined} from '@ant-design/icons-vue';
import {Tabs, TabPane} from 'ant-design-vue';
import {Row, Col, Checkbox} from 'ant-design-vue';
import {onMounted, reactive, ref, toRaw} from 'vue';
import {BasicModal, useModalInner} from '@/components/Modal';
import {BasicTree, TreeItem} from '@/components/Tree';
import {PageWrapper} from '@/components/Page';
import {defHttp} from "@/utils/http/axios";

let p_org_type = -1;//0为综合，1为机构,2为部门,4为岗位,8为用户,16为常用群组,32为角色线
let p_tab_key = '1';
let p_select_mode = 1;//1单选，2多选
let p_opener = null;//弹框打开者标记

// let p_rece_init_flag = false;//最近使用页签初始化标记
let p_tier_init_flag = false;//层级架构页签初始化标记


// onMounted(() => {
//
// });


//region z.1 弹框代码
const emit = defineEmits(['closeModal', 'register']);
const dialogTop = (window.innerHeight < 650 ? 45 : 100) + 'px';

const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  if (p_org_type != data.orgType) {
    p_org_type = data.orgType;
    await receInit();
    tierItems.value.splice(0,tierItems.value.length);
  }
  p_select_mode = data.selectMode;
  p_opener = data.opener;
  //1.初始化
  selectedItems.value = data.orgs ? data.orgs : [];
  //2.设置最近使用与层级架构里item的check状态
  if (p_tab_key === '1') {
    for (const rItem of receItems.value) {
      for (const sItem of selectedItems.value) {
        let flag = false;
        if (sItem.id == rItem.id) {
          rItem.checked = true;
          flag = true;
          break;
        }
        if (!flag) {
          rItem.checked = false;
        }
      }
    }
  } else if (p_tab_key === '2') {
    for (const tItem of tierItems.value) {
      for (const sItem of selectedItems.value) {
        let flag = false;
        if (sItem.id == tItem.id) {
          tItem.checked = true;
          flag = true;
          break;
        }
        if (!flag) {
          tItem.checked = false;
        }
      }
    }
  }
});

function closeOrgModal() {
  try {
    setModalProps({confirmLoading: true});
    closeModal();
    if(selectedItems.value&&selectedItems.value.length>0){
      //更新后台数据库最近使用的ORGS
      defHttp.post({url: '/gen/org/rece', data: toRaw(selectedItems.value)})
    }
    const backData = {
      opener: p_opener,
      orgs: toRaw(selectedItems.value)
    }
    emit('closeModal', backData);
  } finally {
    setModalProps({confirmLoading: false});
  }
}

//endregion

//region z.2 Tab切换
async function tabChange(key) {
  p_tab_key = key;
  if (key === "1") {
    for (const rItem of receItems.value) {
      let flag = false;
      for (const sItem of selectedItems.value) {
        if (sItem.id == rItem.id) {
          rItem.checked = true;
          flag = true;
          break;
        }
      }
      if (!flag) {
        rItem.checked = false;
      }
    }
  } else if (key === "2") {
    if (!p_tier_init_flag) {
      await tierInit();
      p_tier_init_flag = true;
    }
    for (const tItem of tierItems.value) {
      let flag = false;
      for (const sItem of selectedItems.value) {
        if (sItem.id == tItem.id) {
          tItem.checked = true;
          flag = true;
          break;
        }
      }
      if (!flag) {
        tItem.checked = false;
      }
    }
  }
}

//endregion


//region x.1 最近使用
const receItems = ref<any[]>([]);
const receSearch = ref("");

async function onSearch() {
  receItems.value = await defHttp.get({url: '/gen/org/main?type=' + p_org_type, params: {name: receSearch.value}});
  for (const rItem of receItems.value) {
    let flag = false;
    for (const sItem of selectedItems.value) {
      if (sItem.id == rItem.id) {
        rItem.checked = true;
        flag = true;
        break;
      }
    }
    if (!flag) {
      rItem.checked = false;
    }
  }
}

async function receInit() {
  receItems.value = await defHttp.get({url: '/gen/org/rece?type=' + p_org_type});


}


function receItemClick(item) {
  item.checked = !item.checked;
  if (p_select_mode == 1) {//单选
    if (selectedItems.value.length > 0) {
      selectedItems.value.splice(0, 1);
    }
    selectedItems.value.push(item);
    for (let i = 0; i < receItems.value.length; i++) {
      if (receItems.value[i].id !== item.id) {
        receItems.value[i].checked = false;
      }
    }
    // closeOrgModal();改成不自动关
  } else {//多选
    if (item.checked) {
      let flag = false;
      for (const sItem of selectedItems.value) {
        if (sItem.id === item.id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        selectedItems.value.push(item);
      }
    } else {
      for (let i = 0; i < selectedItems.value.length; i++) {
        if (selectedItems.value[i].id === item.id) {
          selectedItems.value.splice(i, 1);
          break;
        }
      }
    }
  }
}

//endregion

//region x.2 层级架构
const treeData = ref<TreeItem[]>([]);

async function tierInit() {
  treeData.value = (await defHttp.get({url: '/gen/org/dept/tree'})) as unknown as TreeItem[];
}

const tierItems = ref<any[]>([]);

async function handleSelect(keys) {
  if (keys.length > 0) {
    tierItems.value = await defHttp.get({url: '/gen/org/main?type=' + p_org_type, params: {depid: keys[0]}})
    for (const tItem of tierItems.value) {
      for (const sItem of selectedItems.value) {
        if (sItem.id === tItem.id) {
          tItem.checked = true;
          break;
        }
      }
    }
  }
}

function tierItemClick(item) {
  item.checked = !item.checked;
  if (p_select_mode == 1) {//单选
    if (selectedItems.value.length > 0) {
      selectedItems.value.splice(0, 1);
    }
    selectedItems.value.push(item);
    for (let i = 0; i < tierItems.value.length; i++) {
      if (tierItems.value[i].id !== item.id) {
        tierItems.value[i].checked = false;
      }
    }
    // closeOrgModal();改成不自动关
  } else {//多选
    if (item.checked) {
      let flag = false;
      for (const sItem of selectedItems.value) {
        if (sItem.id === item.id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        selectedItems.value.push(item);
      }
    } else {
      for (let i = 0; i < selectedItems.value.length; i++) {
        if (selectedItems.value[i].id === item.id) {
          selectedItems.value.splice(i, 1);
          break;
        }
      }
    }
  }
}

//endregion

//region x.3 常用群组

//endregion

//region x.4 我的收藏

//endregion


//region c.1 已选逻辑
const selectedItems = ref<any[]>([]);

function selectedItemClick(item) {
  if (p_tab_key === '1') {
    for (let i = 0; i < receItems.value.length; i++) {
      if (receItems.value[i].id === item.id) {
        receItems.value[i].checked = false;
        break;
      }
    }
  } else if (p_tab_key === '2') {
    for (let i = 0; i < tierItems.value.length; i++) {
      if (tierItems.value[i].id === item.id) {
        tierItems.value[i].checked = false;
        break;
      }
    }
  }
  for (let j = 0; j < selectedItems.value.length; j++) {
    if (selectedItems.value[j].id === item.id) {
      selectedItems.value.splice(j, 1);
      break;
    }
  }
}

//endregion


</script>

<style lang="less" scoped>
.layui-elip {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.f-user:before,
.f-user:after {
  content: " ";
  display: table;
}

.f-user:after {
  clear: both;
}

.f-user input, .f-user label {
  float: left;
  margin-top: 14px;
  margin-right: 8px;
}

.f-user img {
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 8px;
}


.f-user .f-user-name,
.f-user .f-user-dept {
  display: block;
}

.f-user .f-user-name {
  margin-top: 6px;
}

.f-user .f-user-dept {
  color: #a599b2;
}

/*最近*/
.z-org-recently li {
  width: 33%;
  float: left;
  cursor: pointer;
  padding: 5px;
}

.z-org-recently li:hover {
  background-color: #f7efec;
}

/*搜索查询*/
.z-org-search li {
  /*width: 280px;*/
  width: 50%;
  float: left;
  cursor: pointer;
  padding: 2px;
  //margin: 3px;
}

.z-org-search li:hover {
  background-color: #f7efec;
}

/*!*组织架构树*!*/
.z-org-tree li {
  margin: 3px;
  cursor: pointer;
  padding: 3px;
}

.z-org-tree li:hover {
  background-color: #f7efec;
}

/*已选的*/
.z-org-selected li {
  margin: 3px;
  cursor: pointer;
  padding: 3px;
}

.z-org-selected li:hover {
  background-color: #f7efec;
}

.z-org-selected .f-user .anticon-close-circle {
  //float: left;
  //position:relative;
  position: absolute;
  //position:fixed;
  color: #f26b96;
  font-size: 20px;
  display: none;
  margin-left: 42px;
}

.z-org-selected li:hover .anticon-close-circle {
  display: inline;
}

.z-org-selected .f-user img {
  display: inline;
  //float: none;
}

.z-org-selected .f-user-name2 {
  display: block;
  margin-top: 14px;
}
</style>
