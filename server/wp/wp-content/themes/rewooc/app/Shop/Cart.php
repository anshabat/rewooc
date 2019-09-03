<?php

namespace Rewooc\Shop;

use Rewooc\Common\Media;

class Cart {

	public static function getData() {
		$products = self::getCartProducts( WC()->cart->get_cart_contents() );
		return $products;
	}

	private static function getCartProducts( $cartData ) {
		$products = [];

		foreach ( $cartData as $item ) {
			$productObject = $item['data'];
			$title         = rawurldecode( $productObject->get_name() );
			$image         = new Media( $productObject->get_image_id(), 'shop_catalog' );
			$image->setImageAlt( $title );

			$products[] = [
				'quantity' => $item['quantity'],
				'id'       => $item['product_id'],
				'title'    => rawurldecode( $productObject->get_name() ),
				'link'     => $productObject->get_permalink(),
				'price'    => $productObject->get_price(),
				'image'    => $image->getImage()
			];
		}

		return $products;
	}

	public static function addToCart() {
		$productId = apply_filters( 'woocommerce_add_to_cart_product_id', absint( $_REQUEST['productId'] ) );
		$quantity  = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( $_POST['quantity'] );
		WC()->cart->add_to_cart( $productId, $quantity );

		wp_send_json( self::getData() );
	}
}