<?php

use Rewooc\Core\View;

$result = [
	'firstName'   => $current_user->first_name,
	'displayName' => $current_user->display_name,
	'lastName'    => $current_user->last_name,
	'email'       => $current_user->user_email
];

View::renderPage( [
	'user' => $result
] );