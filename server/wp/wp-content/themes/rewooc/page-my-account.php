<?php

use \Rewooc\Core\View;

//dump(is_user_logged_in());

View::renderPage([
	'user' => is_user_logged_in(),
	'info' => WC()->customer->get_username()
]);