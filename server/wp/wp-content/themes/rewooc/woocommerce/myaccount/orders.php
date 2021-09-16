<?php

use \Rewooc\Core\View;

$result = [];
foreach ($customer_orders->orders as $customer_order) {
    $order = wc_get_order($customer_order);

    foreach ($order->get_items('shipping') as $item_id => $item) {
        // Get the data in an unprotected array
        $item_data = $item->get_data();
    }

    $result[] = [
        'url' => $order->get_view_order_url(),
        'id' => $order->get_id(),
        'number' => $order->get_order_number(),
        'status' => $order->get_status(),
        'created' => $order->get_date_created(),
        'item_count' => $order->get_item_count(),
        'total' => $order->get_total(),
        'currency' => $order->get_currency(),
        'deliveryMethod' => [
            'id' => $item_data['instance_id'],
            'title' => $item_data['method_title'],
            'cost' => $item_data['total'],
        ]
    ];
}

View::renderPage([
    'title' => 'Orders',
    'orders' => $result
]);