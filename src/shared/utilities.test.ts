import { TSorting } from 'types'
import {
  ajaxEndpoint,
  apiUrl,
  propertyFromDottedString,
  removeTrailingSlash,
  siteUrl,
  sortObjects,
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

describe('propertyFromDottedString', () => {
  it('should find object property by given string with dot separator', () => {
    const obj = { a: { a1: { a11: 'test' }, a2: 10 }, b: 2 }

    expect(propertyFromDottedString(obj, 'a.a1.a11')).toBe('test')
    expect(propertyFromDottedString(obj, 'a.a1')).toEqual({ a11: 'test' })
    expect(propertyFromDottedString(obj, 'a.a2')).toBe(10)
    expect(propertyFromDottedString(obj, 'b')).toBe(2)
  })
})

describe('sortObjects', () => {
  const items = [
    { title: 'samsung', price: 150 },
    { title: 'apple', price: 50 },
    { title: 'lg', price: 100 },
  ]

  it('should sort objects array by string ASC', () => {
    const sorting: TSorting = { orderBy: 'title', direction: 'asc' }

    expect(sortObjects(items, sorting)).toEqual([
      { title: 'apple', price: 50 },
      { title: 'lg', price: 100 },
      { title: 'samsung', price: 150 },
    ])
  })

  it('should sort objects array by string DESC', () => {
    const sorting: TSorting = { orderBy: 'title', direction: 'desc' }

    expect(sortObjects(items, sorting)).toEqual([
      { title: 'samsung', price: 150 },
      { title: 'lg', price: 100 },
      { title: 'apple', price: 50 },
    ])
  })

  it('should sort objects array by number ASC', () => {
    const sorting: TSorting = { orderBy: 'price', direction: 'asc' }

    expect(sortObjects(items, sorting)).toEqual([
      { title: 'apple', price: 50 },
      { title: 'lg', price: 100 },
      { title: 'samsung', price: 150 },
    ])
  })

  it('should sort objects array by number DESC', () => {
    const sorting: TSorting = { orderBy: 'price', direction: 'desc' }

    expect(sortObjects(items, sorting)).toEqual([
      { title: 'samsung', price: 150 },
      { title: 'lg', price: 100 },
      { title: 'apple', price: 50 },
    ])
  })
})
