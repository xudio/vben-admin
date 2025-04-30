import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, usePageResponseSuccess } from '~/utils/response';

// 生成设备列表数据
function generateDeviceList(count: number) {
  const dataList = [];

  for (let i = 0; i < count; i++) {
    const dataItem = {
      id: faker.string.uuid(),
      name: `设备${i + 1}`,
      state: faker.helpers.arrayElement(['在线', '离线', '未注册']),
      type: faker.helpers.arrayElement(['类型A', '类型B', '类型C']),
      productName: faker.commerce.productName(),
      user: faker.person.fullName(),
      os: faker.helpers.arrayElement(['1.0.0', '1.0.1']),
      location: faker.location.city(),
      onlineTime: `${faker.number.int({ min: 1, max: 24 })}小时`,
      description: faker.commerce.productDescription(),
      createTime: faker.date.past().toISOString(),
      lastUpdateTime: faker.date.recent().toISOString(),
    };

    dataList.push(dataItem);
  }

  return dataList;
}

const mockData = generateDeviceList(100);

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const { page, pageSize, sortBy, sortOrder, name, product, status } =
    getQuery(event);
  let listData = structuredClone(mockData);

  // 处理搜索
  if (name) {
    listData = listData.filter((item) => item.name.includes(name as string));
  }
  if (product) {
    listData = listData.filter((item) =>
      item.product.includes(product as string),
    );
  }
  if (status) {
    listData = listData.filter((item) => item.status === status);
  }

  // 处理排序
  if (sortBy && Reflect.has(listData[0], sortBy as string)) {
    listData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy as string] > b[sortBy as string] ? 1 : -1;
      } else {
        return a[sortBy as string] < b[sortBy as string] ? 1 : -1;
      }
    });
  }

  return usePageResponseSuccess(page as string, pageSize as string, listData);
});
