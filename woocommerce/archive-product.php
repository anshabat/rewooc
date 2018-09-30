<?php
Api::renderPage( function () {
	if ( wc_get_loop_prop( 'total' ) ) {
		$products = [];
		while ( have_posts() ) {
			the_post();
			$products[] = wc_get_product( get_the_ID() );
		}
	}
	$products = Products::getInstance()->convertProductObjectToArray( $products );

	return [
		'products' => $products
	];
} );