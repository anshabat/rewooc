<?php

use \Rewooc\Core\View;

View::renderPage([
    'id' => $order->get_order_number(),
]);