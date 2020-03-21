<?php

namespace Rewooc\Shop;

use Rewooc\Core\View;

class Cart {

	public static function addToCart() {
		$productId  = absint( $_POST['productId'] );
		$quantity   = absint( $_POST['quantity'] );
		$productKey = WC()->cart->add_to_cart( $productId, $quantity );

		if ( ! $productKey ) {
			View::responseError();
		}

		$cartItem = WC()->cart->get_cart_item( $productKey );
		$cartItem = self::getCartItem( $cartItem );

		View::responseSuccess( $cartItem );
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
		$cartItem      = WC()->cart->cart_contents[ $productKey ];
		$product       = new CartProduct( $cartItem );
		$stockQuantity = $product->getStockQuantity();

		if ( $product->isSoldIndividually() ) {
			$quantity = $quantity > 0 ? 1 : $quantity;
		} else if ( $stockQuantity ) {
			$quantity = $quantity > $stockQuantity ? $stockQuantity : $quantity;
		}

		if ( WC()->cart->set_quantity( $productKey, $quantity ) ) {
			return WC()->cart->get_cart_item( $productKey );
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

	public static function getCartItems( $cartItems ) {
		$result = [];
		foreach ( $cartItems as $key => $data ) {
			$result[ $key ] = self::getCartItem( $data );
		}

		return $result;
	}

	private static function getProduct( $cartItem ) {
		$productFacade = new ProductFacade( new CartProduct( $cartItem ) );

		return $productFacade->getCartProduct();
	}

	public static function getCartItem( $cartItem ) {
		$result         = $cartItem;
		$productEntity  = new Product( $cartItem['data'] );
		$productFacade  = new ProductFacade( $productEntity );
		$product        = $productFacade->getProductCard();
		$result['data'] = $product;

		return $result;
	}
}