// import {defHttp} from "@/utils/http/axios";


// export function handleSubmit($form,vform,emit,url,) {
//     $form.validate(async function (data) {
//         if (data == undefined) {
//             try {
//                 vform.loading = true
//                 setDrawerProps({confirmLoading: true});
//                 if (vform.data['id']) {
//                     await defHttp.put({url, data: vform.data});
//                 } else {
//                     await defHttp.post({url, data: vform.data});
//                 }
//                 closeDrawer();
//                 emit('success');
//             } finally {
//                 vform.loading = false
//                 setDrawerProps({confirmLoading: false});
//             }
//         }
//     });
// }

import {defHttp} from "@/utils/http/axios";
import {VXETable} from "vxe-table";

export function handleSubmit($form, vform, emit, setDrawerProps, changeLoading, closeDrawer) {
    $form.validate(async function (data) {
        if (data == undefined) {
            try {
                setDrawerProps({confirmLoading: true});
                vform.loadingText = "保存中";
                changeLoading(true);
                if (vform.data['id']) {
                    await defHttp.put({url: vform.url, data: vform.data});
                } else {
                    await defHttp.post({url: vform.url, data: vform.data});
                }
                closeDrawer();
                emit('success');
            } finally {
                setDrawerProps({confirmLoading: false});
                changeLoading(false);
            }
        }else{
            VXETable.modal.message({content: '校验异常请修改', status: 'warning'})
        }
    });
}

