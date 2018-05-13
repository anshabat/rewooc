<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once(dirname(__FILE__) . "/server/Setup.php");
require_once(dirname(__FILE__) . "/server/Customizer.php");
require_once(dirname(__FILE__) . "/server/Options.php");
require_once(dirname(__FILE__) . "/server/Navigation.php");
require_once(dirname(__FILE__) . "/server/Products.php");


/**
 * Load header navigation
 */
add_action('wp_enqueue_scripts', function () {
    $headerNav = new Navigation('header_nav');
    $headerNavItems = $headerNav->getNav(['ID', 'title', 'menu_item_parent', 'url']);

    $themeCustomizer = Customizer::getInstance();
    $themeMods = $themeCustomizer->getMods();

    wp_localize_script(get_template(), 'rewooc', [
        'mainNavigation' => $headerNavItems,
        'themeMods' => $themeMods
    ]);

});