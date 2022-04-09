import { IOrder } from 'types'

export const orders: IOrder[] = [
  {
    created: {
      date: '2021-10-28 03:01:25.000000',
      timezone: '+00:00',
      timezone_type: 1,
    },
    currency: 'USD',
    id: 1,
    item_count: 2,
    number: 3,
    status: {
      key: 'status-1',
      value: 'Status 1',
    },
    total: 100,
    url: 1,
    deliveryMethod: {
      cost: 30,
      //@ts-ignore
      id: "3",
      title: 'Method 3',
    },
  },
  {
    created: {
      date: '2021-10-08 14:28:20.000000',
      timezone: '+00:00',
      timezone_type: 1,
    },
    currency: 'USD',
    id: 2,
    item_count: 5,
    number: 3,
    status: {
      key: 'status-2',
      value: 'Status 2',
    },
    total: 200,
    url: 2,
    deliveryMethod: {
      cost: 20,
      //@ts-ignore
      id: "2",
      title: 'Method 2',
    },
  },
  {
    created: {
      date: '2021-09-24 05:36:20.000000',
      timezone: '+00:00',
      timezone_type: 1,
    },
    currency: 'USD',
    id: 3,
    item_count: 8,
    number: 4,
    status: {
      key: 'status-1',
      value: 'Status 1',
    },
    total: 50,
    url: 3,
    deliveryMethod: {
      cost: 10,
      //@ts-ignore
      id: "1",
      title: 'Method 1',
    },
  },
  {
    created: {
      date: '2021-09-14 14:31:26.000000',
      timezone: '+00:00',
      timezone_type: 1,
    },
    currency: 'USD',
    id: 4,
    item_count: 3,
    number: 5,
    status: {
      key: 'status-3',
      value: 'Status 3',
    },
    total: 150,
    url: 3,
    deliveryMethod: {
      cost: 20,
      //@ts-ignore
      id: "2",
      title: 'Method 2',
    },
  },
]
