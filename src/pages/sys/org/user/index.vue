<template>
  <Wrap>
    <div class='p-left'>
      <GenTree @select="handleSelect" url="/gen/org/dept/tree"/>
    </div>
    <div class='p-right'>
      <div class="v-list" style="height: 100%;position:relative;overflow-y: auto;">
        <div class="v-list-head">
          <div class='zjustify'>
            <div>
              <a-input @keyup.enter="listQuery($refs.gridRef)" v-model:value="state.form.name" placeholder="输入名称回车查询" class='list-search'/>
              <a-button @click="listQuery($refs.gridRef)" class="v-btn-primary">查询</a-button>
              <a-button class="v-btn-primary more-button" @click="moreParams=!moreParams">
                <DownOutlined v-if="!moreParams"/>
                <UpOutlined v-if="moreParams"/>
              </a-button>
            </div>
            <div>
              <a-button @click="tabAdd(go,state.url)" class="v-btn-success" style="margin-right: 8px;">新增</a-button>
              <a-button @click="listDelete(state.url,$refs.gridRef)" class="v-btn-danger">删除</a-button>
            </div>
          </div>
          <div v-show='moreParams' class='more-params' ref="moreParamsRef">
            <a-form ref="formRef" :model="form" layout="inline" :label-col="{style: {width: '80px'}}">
              <a-form-item label="手机号" style="margin-bottom: 10px">
                <a-input v-model:value="form.monum"/>
              </a-form-item>
              <a-form-item label="工号" style="margin-bottom: 10px">
                <a-input v-model:value="form.usnam"/>
              </a-form-item>
              <a-form-item label="昵称" style="margin-bottom: 10px">
                <a-input v-model:value="form.ninam"/>
              </a-form-item>
            </a-form>
          </div>
        </div>
        <div class="v-list-body" :style='{ height: `calc(100vh - ${moreParamsHeight}`}'>
          <vxe-grid ref='gridRef' v-bind="gridOptions">
            <template #name_default="{ row }">
              <span @click="tabEdit(go,state.url,'?id='+row.id)" style="cursor:pointer;color: #3e9ece">
                {{ row.name }}
              </span>
            </template>
          </vxe-grid>
        </div>
      </div>
    </div>
  </Wrap>
</template>
<script lang="ts">
export default {name: 'sysOrgUser'}
</script>
<script lang="ts" setup>
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import {onMounted, reactive, computed, toRefs, ref, nextTick, watch} from 'vue'
import {VxeGridProps} from 'vxe-table'
import {listInit, listQuery, listDelete, tabAdd, tabEdit} from '@/comps/page/index';
import {useGo} from "@/hooks/web/usePage";
import GenTree from '@/comps/gen/GenTree.vue';
import Wrap from '@/comps/page/Wrap.vue';

const moreParams = ref(false);
const moreParamsRef = ref();
const moreParamsHeight = ref('141px');
watch(moreParams, () => {
  nextTick().then(() => {
    if (moreParamsRef && moreParamsRef.value) {
      if (moreParamsRef.value.offsetHeight) {
        moreParamsHeight.value = (moreParamsRef.value.offsetHeight + 146) + 'px';
      } else {
        moreParamsHeight.value = '141px';
      }
    }
  });
}, {immediate: true})

const go = useGo();

const state = reactive({
  url: '/sys/org/user',
  form: {} as any,
});

const {form} = toRefs(state);

const gridOptions = reactive<VxeGridProps>({
  columns: [
    {type: 'checkbox', align: 'center', width: 42, fixed: 'left'},
    {type: 'seq', align: 'center', width: 50, fixed: 'left'},
    {field: 'name', title: '用户名称', width: 300, fixed: 'left', slots: {default: 'name_default'}},
    {field: 'crtim', title: '创建时间', width: 160},
    {field: 'uptim', title: '更新时间', width: 160},
    {field: 'notes', title: '备注'}
  ],
});

onMounted(() => {
  listInit(state, gridOptions);
});


const gridRef=ref();
function handleSelect(node) {
  if(node!=null){
    form.value.depid = node.id;
    form.value.depna = node.name;
  }else{
    form.value.depid = '';
    form.value.depna = '';
  }
  listQuery(gridRef.value)
}

</script>


<style>


</style>

