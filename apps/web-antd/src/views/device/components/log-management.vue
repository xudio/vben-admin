<script setup lang="ts">
import { Card } from 'ant-design-vue';
</script>

<template>
  <div class="tab-content">
    <Card title="日志管理" class="info-card">
      <!-- 日志管理内容 -->
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
