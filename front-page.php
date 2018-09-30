<?php

Api::renderPage(function(){
	return [
		'widgets' => [
			'homepage_main'    => Widgets::renderSidebar( 'homepage_main' ),
			'homepage_sidebar' => Widgets::renderSidebar( 'homepage_sidebar' )
		]
	];
});