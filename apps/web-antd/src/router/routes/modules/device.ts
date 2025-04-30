import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: '设备管理',
      icon: 'ic:baseline-view-in-ar',
      order: 1000,
    },
    name: 'Device',
    path: '/device',
    children: [
      {
        meta: {
          title: '设备列表',
        },
        name: 'DeviceList',
        path: '/device/list',
        component: () => import('#/views/device/list.vue'),
      },
      {
        meta: {
          title: '设备详情',
          hideInMenu: true,
          activePath: '/device/list',
        },
        name: 'DeviceDetail',
        path: '/device/detail/:id',
        component: () => import('#/views/device/detail.vue'),
      },
    ],
  },
];
export default routes;
