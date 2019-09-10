<?php

namespace Rewooc\Shop;

class Cart {

	public static function addToCart() {
		$productId  = apply_filters( 'woocommerce_add_to_cart_product_id', absint( $_REQUEST['productId'] ) );
		$quantity   = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( $_POST['quantity'] );
		$productKey = WC()->cart->add_to_cart( $productId, $quantity );

		//TODO return single item after adding to cart
		//$cartItem = WC()->cart->get_cart_item( $productKey );

		wp_send_json( self::getProducts() );
	}

	public static function getProducts() {
		$cartData = WC()->cart->get_cart_contents();
		$products = [];

		foreach ( $cartData as $cartItem ) {
			$productEntity = new CartProduct( $cartItem );
			$productFacade = new ProductFacade( $productEntity );
			$products[]    = $productFacade->getCartProduct();
		}

		return $products;
	}
}