<?php

namespace Rewooc\Shop;

use Rewooc\Core\View;

class Cart {

	public static function addToCart() {
		$productId  = absint( $_REQUEST['productId'] );
		$quantity   = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( $_POST['quantity'] );
		$productKey = WC()->cart->add_to_cart( $productId, $quantity );

		if ( ! $productKey ) {
			View::responseError();
		}

		$cartItem = WC()->cart->get_cart_item( $productKey );
		$product  = self::getProduct( $cartItem );

		View::responseSuccess( $product );
	}

	public static function deleteFromCart() {
		$productKey = wc_clean( $_POST['productKey'] );

		if ( $productKey && WC()->cart->remove_cart_item( $productKey ) ) {
			View::responseSuccess();
		} else {
			View::responseError();
		}
	}

	public static function setProductQuantity( $productKey, $quantity ) {
		$cartItem = WC()->cart->cart_contents[ $productKey ];
		$product  = new CartProduct( $cartItem );

		if ( $product->isSoldIndividually() ) {
			$quantity = $quantity > 0 ? 1 : $quantity;
		}
		//TODO max_purchase_count check
		if ( WC()->cart->set_quantity( $productKey, $quantity ) ) {
			return $quantity;
		} else {
			return false;
		}
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