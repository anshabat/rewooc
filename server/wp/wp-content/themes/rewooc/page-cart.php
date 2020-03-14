<?php

use Rewooc\Core\View;
use Rewooc\Shop\Cart;

View::renderPage( [
	'title' => get_the_title(),
	'products' => Cart::getProducts()
] );