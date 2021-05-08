import { useEffect, useState } from 'react'
import { IDeliveryMethod, orderApi } from 'app-data'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../redux/cart/cartSelectors'

interface IUseCheckout {
  total: number | null
  setDeliveryMethod: (method: IDeliveryMethod) => void
  delivery: IDeliveryMethod | null
}

export function useCheckout(): IUseCheckout {
  const cartItems = useSelector(selectCartItems)
  const [total, setTotal] = useState<number | null>(null)
  const [delivery, setDeliveryMethod] = useState<IDeliveryMethod | null>(null)

  useEffect(() => {
    const deliveryMethodId = String(delivery?.id || '')
    orderApi.fetchTotals(cartItems, deliveryMethodId).then((total) => {
      setTotal(total)
    })
  }, [delivery?.id, cartItems])

  return { total, delivery, setDeliveryMethod }
}
