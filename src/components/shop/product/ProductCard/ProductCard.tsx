import './ProductCard.scss'
import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Image from '../../../UI/Image/Image'
import Price from '../../Price/Price'
import { addToCart } from '../../../../redux/cart/cartActions'
import { siteUrl } from '../../../../shared/utilities'
import { IProduct } from 'app-types'
import FormField from '../../../UI/Form/FormField/FormField'
import { useCartInfo } from '../../../../hooks/useProductsInCartSelector'

const ProductCard: FC<IProduct> = (props) => {
  const {
    id,
    title,
    price,
    link,
    images,
    isProductInCart,
    isProductAddingToCart,
  } = props
  //const {isProductInCart, isProductAddingToCart} = useCartInfo(id)
  const [quantity, changeQuantity] = useState(1)
  const dispatch = useDispatch()

  return (
    <article className="rw-product-card">
      <div className="rw-product-card__row">
        <Image image={images.medium} />
      </div>
      <h3 className="rw-product-card__row">
        <a className="ps-link ps-link--primary" href={link}>
          {title}
        </a>
      </h3>
      <div className="rw-product-card__row">
        <Price value={price} />
      </div>
      <div className="rw-product-card__row">
        <div className="rw-product-card__quantity">
          <FormField
            label="Quantity"
            hideLabel
            type="number"
            value={quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              changeQuantity(Number(e.target.value))
            }}
          />
        </div>
      </div>
      <div className="rw-product-card__row">
        {isProductAddingToCart && <span>Adding...</span>}
        {isProductInCart && <Link to={siteUrl('cart')}>In Cart</Link>}
        <button onClick={() => dispatch(addToCart(id, quantity))} type="button">
          Add to Cart
        </button>
      </div>
    </article>
  )
}

export default React.memo(ProductCard)
