<?php

namespace Rewooc\Shop;

class CartProduct extends Product {
	private $cartItem = null;

	public function __construct( array $wcCartItem ) {
		parent::__construct( $wcCartItem['data'] );
		$this->cartItem = $wcCartItem;
	}

	public function getQuantity() {
		return $this->cartItem['quantity'];
	}
}