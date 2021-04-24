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
}