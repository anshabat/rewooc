<?php

namespace Rewooc\Core;

use Rewooc\Common\Media;
use Rewooc\Common\Navigation;
use Rewooc\Shop\Cart;

class View {

	/**
	 * Return global app data for all pages
	 *
	 * @return array
	 */
	private static function getCommonData() {
		return [
			'headerNavigation' => self::getHeaderNavigation(),
			'logo'             => self::getLogo(),
			'favicon'          => self::getFavicon(),
			'phone'            => self::getPhone(),
			'price'            => self::getCurrencyFormat(),
			'baseUrl'          => self::baseUrl(),
			'ajaxUrl'          => self::ajaxUrl(),
			'siteMeta'         => self::getSiteMeta(),
			'user'             => self::getUser(),
			'cart'             => Cart::getData()
		];
	}

	/**
	 * Provide data to Frontend
	 *
	 * @param array $data - an array with data for specific page
	 *
	 */
	public static function renderPage( array $data ) {
		send_origin_headers();
		wp_send_json( $data );
	}

	public static function renderCommonData() {
		wp_send_json( self::getCommonData() );
	}

	private static function getCurrencyFormat() {
		return [
			'thousandSeparator' => wc_get_price_thousand_separator(),
			'decimalSeparator'  => wc_get_price_decimal_separator(),
			'decimals'          => wc_get_price_decimals(),
			'priceFormat'       => get_woocommerce_price_format(),
			'currencySymbol'    => html_entity_decode( get_woocommerce_currency_symbol() )
		];
	}

	private static function getLogo() {
		$imageId = get_theme_mod( 'custom_logo' );
		if ( ! $imageId ) {
			return false;
		}

		$logo = new Media( $imageId, 'full' );

		return $logo->getImage();

	}

	private static function getPhone() {
		return get_theme_mod( 'rewooc_site_phone' );
	}

	private static function getSiteMeta() {
		return [
			'title'       => get_bloginfo( 'name' ) . '' . wp_title( '', false ),
			'description' => get_bloginfo( 'description' ),
			'charset'     => get_bloginfo( 'charset' )
		];
	}

	private static function baseUrl() {
		return parse_url( site_url(), PHP_URL_PATH ) ?: '';
	}

	private static function ajaxUrl() {
		return \WC_AJAX::get_endpoint( '%%endpoint%%' );
	}

	private static function getHeaderNavigation() {
		$headerNav = new Navigation( 'header_nav' );

		return $headerNav->getNav( [ 'ID', 'title', 'menu_item_parent', 'url' ] );
	}

	private static function getUser() {
		return is_user_logged_in();
	}

	private static function getFavicon() {
		return get_site_icon_url();
	}
}