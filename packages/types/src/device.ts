export interface DeviceInfo {
  id: string;
  name: string;
  status: string;
  type: string;
  product: string;
  user: string;
  os: string;
  location: string;
  time: string;
  description: string;
  createTime: string;
  lastUpdateTime: string;
  parameters?: {
    humidity: number;
    pressure: number;
    temperature: number;
  };
  maintenance?: {
    lastCheck: string;
    nextCheck: string;
    status: string;
  };
}

export interface DeviceListParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  name?: string;
  product?: string;
  status?: string;
  [key: string]: any;
}
