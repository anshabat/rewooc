<?php

namespace Rewooc\Shop\Checkout;

use Rewooc\Core\View;

class CheckoutAPI
{
    public static function fetchDeliveryMethods()
    {
        $deliveryMethods = CheckoutRepository::getDeliveryMethods();
        View::responseSuccess($deliveryMethods);
    }

    public static function fetchPaymentGateways()
    {
        $paymentGateways = CheckoutRepository::getPaymentGateways();
        View::responseSuccess($paymentGateways);
    }

    public static function postOrder()
    {
        $request_body = file_get_contents('php://input');
        $request = json_decode($request_body);
        $orderId = CheckoutRepository::createOrder($request);
        View::responseSuccess($orderId);
    }

    public static function calculateTotals()
    {
        $order = new \WC_Order();
        $products = json_decode(stripslashes($_GET['products']));
        foreach ($products as $item) {
            $product = wc_get_product($item->product_id);
            $order->add_product($product, $item->quantity);
        }
        $total = $order->calculate_totals(false);
        View::responseSuccess($total);
    }
}