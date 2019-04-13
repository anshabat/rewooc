<?php

use Rewooc\Core\View;
use Rewooc\Api\Sidebar;


//TODO: Add mata data: page title, desc, lang etc
View::renderPage(function(){
	return [
		'widgets' => [
			'homepage_main'    => Sidebar::renderSidebar( 'homepage_main' ),
			'homepage_sidebar' => Sidebar::renderSidebar( 'homepage_sidebar' )
		]
	];
});