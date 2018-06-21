<?php
get_header();

$featuredProducts = Products::getInstance()->getProducts( [
	'featured' => true
] );
Api::addScriptData( 'featuredProducts', $featuredProducts );

get_footer();