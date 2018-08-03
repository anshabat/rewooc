<?php

class Widgets {
	private static $widgetsResults = [];

	/**
	 * Register Custom Rewooc theme widgets
	 *
	 * @param $widgets - array of widgets classes
	 */
	public static function registerWidgets( $widgets ) {
		add_action( 'widgets_init', function () use ( $widgets ) {
			foreach ( $widgets as $widget ) {
				register_widget( $widget );
			}
		} );
	}

	/**
	 * Initialize widget sidebar
	 *
	 * @param string $id - sidebar id
	 * @param string $name - sidebar name
	 */
	public static function registerSidebar( $id, $name ) {
		add_action( 'widgets_init', function () use ( $id, $name ) {
			if ( ! is_registered_sidebar( $id ) ) {
				register_sidebar( [
					'id'       => $id,
					'name'     => $name,
					'onResult' => function ( $result ) use ( $id ) {
						self::addResult( $id, $result );
					}
				] );
			}
		} );
	}


	/**
	 * Add widgets result data to Central widgets store
	 *
	 * @param $sidebar
	 * @param $widgetData
	 */
	public static function addResult( $sidebar, $widgetData ) {
		if ( ! key_exists( $sidebar, self::$widgetsResults ) ) {
			self::$widgetsResults[ $sidebar ] = [];
		}
		array_push( self::$widgetsResults[ $sidebar ], $widgetData );
	}

	public static function getResults() {
		return self::$widgetsResults;
	}

	/**
	 * Output widget script
	 *
	 * @param string $sidebar - name of widget sidebar
	 */
	public static function renderSidebar( $sidebar ) {
		if ( is_registered_sidebar( $sidebar ) ) {
			dynamic_sidebar( $sidebar );
		}
	}
}