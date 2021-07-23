<?php

namespace Rewooc\Shop\Checkout;

use Rewooc\Core\View;

class CheckoutAPI
{
    public static function fetchDeliveryMethods()
    {
        $countryCode = sanitize_text_field($_GET['country']);
        $zoneId = CheckoutRepository::getZoneByCountry($countryCode);
        $deliveryMethods = CheckoutRepository::getDeliveryMethods($zoneId);
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

    public static function checkEmail()
    {
        $email = sanitize_email($_GET['email']);
        View::responseSuccess(email_exists($email));
    }
}