import { useEffect, useState } from 'react'
import { IDeliveryMethod, orderApi } from 'app-data'
import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotalQuantity,
} from '../redux/cart/cartSelectors'

interface IUseCheckout {
  total: number | null
  setDeliveryMethod: (method: IDeliveryMethod) => void
  delivery: IDeliveryMethod | null
  loading: boolean
}

export function useCheckout(): IUseCheckout {
  const cartItems = useSelector(selectCartItems)
  const cartItemsQuantity = useSelector(selectCartTotalQuantity)
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [delivery, setDeliveryMethod] = useState<IDeliveryMethod | null>(null)

  useEffect(() => {
    const deliveryMethodId = String(delivery?.id || '')
    setLoading(true)
    orderApi.fetchTotals(cartItems, deliveryMethodId).then((total) => {
      setTotal(total)
      setLoading(false)
    })
  }, [delivery?.id, cartItemsQuantity])

  return { total, delivery, setDeliveryMethod, loading }
}
