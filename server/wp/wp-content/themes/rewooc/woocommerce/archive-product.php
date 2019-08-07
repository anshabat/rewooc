<?php

use Rewooc\Shop\Products;
use Rewooc\Core\View;

View::renderPage( [
	'products' => Products::getArchiveProducts()
] );