<?php

use Rewooc\Api\Shop\Products;
use Rewooc\Core\View;

View::renderPage( function () {
	$products = [];

	if ( wc_get_loop_prop( 'total' ) ) {
		while ( have_posts() ) {
			the_post();
			$products[] = wc_get_product( get_the_ID() );
		}
	}
	$products = Products::convertProductObjectToArray( $products );

	return [
		'products' => $products
	];
} );