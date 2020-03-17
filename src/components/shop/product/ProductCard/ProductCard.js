import "./ProductCard.scss";
import React, {useState} from "react";
import Image from "../../../UI/Image/Image";
import Price from "../../Price/Price";
import {connect} from "react-redux";
import {addToCart} from "../../../../redux/actionCreators";
import {siteUrl} from "../../../../shared/utilities";
import {Link} from "react-router-dom";
import FormField from "../../../UI/Form/FormField/FormField";
import {isProductInCart} from "../../../../redux/utils";

const ProductCard = (props) => {

  const [quantity, ChangeQuantity] = useState(1);

  return (
    <article className="rw-product-card">
      <div className="rw-product-card__row">
        <Image image={props.images.medium}/>
      </div>
      <h3 className="rw-product-card__row">
        <a className="ps-link ps-link--primary" href={props.link}>
          {props.title}
        </a>
      </h3>
      <div className="rw-product-card__row">
        <Price value={props.price}/>
      </div>
      <div className="rw-product-card__row">
        <div className="rw-product-card__quantity">
          <FormField
            type="number"
            value={quantity}
            onChange={(e) => {
              ChangeQuantity(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="rw-product-card__row">
        {props.isAddingToCart && <span>Adding...</span>}
        {props.isInCart && <Link to={siteUrl("cart")}>In Cart</Link>}
        <button onClick={e => props.addToCart(props.id, quantity)} type="button">Add to Cart</button>
      </div>
    </article>
  )
};

const mapStateToProps = (state, ownProps) => ({
  isAddingToCart: state.cart.addingProductId === ownProps.id,
  isInCart: isProductInCart(ownProps.id, state.cart.items)
});

export default connect(mapStateToProps, {addToCart})(ProductCard);