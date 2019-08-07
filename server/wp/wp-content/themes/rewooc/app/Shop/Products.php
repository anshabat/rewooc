<?php

namespace Rewooc\Shop;

use Rewooc\Common\Media;

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
		wp_send_json( $products );
	}

	public static function getProducts( $args = [] ) {
		$productObjects = wc_get_products( $args );
		$products       = self::convertProductObjectToArray( $productObjects );

		return $products;
	}

	public static function addToCart() {
		$productId = apply_filters( 'woocommerce_add_to_cart_product_id', absint( $_REQUEST['productId'] ) );
		$quantity  = empty( $_POST['quantity'] ) ? 1 : wc_stock_amount( $_POST['quantity'] );
		WC()->cart->add_to_cart( $productId, $quantity );

		wp_send_json( Cart::getData() );
	}

	public static function convertProductObjectToArray( $productObjects ) {
		$products = [];
		foreach ( $productObjects as $productObject ) {
			$title = rawurldecode( $productObject->get_name() );
			$image = new Media( $productObject->get_image_id(), 'shop_catalog' );
			$image->setImageAlt( $title );

			array_push( $products, [
				'id'           => $productObject->get_id(),
				'title'        => $title,
				'link'         => $productObject->get_permalink(),
				'price'        => $productObject->get_price(),
				'image'        => $image->getImage(),
				'addToCartUrl' => $productObject->add_to_cart_url()
			] );
		}

		return $products;
	}
}