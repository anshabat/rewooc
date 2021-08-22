import produce from 'immer'
import { INIT_APP_SUCCESS } from '../app/appActions'
import { CartActionTypes, ICartState } from './cartTypes'
import {
  CART_ADD_PRODUCT,
  CART_ADD_PRODUCT_FAIL,
  CART_ADD_PRODUCT_SUCCESS,
  CART_CLEAR,
  CART_DELETE_PRODUCT,
  CART_DELETE_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_PAGE_LOAD,
  CART_PAGE_LOAD_FAIL,
  CART_PAGE_LOAD_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
} from './cartActions'
import { AppActionTypes } from '../app/appTypes'
import {
  addData,
  createData,
  deleteData,
  updateItemQuantity,
} from './cartUtils'

const initialState: ICartState = {
  title: '',
  loading: true,
  error: false,
  products: [],
  items: [],
  addingProductId: null,
  deletingProductKey: null,
  changingQuantityKey: null,
}

export default function reducer(
  state = initialState,
  action: CartActionTypes | AppActionTypes
): ICartState {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_APP_SUCCESS: {
        const { items, products } = createData(action.payload.cart)
        draft.items = items
        draft.products = products
        break
      }
      case CART_PAGE_LOAD:
        draft.loading = true
        break
      case CART_PAGE_LOAD_SUCCESS:
        draft.loading = false
        draft.title = action.payload.title
        break
      case CART_PAGE_LOAD_FAIL:
        draft.loading = false
        draft.error = action.error
        break
      case CART_ADD_PRODUCT:
        draft.addingProductId = action.payload.productId
        break
      case CART_ADD_PRODUCT_SUCCESS: {
        const { items, products } = addData(draft, action.payload.cartItem)
        draft.items = items
        draft.products = products
        draft.addingProductId = null
        break
      }
      case CART_ADD_PRODUCT_FAIL:
        draft.addingProductId = null
        draft.error = action.error
        break
      case CART_DELETE_PRODUCT:
        draft.deletingProductKey = action.payload.productKey
        break
      case CART_DELETE_PRODUCT_SUCCESS: {
        const { items, products } = deleteData(draft, action.payload.productKey)
        draft.items = items
        draft.products = products
        draft.deletingProductKey = null
        break
      }
      case CART_DELETE_PRODUCT_FAIL:
        draft.deletingProductKey = null
        draft.error = action.error
        break
      case CART_SET_PRODUCT_QUANTITY_START:
        draft.changingQuantityKey = action.payload.productKey
        break
      case CART_SET_PRODUCT_QUANTITY_SUCCESS:
        updateItemQuantity(draft.items, action.payload.cartItem)
        draft.changingQuantityKey = null
        draft.addingProductId = null
        break
      case CART_SET_PRODUCT_QUANTITY_FAIL:
        console.error(action.error)
        draft.changingQuantityKey = null
        draft.error = action.error
        break
      case CART_CLEAR:
        Object.keys(draft).forEach(key => {
          // @ts-ignore
          draft[key] = initialState[key]
        })
        break
    }
  })
}
