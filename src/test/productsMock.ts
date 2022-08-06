import { IProduct } from 'types'

const products: IProduct[] = [
  {
    addToCartUrl: 'http://localhost:8888/server/wp/product/64gb-xiaomi-mi-a1/',
    getStockQuantity: -3,
    id: 1,
    images: null,
    isSoldIndividually: false,
    link: 'http://localhost:8888/server/wp/product/64gb-xiaomi-mi-a1/',
    price: 100,
    title: '64GB Xiaomi Mi A1 Golden',
  },
  {
    addToCartUrl: '?add-to-cart=140',
    getStockQuantity: null,
    id: 2,
    images: null,
    isSoldIndividually: false,
    link: 'http://localhost:8888/server/wp/product/apple-iphone-8-64gb/',
    price: 200,
    title: 'Apple iPhone 8 64GB',
  },
]

export function getProductsMock(): IProduct[] {
  return [...products]
}
