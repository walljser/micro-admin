import type { AppRouteModule } from "@/router/types";

import { LAYOUT } from "@/router/constant";

const system: AppRouteModule = {
  path: "/sys",
  name: "Sys",
  component: LAYOUT,
  redirect: "/sys/org/user",
  meta: {
    orderNo: 1,
    icon: "ant-design:setting-outlined",
    title: "系统管理"
  },
  children: [
    {
      path: "/sys/org",
      name: "sysOrg",
      component: LAYOUT,
      redirect: "/sys/org/user",
      meta: {
        orderNo: 1,
        icon: "ant-design:partition-outlined",
        title: "组织架构"
      },
      children: [
        {
          path: "dept",
          name: "sysOrgDept",
          meta: {
            title: "部门管理",
            ignoreKeepAlive: false
          },
          component: () => import("@/pages/sys/org/dept/index.vue")
        },
        {
          path: "dept/edit",
          name: "sysOrgDeptEdit",
          meta: {
            title: "部门编辑",
            ignoreKeepAlive: false,
            isHide: true
          },
          component: () => import("@/pages/sys/org/dept/edit.vue")
        },
        {
          path: "user",
          name: "sysOrgUser",
          meta: {
            title: "用户管理",
            ignoreKeepAlive: false
          },
          component: () => import("@/pages/sys/org/user/index.vue")
        },
        {
          path: "user/edit",
          name: "sysOrgUserEdit",
          meta: {
            title: "用户编辑",
            ignoreKeepAlive: false,
            isHide: true
          },
          component: () => import("@/pages/sys/org/user/edit.vue")
        },
        {
          path: "post",
          name: "sysOrgPost",
          meta: {
            title: "岗位管理",
            ignoreKeepAlive: false
          },
          component: () => import("@/pages/sys/org/post/index.vue")
        },
        {
          path: "post/edit",
          name: "sysOrgPostEdit",
          meta: {
            title: "岗位编辑",
            ignoreKeepAlive: false,
            isHide: true
          },
          component: () => import("@/pages/sys/org/post/edit.vue")
        },
        {
          path: "group",
          name: "sysOrgGroup",
          meta: {
            title: "群组管理",
            ignoreKeepAlive: false
          },
          component: () => import("@/pages/sys/org/group/index.vue")
        },
        {
          path: "group/edit",
          name: "sysOrgGroupEdit",
          meta: {
            title: "群组编辑",
            ignoreKeepAlive: false,
            isHide: true
          },
          component: () => import("@/pages/sys/org/group/edit.vue")
        }
      ]
    },
    {
      path: "/sys/portal",
      name: "SysPortal",
      component: LAYOUT,
      redirect: "/sys/portal/main",
      meta: {
        orderNo: 2,
        icon: "ant-design:safety-certificate-outlined",
        title: "门户管理"
      },
      children: [
        {
          path: "main",
          name: "SysPortalMain",
          meta: {
            title: "门户清单",
            ignoreKeepAlive: false
          },
          component: () => import("@/pages/sys/portal/main/index.vue")
        },
        {
          path: "main/edit",
          name: "SysPortalMainEdit",
          meta: {
            title: "门户编辑",
            ignoreKeepAlive: false,
            isHide: true
          },
          component: () => import("@/pages/sys/portal/main/edit.vue")
        },
        {
          path: "menu",
          name: "SysPortalMenu",
          meta: {
            title: "门户菜单",
            ignoreKeepAlive: false
          },
          component: () => import("@/pages/sys/portal/menu/index.vue")
        },
        {
          path: "role",
          name: "SysPortalRole",
          meta: {
            title: "门户角色",
            ignoreKeepAlive: false
          },
          component: () => import("@/pages/sys/portal/role/index.vue")
        }
      ]
    }
  ]
};

export default system;
