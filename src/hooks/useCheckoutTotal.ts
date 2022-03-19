import { useEffect, useState } from 'react'
import { IDeliveryMethod } from 'api'
import { useSelector } from 'react-redux'
import { selectCartTotalPrice } from '../redux/cart/cartSelectors'

export function useCheckoutTotal(delivery: IDeliveryMethod | null): number {
  const cartTotal = useSelector(selectCartTotalPrice)
  const [total, setTotal] = useState<number>(cartTotal)
  const deliveryCost = delivery?.cost || 0

  useEffect(() => {
    setTotal(cartTotal + deliveryCost)
  }, [deliveryCost, cartTotal])

  return total
}
