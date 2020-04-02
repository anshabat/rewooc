<?php

use \Rewooc\Core\View;

$result = [
	'firstName'   => $user->first_name,
	'displayName' => $user->display_name,
	'lastName'    => $user->last_name,
	'email'       => $user->user_email
];

View::renderPage( [
	'user' => $result
] );