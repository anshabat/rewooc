<?php

namespace Rewooc\Shop;

use Rewooc\Common\Media;

class Product {
	private $product = null;

	public function __construct( \WC_Product $wcProduct ) {
		$this->product = $wcProduct;
	}

	public function getId() {
		return $this->product->get_id();
	}

	public function getTitle() {
		return rawurldecode( $this->product->get_name() );
	}

	public function getLink() {
		return $this->product->get_permalink();
	}

	public function getPrice() {
		return $this->product->get_price();
	}

	public function getImage( $size = 'thumbnail', $alt = false ) {
		$image = new Media( $this->product->get_image_id(), $size );
		if ( $alt ) {
			$image->setImageAlt( $alt );
		}

		return $image->getImage();
	}

	public function getCartUrl() {
		return $this->product->add_to_cart_url();
	}

	public function isSoldIndividually() {
		return $this->product->is_sold_individually();
	}
}