<?php

namespace Rewooc;

class Init {

	private static $services = [
		Core\Setup::class,
		Core\Ajax::class,
		Customizer\Customizer::class
	];

	public static function register_services() {
		foreach ( self::$services as $service ) {
			if ( class_exists( $service ) ) {
				new $service();
			}
		}
	}
}