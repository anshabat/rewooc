<?php

namespace Rewooc\Core;

class Menus {

	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'registerMenus' ] );
	}

	public function registerMenus() {
		register_nav_menu( 'header_nav', esc_html__( 'Header', 'rewooc' ) );
		register_nav_menu( 'footer_nav', esc_html__( 'Footer', 'rewooc' ) );
		register_nav_menu( 'mobile_nav', esc_html__( 'Mobile', 'rewooc' ) );
		register_nav_menu( 'primary_nav', esc_html__( 'Primary', 'rewooc' ) );
	}
}