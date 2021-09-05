import { FC, cloneElement } from 'react'
import { useCartInfo } from '../../../../hooks/useProductsInCartSelector'

interface IProps {
  children?: any
}

const ProductContainer: FC<IProps> = (props) => {
  const { children } = props
  const { isProductInCart, isProductAddingToCart } = useCartInfo(
    children.props.id
  )
  return cloneElement(children, { isProductInCart, isProductAddingToCart })
}

export default ProductContainer
