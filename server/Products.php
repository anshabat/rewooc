<?php

class Products {
	private static $instance;

	public static function getInstance() {
		self::$instance = empty( self::$instance ) ? new self() : self::$instance;

		return self::$instance;
	}

	private function __construct() {
		add_action( 'wc_ajax_rw_search_products', [ $this, 'search' ] );
	}

	public function search() {
		$search = wc_clean( stripslashes( $_GET['search'] ) );

		if ( empty( $search ) ) {
			wp_die();
		}

		$dataStore = WC_Data_Store::load( 'product' );
		$ids       = $dataStore->search_products( $search, '', true );

		if ( ! empty( $_GET['limit'] ) ) {
			$ids = array_slice( $ids, 0, absint( $_GET['limit'] ) );
		}

		$productObjects = array_filter( array_map( 'wc_get_product', $ids ), 'wc_products_array_filter_editable' );
		$products       = $this->convertProductObjectToArray( $productObjects );
		wp_send_json( $products );
	}

	public function getProducts( $args = [] ) {
		$productObjects = wc_get_products( $args );
		$products       = $this->convertProductObjectToArray( $productObjects );

		return $products;
	}

	private function convertProductObjectToArray( $productObjects ) {
		//TODO Приймати аргументом масив ключів які слід отримати, якщо пусто, то повертати всі
		$products = [];
		foreach ( $productObjects as $productObject ) {
			$title = rawurldecode( $productObject->get_name() );
			$image = new Media( $productObject->get_image_id(), 'shop_catalog' );
			$image->setImageAlt( $title );

			array_push( $products, [
				'id'    => $productObject->get_id(),
				'title' => $title,
				'link'  => $productObject->get_permalink(),
				'price' => $productObject->get_price(),
				'image' => $image->getImage()
			] );
		}

		return $products;
	}
}

Products::getInstance();