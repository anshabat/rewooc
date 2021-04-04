<?php

namespace Rewooc\Shop\Checkout;

class CheckoutRepository
{
    public static function getDeliveryMethods()
    {
        $packages = WC()->shipping()->get_packages();
        $result = [];
        dump($packages);
        foreach ($packages as $i => $package) {
            foreach ($package['rates'] as $method) {
                $result[] = ['id' => $method->id];
            }
        }
        return $result;
    }
}