<?php

use Rewooc\Customizer\Customizer;
use Rewooc\Api\Sidebar;
use Rewooc\Widgets;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ) {
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}
if ( class_exists( 'Rewooc\Init' ) ) {
	Rewooc\Init::register_services();
}

/* Register custom widgets */
Sidebar::registerWidgets( [
	Widgets\RwProducts::class,
	Widgets\LatestPosts::class
] );

/* Register custom widget sidebars */
Sidebar::registerSidebar( 'homepage_main', 'Homepage main' );
if ( Customizer::getMode( 'homepage_layout' ) === 'sidebar' ) {
	Sidebar::registerSidebar( 'homepage_sidebar', 'Homepage sidebar' );
}

add_filter( 'allowed_http_origins', function ( $origins ) {
	$origins[] = 'http://localhost:3000';

	return $origins;
} );