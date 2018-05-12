<?php

class Options {
	private static $instance;

	public static function getInstance() {
		self::$instance = empty(self::$instance) ? new self() : self::$instance;
		return self::$instance;
	}

	private function __construct() {
		if( function_exists('acf_add_options_page') ) {
			acf_add_options_page();
		}

		if( function_exists('acf_add_options_page') ) {
			acf_add_options_page(array(
				'page_title' 	=> 'Theme General Settings',
				'menu_title'	=> 'Theme Settings',
				'menu_slug' 	=> 'theme-general-settings',
				'capability'	=> 'manage_options',
				'redirect'		=> false
			));
			acf_add_options_sub_page(array(
				'page_title' 	=> 'Theme Header Settings',
				'menu_title'	=> 'Header',
				'parent_slug'	=> 'theme-general-settings',
			));
		}
	}
}

Options::getInstance();