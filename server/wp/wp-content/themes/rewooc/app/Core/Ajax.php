<?php

namespace Rewooc\Core;

use Rewooc\Shop\Cart;
use Rewooc\Shop\Products;
use Rewooc\Core\View;

class Ajax {
	private $endpoints = [
		'wc_ajax_rewooc_search_products' => [ Products::class, 'search' ],
		'wc_ajax_rewooc_add_to_cart'     => [ Cart::class, 'addToCart' ],
		'wc_ajax_rewooc_get_common_data'     => [ View::class, 'renderCommonData' ]
	];

	function __construct() {
		foreach ( $this->endpoints as $endpoint => $method ) {
			add_action( $endpoint, $method );
		}
	}
}