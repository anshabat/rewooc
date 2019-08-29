<?php

use Rewooc\Shop\Products;
use Rewooc\Core\View;

View::renderPage( [
	'title' => woocommerce_page_title(false),
	'products' => Products::getArchiveProducts()
] );