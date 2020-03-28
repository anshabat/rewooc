<?php

namespace Rewooc\Common;

class User {
	private $user = null;

	public function __construct() {
		$this->user = WC()->customer;
	}

	public function isLoggedIn() {
		return is_user_logged_in();
	}

	public function getData() {
		return $this->user->get_data();
	}
}