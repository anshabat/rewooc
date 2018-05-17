import './ProductCard.css';
import React, {Component} from 'react';

class ProductCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.product.image);
        return (
            <article className="rw-product-card">
                <div className="rw-product-card__row">
                    <img src={this.props.product.image.src} alt=""/>
                </div>
                <h3 className="rw-product-card__row">
                    <a className="ps-link ps-link--primary" href={this.props.product.link}>{this.props.product.title}</a>
                </h3>
                <div className="rw-product-card__row">
                    <strong>{this.props.product.price}</strong>
                </div>
            </article>
        )
    }
}

export default ProductCard;