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
}