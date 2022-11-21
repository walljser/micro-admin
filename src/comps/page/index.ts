import { defHttp } from "@/utils/http/axios";
import { VXETable } from "vxe-table";
import { buildUUID } from "@/utils/uuid";


export const listInit = (state, gridOptions) => {
  gridOptions.highlightHoverRow = true;
  gridOptions.checkboxConfig = {};
  gridOptions.height = "auto";
  // gridOptions.height = '600px';
  gridOptions.pagerConfig = { pageSize: 10 };
  gridOptions.proxyConfig = {
    ajax: {
      query: ({ page }) => {
        const qparams: any = Object.assign({}, state.form);
        qparams.page = `${page.currentPage}`;
        qparams.pageSize = `${page.pageSize}`;
        return defHttp.get({
          url: state.url,
          params: qparams
        });
      }
    }
  };
};

export const listQuery = (gridRef) => {
  gridRef.commitProxy("query");
};

export async function listDelete(url, gridRef) {
  const selectRecords = gridRef.getCheckboxRecords();
  if (selectRecords.length == 0) {
    await VXETable.modal.message({ content: "请选择后再进行删除", status: "warning" });
    return;
  }
  let ids = "";
  for (const selectRecord of selectRecords) {
    ids += selectRecord.id + ",";
  }
  const type = await VXETable.modal.confirm("您确定要删除吗？");
  if (type === "confirm") {
    // await VXETable.modal.message({content: '演示模式禁用了删除', status: 'warning'})
    await defHttp.delete({ url: url + "/" + ids.substr(0, ids.length - 1) });
    await gridRef.commitProxy("query");
  }
}


export const tabAdd = (go, url) => {
  go(url + "/edit?uuid=" + buildUUID());
};

export const tabEdit = (go, url, param) => {
  go(url + "/edit" + param);
};

