<?php

namespace Rewooc\Shop;

use Rewooc\Core\View;

class Cart {

	public static function addToCart( $productId, $quantity ) {
		$productKey = WC()->cart->add_to_cart( $productId, $quantity );

		if ( ! $productKey ) {
			return false;
		}

		$cartItem = WC()->cart->get_cart_item( $productKey );
		$cartItem = self::getCartItem( $cartItem );

		return $cartItem;
	}

	public static function deleteCartItem( $productKey ) {
		return WC()->cart->remove_cart_item( $productKey );
	}

	public static function setProductQuantity( $productKey, $quantity ) {
		$cartItem      = WC()->cart->cart_contents[ $productKey ];
		$product       = new Product( $cartItem['data'] );
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

	public static function getCartItems( $cartItems ) {
		$result = [];
		foreach ( $cartItems as $key => $data ) {
			$result[ $key ] = self::getCartItem( $data );
		}

		return $result;
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