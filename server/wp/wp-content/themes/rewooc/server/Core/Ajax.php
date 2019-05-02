<?php

namespace Rewooc\Core;

use Rewooc\Api\Shop\Products;

class Ajax {
	private $endpoints = [
		'wc_ajax_rewooc_search_products' => [ Products::class, 'search' ],
		'wc_ajax_rewooc_add_to_cart'     => [ Products::class, 'addToCart' ]
	];

	function __construct() {
		foreach ( $this->endpoints as $endpoint => $method ) {
			add_action( $endpoint, $method );
		}
	}
}