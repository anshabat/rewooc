import { useEffect, useState } from 'react'
import { checkoutApi, IDeliveryMethod, IPaymentMethod, IRegion } from 'app-api'

interface IUseCheckoutMethods {
  deliveryMethods: IDeliveryMethod[]
  paymentMethods: IPaymentMethod[]
  countries: IRegion[]
  getDeliveryByMethodId: (id: string) => IDeliveryMethod | undefined
}

export function useCheckoutPage(): IUseCheckoutMethods {
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])
  const [countries, setCountries] = useState<IRegion[]>([])

  const getDeliveryByMethodId = (id: string): IDeliveryMethod | undefined => {
    return deliveryMethods.find((method) => String(method.id) === id)
  }

  useEffect(() => {
    Promise.all([
      checkoutApi.fetchDeliveryMethods(),
      checkoutApi.fetchPaymentMethods(),
      checkoutApi.fetchCountries(),
    ])
      .then(([delivery, payment, countries]) => {
        setDeliveryMethods(delivery)
        setPaymentMethods(payment)
        setCountries(countries)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  return {
    deliveryMethods,
    paymentMethods,
    countries,
    getDeliveryByMethodId,
  }
}
