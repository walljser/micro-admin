import {useRoute} from "vue-router";
import {defHttp} from "@/utils/http/axios";
import { message } from "ant-design-vue";


export const editInit=async (state)=>{
    const route = useRoute();
    const id=route.query?.id;
    if (id) {
        state.form = await defHttp.get({url: state.url + '/one/' + id});
    } else {
        state.form.avtag = true;
    }
}

export const tabSave=async (state,formRef,tabClose)=>{
    try {
        const values = await formRef.validateFields();
        console.log('Success:', values);
    } catch (errorInfo) {
      let errors='';
      for (let i = 0; i < errorInfo.errorFields.length; i++) {
        errors+=errorInfo.errorFields[i].errors+";"
      }
      console.log(errors);
      message.warning('校验错误：'+errors);
        return false;
    }
    if (!state.form.crtim) {
        await defHttp.post({url: state.url, data: state.form});
    } else {
        await defHttp.put({url:state.url, data: state.form});
    }
    tabClose();
}
