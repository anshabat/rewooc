<?php

namespace Rewooc\Core;

use Rewooc\Api\Media;
use Rewooc\Api\Navigation;

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
			'customizer'       => self::getCustomizerData()
		];
	}

	/**
	 * Provide data to Frontend
	 *
	 * @param callable $function - should return an array with data for specific page
	 *
	 */
	public static function renderPage( callable $function ) {
		send_origin_headers();

		$commonData = self::getCommonData();
		$pageData   = array_merge( $commonData, call_user_func( $function ) );

		wp_send_json( $pageData );
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

	private static function getCustomizerData() {
		return [
			'site_layout' => get_theme_mod( 'rewooc_site_layout', 'fluid' )
		];
	}
}