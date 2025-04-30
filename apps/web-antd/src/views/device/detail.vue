<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Button, Card, message, Tabs } from 'ant-design-vue';

import { getDeviceDetailApi } from '#/api';

import BasicInfo from './components/basic-info.vue';
import DeviceControl from './components/device-control.vue';
import DeviceData from './components/device-data.vue';
import LogManagement from './components/log-management.vue';

interface DeviceInfo {
  id: string;
  user: string;
  productName: string;
  organization: string;
  model: string;
  deviceType: string;
  osVersion: string;
  firstOnlineTime: string;
  lastLoginTime: string;
  onlineDuration: string;
}

const route = useRoute();
const router = useRouter();
const deviceId = route.params.id;

// 设备详情数据
const deviceDetail = ref<Partial<DeviceInfo>>({
  id: '',
  user: '',
  productName: '',
  organization: '',
  model: '',
  deviceType: '',
  osVersion: '',
  firstOnlineTime: '',
  lastLoginTime: '',
  onlineDuration: '',
});

// 获取设备详情
const fetchDeviceDetail = async () => {
  try {
    const res = await getDeviceDetailApi(deviceId as string);
    deviceDetail.value = res;
  } catch {
    message.error('获取设备详情失败');
  }
};

onMounted(() => {
  fetchDeviceDetail();
});

// 返回设备列表
const handleBack = () => {
  router.push('/device/list');
};
</script>

<template>
  <Page auto-content-height>
    <Card :title="`设备详情 - ${deviceDetail.id}`">
      <template #extra>
        <Button type="primary" @click="handleBack">返回列表</Button>
      </template>
    </Card>

    <Card class="mt-5">
      <Tabs>
        <!-- 基础信息 -->
        <Tabs.TabPane key="basic" tab="基础信息">
          <BasicInfo :device-detail="deviceDetail" />
        </Tabs.TabPane>

        <!-- 设备数据 -->
        <Tabs.TabPane key="data" tab="设备数据">
          <DeviceData :device-id="deviceId" />
        </Tabs.TabPane>

        <!-- 日志管理 -->
        <Tabs.TabPane key="logs" tab="日志管理">
          <LogManagement :device-id="deviceId" />
        </Tabs.TabPane>

        <!-- 设备管控 -->
        <Tabs.TabPane key="control" tab="设备管控">
          <DeviceControl :device-id="deviceId" />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  </Page>
</template>

<style scoped lang="scss">
:deep(.ant-card-extra) {
  .ant-btn {
    display: flex;
    gap: 4px;
    align-items: center;
  }
}

.mt-5 {
  margin-top: 20px;
}
</style>
