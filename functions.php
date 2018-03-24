<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once(get_template_directory() . "/server/SzSetup.php");
require_once(get_template_directory() . "/server/Saleszone.php");
new SzSetup();

/**
 * Load header navigation
 */
add_action('wp_enqueue_scripts', function(){
    $header_nav = wp_get_nav_menu_items( get_nav_menu_locations()['header_nav'] );
    wp_localize_script( 'bundle', 'salesZone', [
        'mainNavigation' => $header_nav
    ] );
});