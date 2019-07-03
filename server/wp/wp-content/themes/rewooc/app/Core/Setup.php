<?php

namespace Rewooc\Core;

class Setup {

	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'addThemeFeatures' ] );
		add_action( 'after_setup_theme', [ $this, 'registerMenus' ] );
		add_filter( 'allowed_http_origins', [ $this, 'allowedHttpOrigins' ] );
	}

	/**
	 * Activate Wordpress features
	 */
	public function addThemeFeatures() {
		/* Multilingual support */
		load_theme_textdomain( 'rewooc', get_template_directory() . '/languages' );

		/* Default Theme Support options */
		add_theme_support( 'custom-logo' );
		add_theme_support( 'post-thumbnails' );

		/* Activate Post formats */
		add_theme_support( 'post-formats', [
			'aside',
			'gallery',
			'link',
			'image',
			'quote',
			'status',
			'video',
			'audio',
			'chat',
		] );

		/* Declaring WooCommerce support in themes */
		add_theme_support( 'woocommerce' );
	}

	public function registerMenus() {
		register_nav_menu( 'header_nav', esc_html__( 'Header', 'rewooc' ) );
		register_nav_menu( 'footer_nav', esc_html__( 'Footer', 'rewooc' ) );
		register_nav_menu( 'mobile_nav', esc_html__( 'Mobile', 'rewooc' ) );
		register_nav_menu( 'primary_nav', esc_html__( 'Primary', 'rewooc' ) );
	}

	public function allowedHttpOrigins( $origins ) {
		// Add custom response headers
		@header( 'Content-Type: application/json; charset=' . get_option( 'blog_charset' ) );
		@header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
		// Allow requests from other domains (CORS)
		$origins[] = 'http://localhost:3000';

		return $origins;
	}

}