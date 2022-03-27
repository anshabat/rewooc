import authApi from './appApi'
import { instance } from '../instance'
import { ErrorMessage } from '../../shared/errorMessages'

jest.mock('../cart/cartHelpers', () => ({
  cartHashToItems: jest.fn(() => ({})),
}))

describe('fetchGeneralData', () => {
  it('should return data is response success', async () => {
    const mockGet = jest.spyOn(instance, 'get')
    const mockData = { phone: '111', cart: {} }
    const responseData = { data: mockData }

    mockGet.mockResolvedValue(responseData)
    const result = await authApi.fetchGeneralData()
    
    expect(result).toEqual(mockData)
  })

  it('should throw an error if response fails', async () => {
    const mockGet = jest.spyOn(instance, 'get')
    mockGet.mockRejectedValue({ data: null })

    const error = new Error(ErrorMessage.APP_FAIL_TO_FETCH_GENERAL_DATA)

    await expect(authApi.fetchGeneralData()).rejects.toThrow(error);
  })

})
