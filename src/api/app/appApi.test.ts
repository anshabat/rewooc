import authApi from './appApi'
import { instance } from '../instance'

jest.mock('../cart/cartHelpers', () => ({
  cartHashToItems: jest.fn(() => ({})),
}))

describe('fetchGeneralData', () => {
  fit('should return data from backend', async () => {
    const mockGet = jest.spyOn(instance, 'get')
    const mockData = { name: 'shop', cart: {} }
    const responseData = { data: mockData }

    mockGet.mockResolvedValue(responseData)
    const result = await authApi.fetchGeneralData()

    expect(result).toEqual(mockData)
  })
})
