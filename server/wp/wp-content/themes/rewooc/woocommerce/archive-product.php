<?php

use Rewooc\Api\Shop\Products;
use Rewooc\Core\View;

View::renderPage( function () {
	return [
		'products' => Products::getArchiveProducts()
	];
} );