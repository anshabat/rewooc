export interface IDeliveryMethodsResponse {
  success: boolean
  data: {
    [key: number]: IDeliveryMethodRaw
  }
}

export interface IDeliveryMethodRaw {
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
