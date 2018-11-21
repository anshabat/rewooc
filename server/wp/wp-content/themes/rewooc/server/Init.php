<?php

namespace Rewooc;

class Init {

	private static $services = [
		Core\Theme::class,
		Core\Assets::class,
		Core\Menus::class,
		Customizer\Customizer::class,
		Plugins\Woocommerce::class,
		Products::class
	];

	public static function register_services() {
		foreach ( self::$services as $service ) {
			if ( class_exists( $service ) ) {
				new $service();
			}
		}
	}
}