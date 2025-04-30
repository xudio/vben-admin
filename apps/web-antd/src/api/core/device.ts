import type { DeviceInfo, DeviceListParams } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取设备列表
 */
export async function getDeviceListApi(params: DeviceListParams) {
  return requestClient.get<DeviceInfo[]>('/device/list', { params });
}

/**
 * 获取设备详情
 */
export async function getDeviceDetailApi(id: string) {
  return requestClient.get<DeviceInfo>('/device/detail', { params: { id } });
}
