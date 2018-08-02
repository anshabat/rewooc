<?php

class Sidebar {
	private static $sidebars = [];
	private static $widgetsResults = [];

	public static function addSidebar( $key, $val ) {
		self::$sidebars[ $key ] = $val;
	}

	public static function registerSidebars() {
		dump(self::$sidebars);
		foreach ( self::$sidebars as $key => $title ) {
			if ( ! is_registered_sidebar( $key ) ) {
				register_sidebar( [
					'id'       => $key,
					'name'     => $title,
					'onResult' => function ( $result ) use ( $key ) {
						self::addResult( $key, $result );
					}
				] );
			}
		}
	}

	public static function addResult( $sidebar, $widgetData ) {
		if ( ! key_exists( $sidebar, self::$widgetsResults ) ) {
			self::$widgetsResults[ $sidebar ] = [];
		}
		array_push( self::$widgetsResults[ $sidebar ], $widgetData );
	}

	public static function render() {
		foreach ( self::$sidebars as $key => $title ) {
			dynamic_sidebar( $key );
		}
		return self::$widgetsResults;
	}
}