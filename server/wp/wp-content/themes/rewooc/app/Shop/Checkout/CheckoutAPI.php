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
}