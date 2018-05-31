<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once(dirname(__FILE__) . "/server/Setup.php");
require_once(dirname(__FILE__) . "/server/Api.php");
require_once(dirname(__FILE__) . "/server/Media.php");
require_once(dirname(__FILE__) . "/server/Customizer.php");
require_once(dirname(__FILE__) . "/server/Options.php");
require_once(dirname(__FILE__) . "/server/Navigation.php");
require_once(dirname(__FILE__) . "/server/Products.php");
require_once(dirname(__FILE__) . "/server/Widgets.php");
require_once(dirname(__FILE__) . "/server/Widgets/FeatureProducts.php");
require_once(dirname(__FILE__) . "/server/Widgets/LatestPosts.php");


new Widgets([
    FeatureProducts::class,
    LatestPosts::class
]);

add_action('init', function () {
    $headerNav = new Navigation('header_nav');
    $headerNavItems = $headerNav->getNav(['ID', 'title', 'menu_item_parent', 'url']);
    Api::addScriptData('headerNavigation', $headerNavItems);

    $themeCustomizer = Customizer::getInstance();
    $themeMods = $themeCustomizer->getMods();
    Api::addScriptData('themeMods', $themeMods);
});
