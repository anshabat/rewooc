<?php

namespace Rewooc\Core;

class Assets {

	public function __construct() {
		add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);
	}

	public function enqueueScripts(){
		wp_deregister_script( 'jquery' );
		wp_enqueue_script( get_template(), get_template_directory_uri() . '/view/build/bundle.js', [], false, true );
		wp_enqueue_style( get_template(), get_template_directory_uri() . '/view/build/styles.css' );
	}
}