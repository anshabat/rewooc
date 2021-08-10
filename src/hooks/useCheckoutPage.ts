import { useEffect, useState } from 'react'
import { checkoutApi, IRegion } from 'app-api'

interface IUseCheckoutMethods {
  countries: IRegion[]
}

export function useCheckoutPage(): IUseCheckoutMethods {
  const [countries, setCountries] = useState<IRegion[]>([])

  useEffect(() => {
    Promise.all([checkoutApi.fetchCountries()])
      .then(([countries]) => {
        setCountries(countries)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  return {
    countries,
  }
}
