<?php

class Cart {
	public function getData() {
		return [
			'count'    => WC()->cart->get_cart_contents_count(),
			'totals'   => WC()->cart->get_totals(),
			'subtotal' => WC()->cart->get_subtotal()
		];
	}
}