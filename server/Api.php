<?php

class Api {
	private static $data = [];

	public static function addScriptData($key, $val) {
		self::$data[$key] = $val;
	}

	public static function fetchScriptData() {
		dump(self::$data);
		wp_localize_script( get_template(), 'rewooc', self::$data );
		return;
	}
}