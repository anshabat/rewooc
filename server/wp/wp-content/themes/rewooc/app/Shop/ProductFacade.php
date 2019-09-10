<?php

namespace Rewooc\Shop;

class ProductFacade {
	private $product = null;

	public function __construct( Product $product ) {
		$this->product = $product;
	}

	public function getProductCard() {
		return [
			'id'           => $this->product->getId(),
			'title'        => $this->product->getTitle(),
			'link'         => $this->product->getLink(),
			'price'        => $this->product->getPrice(),
			'image'        => $this->product->getImage( 'shop_catalog' ),
			'addToCartUrl' => $this->product->getCartUrl()
		];
	}

	public function getCartProduct() {
		return [
			'quantity' => $this->product->getQuantity(),
			'id'       => $this->product->getId(),
			'title'    => $this->product->getTitle(),
			'link'     => $this->product->getLink(),
			'price'    => $this->product->getPrice(),
			'image'    => $this->product->getImage( 'shop_catalog' )
		];
	}
}