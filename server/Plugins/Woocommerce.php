<?php

namespace Rewooc\Plugins;

class Woocommerce {
	public function __construct() {
		$this->registerHooks();
	}

	/**
	 * Register hooks and actions
	 */
	public function registerHooks() {
		add_action( 'after_setup_theme', [ $this, 'setup' ] );

		/* Remove default woocommerce styles */
		add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
	}

	public function setup() {
		/* Declaring WooCommerce support in themes */
		add_theme_support( 'woocommerce' );

		/* Enable WooCommerce Product Gallery, Zoom & Lightbox (v3.0+) */
		add_theme_support( 'wc-product-gallery-slider' );
		add_theme_support( 'wc-product-gallery-zoom' );
		add_theme_support( 'wc-product-gallery-lightbox' );
	}
}