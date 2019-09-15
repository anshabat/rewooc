<?php

namespace Rewooc\Shop;

class Cart {

	public static function addToCart() {
		$productId  = apply_filters( 'woocommerce_add_to_cart_product_id', absint( $_REQUEST['productId'] ) );
		$quantity   = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( $_POST['quantity'] );
		$productKey = WC()->cart->add_to_cart( $productId, $quantity );

		if ( ! $productKey ) {
			wp_send_json( false );
		}

		$cartItem = WC()->cart->get_cart_item( $productKey );
		$product  = self::getProduct( $cartItem );

		wp_send_json( $product );
	}

	public static function getProducts() {
		$cartData = WC()->cart->get_cart_contents();
		$products = [];

		foreach ( $cartData as $cartItem ) {
			$products[] = self::getProduct( $cartItem );
		}

		return $products;
	}

	private static function getProduct( $cartItem ) {
		$productFacade = new ProductFacade( new CartProduct( $cartItem ) );

		return $productFacade->getCartProduct();
	}
}