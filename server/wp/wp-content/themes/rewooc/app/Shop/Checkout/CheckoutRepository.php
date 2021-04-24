<?php

namespace Rewooc\Shop\Checkout;

class CheckoutRepository
{
    public static function getDeliveryMethods()
    {
        $zone = new \WC_Shipping_Zone(1);
        $shipping = $zone->get_shipping_methods(false, 'json');

        return $shipping;
    }

    public static function getPaymentGateways()
    {
        $order = (array)get_option('woocommerce_gateway_order');
        $payment_gateways = WC()->payment_gateways->payment_gateways();
        $gateways = [];
        foreach ($payment_gateways as $gateway) {
            $gateways[] = [
                'id' => $gateway->id,
                'title' => $gateway->title,
                'description' => $gateway->description,
                'order' => isset($order[$gateway->id]) ? $order[$gateway->id] : '',
                'enabled' => ('yes' === $gateway->enabled),
                'method_title' => $gateway->get_method_title(),
                'method_description' => $gateway->get_method_description(),
            ];
        }

        return $gateways;
    }
}