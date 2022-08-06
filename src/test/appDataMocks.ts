import { IGeneralData } from 'api'

const initialAppData: IGeneralData = {
  ajaxUrl: '',
  baseUrl: '',
  favicon: '',
  headerNavigation: [],
  logo: {full: ''},
  phone: '+38 (098) 8165441 ',
  price: {
    currencySymbol: '$',
    decimalSeparator: ',',
    decimals: 2,
    priceFormat: '%2$s%1$s',
    thousandSeparator: ' ',
  },
  siteMeta: {
    title: 'ReWooC',
    description: 'Woocommerce React theme',
    charset: 'UTF-8',
  },
  cart: [],
  user: null,
}

export function getAppData(props: Partial<IGeneralData> = {}): IGeneralData {
  return { ...initialAppData, ...props }
}
