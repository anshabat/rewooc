<?php

use Rewooc\Api\Post;
use Rewooc\Api\Shop\Products;
use Rewooc\Core\View;

$postObjects = get_posts();
$posts       = [];

foreach ( $postObjects as $post ) {
	array_push( $posts, Post::objectToArray( $post ) );
}

View::renderPage( function () use ( $posts ) {
	return [
		'featuredProducts' => Products::getProducts( [
			'featured' => true
		] ),
		'blogPosts'        => $posts
	];
} );