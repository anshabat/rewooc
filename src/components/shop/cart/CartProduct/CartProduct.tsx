import './CartProduct.scss'
import React, { FC } from 'react'
import Image from '../../../UI/Image/Image'
import Price from '../../Price/Price'
import { IProduct } from 'types'

interface IProps {
  product: IProduct
}

const CartProduct: FC<IProps> = (props) => {
  const { product } = props

  return (
    <div className="rw-cart-product">
      <div className="rw-cart-product__left">
        <div className="rw-cart-product__img">
          <Image image={product.images.thumbnail} />
        </div>
      </div>
      <div className="rw-cart-product__right">
        <div className="rw-cart-product__title">
          <a className="ps-link ps-link--primary" href={product.link}>
            {product.title}
          </a>
        </div>
        <div className="rw-cart-product__price">
          <Price value={product.price} />
        </div>
      </div>
    </div>
  )
}

export default CartProduct
