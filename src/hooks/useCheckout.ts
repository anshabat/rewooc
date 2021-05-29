import { useEffect, useState } from 'react'
import { IDeliveryMethod } from 'app-data'
import { useSelector } from 'react-redux'
import {
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../redux/cart/cartSelectors'

interface IUseCheckout {
  total: number | null
  setDeliveryMethod: (method: IDeliveryMethod) => void
  delivery: IDeliveryMethod | null
}

export function useCheckout(): IUseCheckout {
  const cartItemsQuantity = useSelector(selectCartTotalQuantity)
  const cartItemsTotal = useSelector(selectCartTotalPrice)
  const [total, setTotal] = useState<number | null>(null)
  const [delivery, setDeliveryMethod] = useState<IDeliveryMethod | null>(null)

  useEffect(() => {
    const total = cartItemsTotal + (delivery?.cost || 0)
    setTotal(total)
  }, [delivery?.id, cartItemsQuantity])

  return { total, delivery, setDeliveryMethod }
}
