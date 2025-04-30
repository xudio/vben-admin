<script setup lang="ts">
import { ref } from 'vue';

import { Card, Switch } from 'ant-design-vue';

// 设备管控 - 硬件管控
const hardwareControl = ref({
  camera: false,
  microphone: false,
  wifi: false,
  bluetooth: false,
  gps: false,
  led: false,
});

// 设备管控 - 安全管控
const securityControl = ref({
  reboot: false,
  wakeup: false,
  erase: false,
  reset: false,
  destroy: false,
});

// 设备管控 - 软件管控
const softwareControl = ref({
  im: false,
  xingzhilian: false,
  browser: false,
  input: false,
  software1: false,
  software2: false,
  software3: false,
  software4: false,
});
</script>

<template>
  <div class="tab-content">
    <Card title="硬件管控" class="info-card">
      <div class="switch-list">
        <div class="switch-item">
          <span>摄像头</span>
          <Switch v-model:checked="hardwareControl.camera" />
        </div>
        <div class="switch-item">
          <span>麦克风</span>
          <Switch v-model:checked="hardwareControl.microphone" />
        </div>
        <div class="switch-item">
          <span>WiFi</span>
          <Switch v-model:checked="hardwareControl.wifi" />
        </div>
        <div class="switch-item">
          <span>蓝牙</span>
          <Switch v-model:checked="hardwareControl.bluetooth" />
        </div>
        <div class="switch-item">
          <span>GPS</span>
          <Switch v-model:checked="hardwareControl.gps" />
        </div>
        <div class="switch-item">
          <span>LED灯</span>
          <Switch v-model:checked="hardwareControl.led" />
        </div>
      </div>
    </Card>
    <Card title="安全管控" class="info-card">
      <div class="switch-list">
        <div class="switch-item">
          <span>重启</span>
          <Switch v-model:checked="securityControl.reboot" />
        </div>
        <div class="switch-item">
          <span>唤醒</span>
          <Switch v-model:checked="securityControl.wakeup" />
        </div>
        <div class="switch-item">
          <span>数据擦除</span>
          <Switch v-model:checked="securityControl.erase" />
        </div>
        <div class="switch-item">
          <span>恢复出厂</span>
          <Switch v-model:checked="securityControl.reset" />
        </div>
        <div class="switch-item">
          <span>一键销毁</span>
          <Switch v-model:checked="securityControl.destroy" />
        </div>
      </div>
    </Card>
    <Card title="软件管控" class="info-card">
      <div class="switch-list">
        <div class="switch-item">
          <span>即时通信</span>
          <Switch v-model:checked="softwareControl.im" />
        </div>
        <div class="switch-item">
          <span>星智联</span>
          <Switch v-model:checked="softwareControl.xingzhilian" />
        </div>
        <div class="switch-item">
          <span>浏览器</span>
          <Switch v-model:checked="softwareControl.browser" />
        </div>
        <div class="switch-item">
          <span>输入法</span>
          <Switch v-model:checked="softwareControl.input" />
        </div>
        <div class="switch-item">
          <span>软件1</span>
          <Switch v-model:checked="softwareControl.software1" />
        </div>
        <div class="switch-item">
          <span>软件2</span>
          <Switch v-model:checked="softwareControl.software2" />
        </div>
        <div class="switch-item">
          <span>软件3</span>
          <Switch v-model:checked="softwareControl.software3" />
        </div>
        <div class="switch-item">
          <span>软件4</span>
          <Switch v-model:checked="softwareControl.software4" />
        </div>
      </div>
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

.switch-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  margin-top: 8px;
}

.switch-item {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 180px;
  font-size: 15px;
}
</style>
