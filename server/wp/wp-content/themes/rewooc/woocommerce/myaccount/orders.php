<?php

use \Rewooc\Core\View;

$result = [];
foreach ( $customer_orders->orders as $customer_order ) {
	$order    = wc_get_order( $customer_order );
	$result[] = [
		'url'        => $order->get_view_order_url(),
		'id'         => $order->get_id(),
		'number'     => $order->get_order_number(),
		'status'     => $order->get_status(),
		'created'    => $order->get_date_created(),
		'item_count' => $order->get_item_count(),
		'total'      => $order->get_total(),
		'currency'   => $order->get_currency()
	];
}

View::renderPage( [
	'title'  => 'Orders',
	'orders' => $result
] );