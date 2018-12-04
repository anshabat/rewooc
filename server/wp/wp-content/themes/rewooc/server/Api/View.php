<?php

namespace Rewooc\Api;

use Rewooc\Customizer\Customizer;
use Rewooc\Api\Shop\Cart;

/**
 * Class Api Provide data to Frontend regarding current Route
 */
class View {
	private static $data = [];

	public static function responseHeaders() {
		send_origin_headers();
		@header( 'Content-Type: text/html; charset=' . get_option( 'blog_charset' ) );
		@header( 'X-Robots-Tag: noindex' );
		send_nosniff_header();
		nocache_headers();
		status_header( 200 );
	}

	public static function addScriptData( $key, $val ) {
		if ( key_exists( $key, self::$data ) ) {
			self::$data[ $key ] = array_merge( self::$data[ $key ], $val );
		} else {
			self::$data[ $key ] = $val;
		}
	}

	public static function fetchScriptData() {
		wp_localize_script( get_template(), 'rewooc', self::$data );
	}

	public static function renderPage( $function ) {
		self::responseHeaders();

		$headerNav      = new Navigation( 'header_nav' );
		$headerNavItems = $headerNav->getNav( [ 'ID', 'title', 'menu_item_parent', 'url' ] );
		$themeMods      = Customizer::getMods();
		$cartData       = Cart::getData();

		$data                     = call_user_func( $function );
		$data['headerNavigation'] = $headerNavItems;
		$data['themeMods']        = $themeMods;
		$data['cart']             = $cartData;
		$data['settings']         = Settings::getResults();
		wp_send_json( $data );
	}
}