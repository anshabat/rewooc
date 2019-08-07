<?php

use Rewooc\Common\Post;
use Rewooc\Shop\Products;
use Rewooc\Core\View;

$postObjects = get_posts();
$posts       = [];

WC()->cart->empty_cart();

foreach ( $postObjects as $post ) {
	array_push( $posts, Post::objectToArray( $post ) );
}

View::renderPage( [
	'featuredProducts' => Products::getProducts( [
		'featured' => true
	] ),
	'blogPosts'        => $posts
] );