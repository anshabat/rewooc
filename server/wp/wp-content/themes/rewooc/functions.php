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