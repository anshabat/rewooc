<?php

namespace Rewooc\Shop\Checkout;

use Rewooc\Core\View;

class CheckoutAPI
{
    public static function fetchCheckoutData()
    {
        $deliveryMethods = CheckoutRepository::getDeliveryMethods();
        View::responseSuccess(['delivery' => $deliveryMethods]);
    }
}