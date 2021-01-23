import "./ProductCard.scss";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Image from "../../../UI/Image/Image";
import Price from "../../Price/Price";
import {addToCart} from "../../../../redux/cart/cartActions";
import {siteUrl} from "../../../../shared/utilities";
import {Link} from "react-router-dom";
import FormField from "../../../UI/Form/FormField/FormField";
import {isProductInCart, addingProductToCart} from "../../../../redux/cart/cartSelectors";

function ProductCard(props) {
  const {id, images, title, price, link} = props
  const [quantity, changeQuantity] = useState(1);
  const addingToCart = useSelector(state => addingProductToCart(state, id))
  const isInCart = useSelector(state => isProductInCart(state, id))
  const dispatch = useDispatch()

  return (
    <article className="rw-product-card">
      <div className="rw-product-card__row">
        <Image image={images.medium}/>
      </div>
      <h3 className="rw-product-card__row">
        <a className="ps-link ps-link--primary" href={link}>
          {title}
        </a>
      </h3>
      <div className="rw-product-card__row">
        <Price value={price}/>
      </div>
      <div className="rw-product-card__row">
        <div className="rw-product-card__quantity">
          <FormField
            type="number"
            value={quantity}
            onChange={(e) => {
              changeQuantity(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="rw-product-card__row">
        {addingToCart && <span>Adding...</span>}
        {isInCart && <Link to={siteUrl("cart")}>In Cart</Link>}
        <button onClick={e => dispatch(addToCart(id, quantity))} type="button">Add to Cart</button>
      </div>
    </article>
  )
}

export default ProductCard;