<script setup lang="ts">
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getDeviceListApi } from '#/api';

const router = useRouter();

interface RowType {
  id: string;
  name: string;
  state: string;
  type: string;
  productName: string;
  user: string;
  os: string;
  location: string;
  onlineTime: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '设备名称',
      componentProps: {
        placeholder: '请输入设备名称',
      },
    },
    {
      component: 'Select',
      fieldName: 'productName',
      label: '产品名称',
      componentProps: {
        placeholder: '请选择产品名称',
        options: [
          { label: '窄带物联网', value: '0' },
          { label: '宽带终端', value: '1' },
          { label: '窄带终端', value: '2' },
        ],
      },
    },
    {
      component: 'Select',
      fieldName: 'state',
      label: '设备状态',
      componentProps: {
        placeholder: '请选择设备状态',
        options: [
          { label: '在线', value: '在线' },
          { label: '离线', value: '离线' },
          { label: '未注册', value: '未注册' },
        ],
      },
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 60, fixed: 'left' },
    { field: 'id', title: '设备ID', minWidth: 180 },
    {
      field: 'name',
      title: '设备名称',
      minWidth: 120,
      slots: {
        default: ({ row }) => {
          return h(
            'a',
            {
              onClick: () => handleDeviceClick(row.id),
              class: 'device-name-link',
            },
            row.name,
          );
        },
      },
    },
    { field: 'state', title: '设备状态', minWidth: 100 },
    { field: 'type', title: '设备类型', minWidth: 100 },
    { field: 'productName', title: '所属产品', minWidth: 150 },
    { field: 'user', title: '所属用户', minWidth: 120 },
    { field: 'os', title: 'OS版本', minWidth: 100 },
    { field: 'location', title: '所属地区', minWidth: 120 },
    { field: 'onlineTime', title: '在线时长', minWidth: 100 },
  ],
  exportConfig: {},
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getDeviceListApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    refresh: true,
    resizable: true,
    search: true,
    zoom: true,
  },
  // 启用自动列宽
  autoResize: true,
  // 启用列宽拖动
  resizable: true,
  // 启用列宽自动调整
  showOverflow: true,
  // 启用表格滚动
  scrollX: {
    enabled: true,
  },
  scrollY: {
    enabled: true,
  },
};

// 点击设备名称跳转到详情页
const handleDeviceClick = (id: string) => {
  router.push(`/device/detail/${id}`);
};

const [Grid] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>

<style scoped lang="scss">
:deep(.vxe-table) {
  .vxe-body--row {
    .vxe-body--column {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

:deep(.device-name-link) {
  font-weight: 500;
  color: #1890ff;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: #40a9ff;
    text-decoration: underline;
  }

  &:active {
    color: #096dd9;
  }
}
</style>
