<?php

/**
 * Class Api Provide data to Frontend regarding current Route
 */
class Api {
	private static $data = [];

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
		if ( self::isAjax() ) {
			$data = call_user_func($function);
			wp_send_json($data);
		} else {
			get_header();
			get_footer();
		}
	}

	public static function isAjax() {
		if ( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest' ) {
			return true;
		}

		return false;
	}
}