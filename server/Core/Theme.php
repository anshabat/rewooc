<?php

namespace Rewooc\Core;

class Theme {

	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'setup' ] );
		add_action( 'after_setup_theme', [ $this, 'remove' ] );
	}

	/**
	 * Activate Wordpress features
	 */
	public function setup() {
		/* Multilingual support */
		load_theme_textdomain( 'rewooc', get_template_directory() . '/languages' );

		/* Default Theme Support options */
		add_theme_support( 'custom-logo' );
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'customize-selective-refresh-widgets' );
		add_theme_support( 'html5', [
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		] );
		add_theme_support( 'custom-background', apply_filters( 'prior_custom_background_args', [
			'default-color' => 'ffffff',
			'default-image' => '',
		] ) );

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
	}

	/**
	 * Remove extra styles, scripts and other redundant stuff from wp_head and wp_footer
	 */
	public function remove() {
		/* removes the “generator” meta tag from the document header */
		remove_action( 'wp_head', 'wp_generator' );

		/* removes the “wlwmanifest” link. wlwmanifest.xml is the resource file needed to enable support for Windows Live Writer */
		remove_action( 'wp_head', 'wlwmanifest_link' );

		/* The RSD is an API to edit your blog from external services and client */
		remove_action( 'wp_head', 'rsd_link' );

		/* “wp_shortlink_wp_head” adds a “shortlink” into your document head that will look like http://example.com/?p=ID */
		remove_action( 'wp_head', 'wp_shortlink_wp_head' );

		/* Removes a link to the next and previous post from the document header */
		remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 );

		/* Removes the generator name from the RSS feeds */
		add_filter( 'the_generator', '__return_false' );

		/*Removes WP 4.2 emoji styles and JS */
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );

		/*Disable Embeds header links and javascript from footer */
		remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		remove_action( 'wp_head', 'wp_oembed_add_host_js' );
	}

}