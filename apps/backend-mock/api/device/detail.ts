import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

// 生成设备详情数据
function generateDeviceDetail(id: string) {
  return {
    id,
    name: `设备${id.slice(0, 4)}`,
    state: faker.helpers.arrayElement(['正常', '故障', '维修中']),
    type: faker.helpers.arrayElement(['类型A', '类型B', '类型C']),
    description: faker.commerce.productDescription(),
    createTime: faker.date.past().toISOString(),
    lastUpdateTime: faker.date.recent().toISOString(),
    parameters: {
      temperature: faker.number.int({ min: 20, max: 40 }),
      humidity: faker.number.int({ min: 30, max: 80 }),
      pressure: faker.number.int({ min: 900, max: 1100 }),
    },
    maintenance: {
      lastCheck: faker.date.past().toISOString(),
      nextCheck: faker.date.future().toISOString(),
      state: faker.helpers.arrayElement(['正常', '待检查', '已过期']),
    },
  };
}

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const { id } = getQuery(event);
  if (!id) {
    return useResponseSuccess(null);
  }

  const detail = generateDeviceDetail(id as string);
  return useResponseSuccess(detail);
});
