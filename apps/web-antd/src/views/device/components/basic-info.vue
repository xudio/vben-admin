<script setup lang="ts">
import { h, ref } from 'vue';

import { Button, Card, Descriptions, Popconfirm, Table } from 'ant-design-vue';

interface GroupRecord {
  id: number;
  name: string;
  createTime: string;
  permission: string;
  validUntil: string;
}

interface DeviceDetail {
  id: string;
  user: string;
  productName: string;
  organization: string;
  model: string;
  type: string;
  os: string;
  firstOnlineTime: string;
  lastLoginTime: string;
  onlineTime: string;
}

interface Props {
  deviceDetail: Partial<DeviceDetail>;
}

const { deviceDetail } = defineProps<Props>();

// 模拟群组数据
const groupList = ref<GroupRecord[]>([
  {
    id: 1,
    name: '研发组',
    createTime: '2024-03-01',
    permission: '管理员',
    validUntil: '2024-12-31',
  },
  {
    id: 2,
    name: '测试组',
    createTime: '2024-03-05',
    permission: '普通成员',
    validUntil: '2024-12-31',
  },
]);

// 删除群组
const handleDeleteGroup = (id: number) => {
  groupList.value = groupList.value.filter((item) => item.id !== id);
};

// 群组表格列定义
const groupColumns = [
  {
    title: '群组名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '群组权限',
    dataIndex: 'permission',
    key: 'permission',
  },
  {
    title: '有效期',
    dataIndex: 'validUntil',
    key: 'validUntil',
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    customRender: ({ record }: { record: GroupRecord }) => {
      return h(
        Popconfirm,
        {
          title: '确定要删除该群组吗？',
          onConfirm: () => handleDeleteGroup(record.id),
        },
        {
          default: () =>
            h(
              Button,
              {
                type: 'link',
                danger: true,
              },
              {
                default: () => '删除',
              },
            ),
        },
      );
    },
  },
];
</script>

<template>
  <div class="tab-content">
    <!-- 设备信息 -->
    <Card title="设备信息" class="info-card">
      <Descriptions :column="2" bordered>
        <Descriptions.Item label="所属用户">
          {{ deviceDetail.user }}
        </Descriptions.Item>
        <Descriptions.Item label="所属产品">
          {{ deviceDetail.productName }}
        </Descriptions.Item>
        <Descriptions.Item label="所属组织">
          {{ deviceDetail.organization }}
        </Descriptions.Item>
        <Descriptions.Item label="设备型号">
          {{ deviceDetail.model }}
        </Descriptions.Item>
        <Descriptions.Item label="设备类型">
          {{ deviceDetail.type }}
        </Descriptions.Item>
        <Descriptions.Item label="OS版本">
          {{ deviceDetail.os }}
        </Descriptions.Item>
        <Descriptions.Item label="设备初次上线时间">
          {{ deviceDetail.firstOnlineTime }}
        </Descriptions.Item>
        <Descriptions.Item label="上次登录">
          {{ deviceDetail.lastLoginTime }}
        </Descriptions.Item>
        <Descriptions.Item label="在线时长">
          {{ deviceDetail.onlineTime }}
        </Descriptions.Item>
      </Descriptions>
    </Card>

    <!-- 所属群组 -->
    <Card title="所属群组" class="info-card">
      <Table
        :columns="groupColumns"
        :data-source="groupList"
        :pagination="false"
        row-key="id"
      />
    </Card>
  </div>
</template>

<style scoped lang="scss">
.tab-content {
  min-height: 300px;
  padding: 24px;
}

.info-card {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
