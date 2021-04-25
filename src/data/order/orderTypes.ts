export interface IDeliveryMethodResponse {
  availability: any //null
  cost: string
  countries: []
  enabled: string
  errors: []
  fee: any //null
  has_settings: boolean
  id: 'free_shipping' | 'flat_rate' | 'local_pickup'
  instance_id: number
  instance_settings: {
    cost: string
    tax_status: string
    title: string
  }
  method_description: string
  method_order: number
  method_title: 'Flat rate' | 'Free shipping' | 'Local pickup'
  minimum_fee: any //null
  rates: []
  title: string
  tax_status: 'none' | 'taxable'
}

export interface IDeliveryMethod {
  id: number
  title: string
  cost: number
  order: number
  enabled: string
}

export interface IPaymentMethodResponse {
  id: string
  title: string
  enabled: boolean
  method_title: string
  description: string
  method_description: string
  order: number
}

export interface IPaymentMethod {
  id: string
  title: string
  enabled: boolean
  description: string
  order: number
}

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
