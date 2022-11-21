import {VXETable} from "vxe-table";
import {defHttp} from "@/utils/http/axios";

export async function deleteEvent($grid) {
    let url = $grid.id;
    if ($grid.params && $grid.params.url) {
        url = $grid.params.url;
    }
    const selectRecords = $grid.getCheckboxRecords();
    if (selectRecords.length == 0) {
        await VXETable.modal.message({content: '请选择后再进行删除', status: 'warning'})
        return;
    }
    let ids = '';
    for (const selectRecord of selectRecords) {
        ids += selectRecord.id + ',';
    }
    const type = await VXETable.modal.confirm('您确定要删除吗？');
    if (type === 'confirm') {
        // await VXETable.modal.message({content: '演示模式禁用了删除', status: 'warning'})
        await defHttp.delete({url: url + '/' + ids.substr(0, ids.length - 1)});
        await $grid.commitProxy('query');
    }
}

export async function deleteAllEvent($grid) {
    let url = $grid.id;
    if ($grid.params && $grid.params.url) {
        url = $grid.params.url;
    }
    const type = await VXETable.modal.confirm('您确定要清空吗？');
    if (type === 'confirm') {
        // await VXETable.modal.message({content: '演示模式禁用了删除', status: 'warning'})
        await defHttp.delete({url: url + '/all'});
        await $grid.commitProxy('query');
    }
}

export function createOption(id, params, formData, columns) {
    return {
        id: id, highlightHoverRow: true, checkboxConfig: {}, height: 'auto',
        pagerConfig: {pageSize: window.innerHeight < 610 ? 8 : window.innerHeight > 900 ? 16 : 10},
        toolbarConfig: {
            slots: {buttons: 'tbtns'},
            refresh: true, zoom: true, custom: true
        },
        proxyConfig: {
            ajax: {
                query: ({page}) => {
                    const qparams: any = Object.assign({}, formData)
                    qparams.page = `${page.currentPage}`;
                    qparams.pageSize = `${page.pageSize}`;
                    return defHttp.get({
                        url: params && params.url ? params.url : id,
                        params: qparams
                    })
                },
            }
        },
        columns: columns,
        params: params,
    }
}

export function addEvent(record: any, openDrawer) {
    openDrawer(true, {
        isUpdate: false,
        record: record
    });
}


export function editEvent(record: any, openDrawer) {
    openDrawer(true, {
        isUpdate: true,
        record: record
    });
}

export async function removeEvent(record:any,$grid){
    const type = await VXETable.modal.confirm('您确定要删除吗？');
    if (type === 'confirm') {
        // await VXETable.modal.message({content: '演示模式禁用了删除', status: 'warning'})
        await defHttp.delete({url: $grid.id + '/' + record.id});
        await $grid.commitProxy('query');
    }
}
