import { useEffect, useState } from 'react'
import { checkoutApi, IPaymentMethod, IRegion } from 'app-api'

interface IUseCheckoutMethods {
  paymentMethods: IPaymentMethod[]
  countries: IRegion[]
}

export function useCheckoutPage(): IUseCheckoutMethods {
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])
  const [countries, setCountries] = useState<IRegion[]>([])

  useEffect(() => {
    Promise.all([
      checkoutApi.fetchPaymentMethods(),
      checkoutApi.fetchCountries(),
    ])
      .then(([payment, countries]) => {
        setPaymentMethods(payment)
        setCountries(countries)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  return {
    paymentMethods,
    countries,
  }
}
