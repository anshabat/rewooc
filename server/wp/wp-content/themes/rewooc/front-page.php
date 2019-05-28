<?php

use Rewooc\Api\Post;
use Rewooc\Api\Shop\Products;
use Rewooc\Core\View;
use Rewooc\Api\Sidebar;

$postObjects = get_posts();
$posts       = [];

foreach ( $postObjects as $post ) {
	array_push( $posts, Post::objectToArray( $post ) );
}

View::renderPage( function () use ( $posts ) {
	return [
		'widgets'          => [
			'homepage_main'    => Sidebar::renderSidebar( 'homepage_main' ),
			'homepage_sidebar' => Sidebar::renderSidebar( 'homepage_sidebar' )
		],
		'featuredProducts' => Products::getProducts( [
			'featured' => true
		] ),
		'blogPosts'        => $posts
	];
} );