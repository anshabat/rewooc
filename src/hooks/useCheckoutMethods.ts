import { useEffect, useState } from 'react'
import { checkoutApi, IDeliveryMethod, IPaymentMethod } from 'app-api'

interface IUseCheckoutMethods {
  deliveryMethods: IDeliveryMethod[]
  paymentMethods: IPaymentMethod[]
  getDeliveryByMethodId: (id: string) => IDeliveryMethod | undefined
}

export function useCheckoutMethods(): IUseCheckoutMethods {
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])

  const getDeliveryByMethodId = (id: string): IDeliveryMethod | undefined => {
    return deliveryMethods.find((method) => String(method.id) === id)
  }

  useEffect(() => {
    Promise.all([
      checkoutApi.fetchDeliveryMethods(),
      checkoutApi.fetchPaymentMethods(),
    ])
      .then(([delivery, payment]) => {
        setDeliveryMethods(delivery)
        setPaymentMethods(payment)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  return {
    deliveryMethods,
    paymentMethods,
    getDeliveryByMethodId,
  }
}
