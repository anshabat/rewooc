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
        $products = json_decode(stripslashes($_GET['products']));
        $deliveryMethod = $_GET['delivery'];

        /* Calculate products */
        $order = new \WC_Order();
        foreach ($products as $item) {
            $product = wc_get_product($item->product_id);
            $order->add_product($product, $item->quantity);
        }

        /* Calculate delivery */
        if ($deliveryMethod) {
            $shippingMethod = CheckoutRepository::getDeliveryMethodById($deliveryMethod);
            $item = new \WC_Order_Item_Shipping();
            $item->set_props(
                array(
                    'method_title' => $shippingMethod->title,
                    'method_id' => $shippingMethod->id,
                    'instance_id' => $shippingMethod->instance_id,
                    'total' => wc_format_decimal($shippingMethod->cost),
                )
            );
            $order->add_item($item);
        }

        $total = $order->calculate_totals(false);
        View::responseSuccess($total);
    }
}