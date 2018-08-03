<?php

class Api {
	private static $data = [];

	public static function addScriptData( $key, $val ) {
		self::$data[ $key ] = $val;
	}

	public static function fetchScriptData() {
		wp_localize_script( get_template(), 'rewooc', self::$data );
	}
}