<?php

namespace Rewooc;

class Init {

	private static $services = [
		Core\Setup::class,
		Customizer\Customizer::class,
		Api\Shop\Products::class
	];

	public static function register_services() {
		foreach ( self::$services as $service ) {
			if ( class_exists( $service ) ) {
				new $service();
			}
		}
	}
}