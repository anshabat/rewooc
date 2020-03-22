<?php

namespace Rewooc\Shop;

class ProductFacade {
	private $product = null;

	public function __construct( Product $product ) {
		$this->product = $product;
	}

	public function getProductCard() {
		return [
			'id'                 => $this->product->getId(),
			'title'              => $this->product->getTitle(),
			'link'               => $this->product->getLink(),
			'price'              => $this->product->getPrice(),
			'images'             => $this->product->getImages(),
			'addToCartUrl'       => $this->product->getCartUrl(),
			'isSoldIndividually' => $this->product->isSoldIndividually(),
			'getStockQuantity'   => $this->product->getStockQuantity()
		];
	}
}