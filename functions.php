<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

require_once( dirname( __FILE__ ) . "/server/Setup.php" );
require_once( dirname( __FILE__ ) . "/server/Media.php" );
require_once( dirname( __FILE__ ) . "/server/Customizer.php" );
require_once( dirname( __FILE__ ) . "/server/Options.php" );
require_once( dirname( __FILE__ ) . "/server/Settings.php" );
require_once( dirname( __FILE__ ) . "/server/Navigation.php" );
require_once( dirname( __FILE__ ) . "/server/Shop/Cart.php" );
require_once( dirname( __FILE__ ) . "/server/Products.php" );
require_once( dirname( __FILE__ ) . "/server/Api.php" );
require_once( dirname( __FILE__ ) . "/server/Setup.php" );
require_once( dirname( __FILE__ ) . "/server/Api.php" );
require_once( dirname( __FILE__ ) . "/server/Media.php" );
require_once( dirname( __FILE__ ) . "/server/Customizer.php" );
require_once( dirname( __FILE__ ) . "/server/Options.php" );
require_once( dirname( __FILE__ ) . "/server/Navigation.php" );
require_once( dirname( __FILE__ ) . "/server/Products.php" );
require_once( dirname( __FILE__ ) . "/server/Post.php" );
require_once( dirname( __FILE__ ) . "/server/Widgets.php" );
require_once( dirname( __FILE__ ) . "/server/Widgets/RwProducts.php" );
require_once( dirname( __FILE__ ) . "/server/Widgets/LatestPosts.php" );

/* Register custom widgets */
Widgets::registerWidgets( [
	RwProducts::class,
	LatestPosts::class
] );

/* Register custom widget sidebars */
Widgets::registerSidebar('homepage_main', 'Homepage main');
if (Customizer::getInstance()->getMode('homepage_layout') === 'sidebar') {
	Widgets::registerSidebar('homepage_sidebar', 'Homepage sidebar');
}