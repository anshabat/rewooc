<?php

namespace Rewooc\Common;

use Rewooc\Core\View;

class Region
{
    public static function fetchCountries()
    {
        $countries_obj = new \WC_Countries();
        $countries = $countries_obj->get_shipping_countries();
        View::responseSuccess($countries);
    }
}