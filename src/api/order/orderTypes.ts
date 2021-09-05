export interface IOrderRequest {
  billing: {
    first_name: string
    last_name: string
    phone: string
    email: string
    country: string
    address: string
  }
  shipping: {
    first_name: string
    last_name: string
  } | null
  delivery: string
  payment: string
  order_note: string
  products: { product_id: number; quantity: number }[]
  status: 'processing'
  customer_id: number
  sign_up: {
    account_password: string
  } | null
}
