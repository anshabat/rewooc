import authApi from './appApi'
import { instance } from '../instance'
import { ErrorMessage } from '../../shared/errorMessages'
import * as endpoints from '../endpoints'

jest.mock('../cart/cartHelpers', () => ({
  cartHashToItems: jest.fn(() => ({})),
}))

describe('appApi.ts', () => {
  let mockGet: jest.SpyInstance
  
  beforeEach(() => {
    mockGet = jest.spyOn(instance, 'get')
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('fetchGeneralData', () => {
    it('should return data is response success', async () => {
      const mockData = { phone: '111', cart: {} }
      const responseData = { data: mockData }

      mockGet.mockResolvedValue(responseData)
      const result = await authApi.fetchGeneralData()

      expect(result).toEqual(mockData)
    })

    it('should throw an error if response fails', async () => {
      mockGet.mockRejectedValue({ data: null })

      const error = new Error(ErrorMessage.APP_FAIL_TO_FETCH_GENERAL_DATA)

      await expect(authApi.fetchGeneralData()).rejects.toThrow(error)
    })
  })

  describe('fetchPageData', () => {
    it('should been called with proper url and return data', async () => {
      const pageUrl = jest.spyOn(endpoints, 'pageUrl')
      mockGet.mockResolvedValue({data: 1})
      const result = await authApi.fetchPageData('test')
      
      expect(pageUrl).toBeCalledWith('test')
      expect(result).toBe(1)
    })
  })
})
