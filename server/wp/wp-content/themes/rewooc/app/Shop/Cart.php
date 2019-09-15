<?php

namespace Rewooc\Shop;

use Rewooc\Core\View;

class Cart {

	public static function addToCart() {
		$productId  = absint( $_REQUEST['productId'] );
		$quantity   = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( $_POST['quantity'] );
		$productKey = WC()->cart->add_to_cart( $productId, $quantity );

		if ( ! $productKey ) {
			View::response( false );
		}

		$cartItem = WC()->cart->get_cart_item( $productKey );
		$product  = self::getProduct( $cartItem );

		View::response( $product );
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