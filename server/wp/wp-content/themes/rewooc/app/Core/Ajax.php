<?php

namespace Rewooc\Core;

use Rewooc\Shop\Cart;
use Rewooc\Shop\Products;

class Ajax {
	private $endpoints = [
		'wc_ajax_rewooc_search_products'          => [ Products::class, 'search' ],
		'wc_ajax_rewooc_add_to_cart'              => [ Cart::class, 'addToCart' ],
		'wc_ajax_rewooc_delete_from_cart'         => [ Cart::class, 'deleteFromCart' ],
		'wc_ajax_rewooc_set_cat_product_quantity' => [ self::class, 'setCartProductQuantity' ],
		'wc_ajax_rewooc_get_common_data'          => [ View::class, 'renderCommonData' ]
	];

	public function __construct() {
		foreach ( $this->endpoints as $endpoint => $method ) {
			add_action( $endpoint, $method );
		}
	}

	public function setCartProductQuantity() {
		$productKey = isset( $_POST['productKey'] ) ? wc_clean( $_POST['productKey'] ) : null;
		$quantity   = isset( $_POST['quantity'] ) ? absint( $_POST['quantity'] ) : 1;

		if ( ! $productKey ) {
			return;
		}

		$success = Cart::setProductQuantity( $productKey, $quantity );

		if ( $success ) {
			View::responseSuccess();
		} else {
			View::responseError();
		};

	}
}