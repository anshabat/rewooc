import { removeTrailingSlash } from "./utilities"

describe('utilities', () => {
  test('removeTrailingSlash', () => {
    const result = removeTrailingSlash('test//')
    expect(result).toBe('test')
  })
})