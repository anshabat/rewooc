<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once(get_template_directory() . "/server/Setup.php");
require_once(get_template_directory() . "/server/Customizer.php");


/**
 * Load header navigation
 */
add_action('wp_enqueue_scripts', function () {
    $header_nav = wp_get_nav_menu_items(get_nav_menu_locations()['header_nav']);
    wp_localize_script(get_template(), 'salesZone', [
        'mainNavigation' => $header_nav,
        'themeMods' => get_theme_mods()
    ]);
});