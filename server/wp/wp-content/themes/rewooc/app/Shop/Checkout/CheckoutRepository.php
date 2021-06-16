<?php

namespace Rewooc\Shop\Checkout;

class CheckoutRepository
{
    public static function getDeliveryMethods($zoneId = 0)
    {
        $zone = new \WC_Shipping_Zone($zoneId);
        $shipping = $zone->get_shipping_methods(false, 'json');

        return $shipping;
    }

    public static function getDeliveryMethodById($methodId, $zoneId = 0)
    {
        $shippingMethods = self::getDeliveryMethods($zoneId);
        foreach ($shippingMethods as $method) {
            if ($method->instance_id == $methodId) {
                return $method;
            }
        }

        return null;
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

    public static function createOrder($data)
    {
        $order = new \WC_Order();
        $order->set_customer_id($data->customer_id);
        $order->set_billing_first_name($data->billing->first_name);
        $order->set_billing_last_name($data->billing->last_name);
        $order->set_billing_email($data->billing->email);
        $order->set_billing_phone($data->billing->phone);
        $order->set_payment_method($data->payment);

        if ($data->shipping) {
            $order->set_shipping_first_name($data->shipping->first_name);
            $order->set_shipping_last_name($data->shipping->last_name);
        }

        /* Add products to Order */
        foreach ($data->products as $item) {
            $product = wc_get_product($item->product_id);
            $order->add_product($product, $item->quantity);
        }

        /* Add Shipping Method to Order */
        $shippingMethod = CheckoutRepository::getDeliveryMethodById($data->delivery);
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

        /* Calculate and Save Order */
        //$order->calculate_totals(false);

        return $order->get_id();
    }
}