<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once(get_template_directory() . "/server/Setup.php");
require_once(get_template_directory() . "/server/Customizer.php");
require_once(get_template_directory() . "/server/Navigation.php");


/**
 * Load header navigation
 */
add_action('wp_enqueue_scripts', function () {
    $headerNav = new Navigation('header_nav');
    $headerNavItems = $headerNav->getNav(['ID', 'title', 'menu_item_parent', 'url']);

    $themeCustomizer = Customizer::getInstance();
    $themeMods = $themeCustomizer->getMods();

    wp_localize_script(get_template(), 'salesZone', [
        'mainNavigation' => $headerNavItems,
        'themeMods' => $themeMods
    ]);

});