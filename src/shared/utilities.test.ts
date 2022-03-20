import {
  ajaxEndpoint,
  apiUrl,
  removeTrailingSlash,
  siteUrl,
  trimObject,
} from './utilities'

let apiUrlMock: string

jest.mock('../config', () => {
  apiUrlMock = 'http://localhost/server/wp'
  return {
    Config: {
      apiUrl: apiUrlMock,
    },
  }
})

describe('removeTrailingSlash', () => {
  it('should remove last slash', () => {
    expect(removeTrailingSlash('test/')).toBe('test')
    expect(removeTrailingSlash('test')).toBe('test')
    expect(removeTrailingSlash('te/st/')).toBe('te/st')
    expect(removeTrailingSlash('/test/')).toBe('/test')
    expect(removeTrailingSlash('/test')).toBe('/test')
    expect(removeTrailingSlash('/test//')).toBe('/test')
  })
})

describe('apiUrl', () => {
  it('should add API URL and remove trailing slashes', () => {
    expect(apiUrl('/test')).toBe(`${apiUrlMock}/test/`)
    expect(apiUrl('/test/')).toBe(`${apiUrlMock}/test/`)
  })
})

describe('siteUrl', () => {
  it('should replace API URL with slash', () => {
    expect(siteUrl(`${apiUrlMock}/test`)).toBe('/test')
  })
  it('should add slash at the beginning', () => {
    expect(siteUrl(`test`)).toBe('/test')
  })
  it('should do nothing is str starts with http', () => {
    expect(siteUrl(`http://test`)).toBe('http://test')
  })
  it('should do nothing is str starts slash', () => {
    expect(siteUrl(`/test`)).toBe('/test')
  })
})

describe('ajaxEndpoint', () => {
  it('should create proper wp ajax endpoint with given string', () => {
    expect(ajaxEndpoint(`test`)).toBe(`${apiUrlMock}/?wc-ajax=test`)
  })
})

describe('trimObject', () => {
  it('should remove props from object', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    expect(trimObject(obj, ['a', 'c'])).toEqual({ b: 2, d: 4 })
  })
})
