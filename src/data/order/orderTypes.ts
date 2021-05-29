export interface IOrderRequest {
  billing: {
    first_name: string
    last_name: string
    phone: string
    email: string
  }
  delivery: string
  payment: string
  products: { product_id: number; quantity: number }[]
  status: 'processing'
  customer_id: number
}
