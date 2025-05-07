import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from '~/utils/response';

// 生成设备详情数据
function generateDeviceDetail(id: string) {
  return {
    id,
    name: `设备${id.slice(0, 4)}`,
    user: faker.person.fullName(),
    productName: faker.commerce.productName(),
    organization: faker.company.name(),
    model: faker.helpers.arrayElement(['Model A', 'Model B', 'Model C']),
    os: faker.helpers.arrayElement(['1.0.0', '1.0.1', '1.0.2']),
    onlineTime: `${faker.number.int({ min: 1, max: 24 })}小时`,
    state: faker.helpers.arrayElement(['正常', '故障', '维修中']),
    type: faker.helpers.arrayElement(['类型A', '类型B', '类型C']),
    description: faker.commerce.productDescription(),
    createTime: faker.date.past().toISOString(),
    lastLoginTime: faker.date.recent().toISOString(),
    firstOnlineTime: faker.date.past().toISOString(),
    lastUpdateTime: faker.date.recent().toISOString(),
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
