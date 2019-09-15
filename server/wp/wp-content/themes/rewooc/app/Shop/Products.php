<?php

namespace Rewooc\Shop;

use Rewooc\Core\View;

class Products {

	public static function getArchiveProducts() {
		$products = [];

		while ( have_posts() ) {
			the_post();
			global $product;
			$products[] = $product;
		}

		return self::convertProductObjectToArray( $products );
	}

	public function search() {
		$term = wc_clean( stripslashes( $_GET['term'] ) );

		if ( empty( $term ) ) {
			wp_die();
		}

		$dataStore = \WC_Data_Store::load( 'product' );
		$ids       = $dataStore->search_products( $term, '', true );

		if ( ! empty( $_GET['limit'] ) ) {
			$ids = array_slice( $ids, 0, absint( $_GET['limit'] ) );
		}

		$productObjects = array_filter( array_map( 'wc_get_product', $ids ), 'wc_products_array_filter_visible' );
		$products       = self::convertProductObjectToArray( $productObjects );
		View::response( $products );
	}

	public static function getProducts( $args = [] ) {
		$productObjects = wc_get_products( $args );

		return self::convertProductObjectToArray( $productObjects );
	}

	private static function convertProductObjectToArray( $productObjects ) {
		$products = [];
		foreach ( $productObjects as $wcProduct ) {
			$productEntity = new Product( $wcProduct );
			$productFacade = new ProductFacade( $productEntity );
			$products[]    = $productFacade->getProductCard();
		}

		return $products;
	}
}